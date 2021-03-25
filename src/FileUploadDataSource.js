const { RemoteGraphQLDataSource } = require( '@apollo/gateway');
const { fetch, Request, Headers } = require( 'apollo-server-env');
const { isObject } = require( '@apollo/gateway/dist/utilities/predicates');
const FormData = require( 'form-data');
const _ = require( 'lodash');

class FileUploadDataSource extends RemoteGraphQLDataSource {
  async process(args) {
    const { request, context } = args;

    const fileVariables = this.extract(request.variables);
    if (fileVariables.length > 0) {
      return this.processFileUpload(args, fileVariables);
    } else {
      return super.process(args);
    }
  }

  async processFileUpload({ request, context }, fileVariables) {
    // GraphQL multipart request spec:
    // https://github.com/jaydenseric/graphql-multipart-request-spec
    const form = new FormData();

    // cannot mutate the request object
    const variables = _.cloneDeep(request.variables);
    for (const [variableName] of fileVariables) {
      _.set(variables, variableName, null);
    }

    const operations = JSON.stringify({
      query: request.query,
      variables,
    });

    form.append('operations', operations);

    const resolvedFiles = await Promise.all(
      fileVariables.map(async ([variableName, file]) => {
        const contents = await file;
        return [variableName, contents];
      })
    );

    // e.g. { "0": ["variables.file"] }
    const fileMap = resolvedFiles.reduce(
      (map, [variableName], i) => ({
        ...map,
        [i]: [`variables.${variableName}`],
      }),
      {}
    );
    form.append('map', JSON.stringify(fileMap));

    await Promise.all(
      resolvedFiles.map(async ([, contents], i) => {
        const { filename, mimetype, createReadStream } = contents;
        const readStream = await createReadStream();
        // TODO: Buffers performance issues? may be better solution.
        const buffer = await this.onReadStream(readStream);
        form.append(i, buffer, { filename, contentType: mimetype });
      })
    );

    // Respect incoming http headers (eg, apollo-federation-include-trace).

    const headers = (request.http && request.http.headers) || new Headers();

    form.getLength(function(err, length) {
      headers.set('Content-Length', length);
    });

    Object.entries(form.getHeaders() || {}).forEach(([k, value]) => {
      headers.set(k, value);
    });

    request.http = {
      method: 'POST',
      url: this.url,
      headers,
    };
    if (this.willSendRequest) {
      await this.willSendRequest({ request, context });
    }

    const options = {
      ...request.http,
      body: form,
    };

    const httpRequest = new Request(request.http.url, options);

    try {
      const httpResponse = await fetch(httpRequest);
      const body = await this.parseBody(httpResponse);
      if (!isObject(body)) {
        throw new Error(`Expected JSON response body, but received: ${body}`);
      }
      const response = {
        ...body,
        http: httpResponse,
      };

      return response;
    } catch (error) {
      this.didEncounterError(error, httpRequest);
      throw error;
    }
  }
  extract(obj) {
    const files = [];

    const _extract = (obj, keys) =>
      Object.entries(obj || {}).forEach(([k, value]) => {
        const key = keys ? `${keys}.${k}` : k;
        if (value instanceof Promise) {
          return files.push([key, value]);
        }
        // TODO: support arrays of files
        if (value instanceof Object) {
          return _extract(value, key);
        }
      });
    _extract(obj);
    return files;
  }
  onReadStream = readStream => {
    return new Promise((resolve, reject) => {
      var buffers = [];
      readStream.on('data', function(data) {
        buffers.push(data);
      });
      readStream.on('end', function() {
        var actualContents = Buffer.concat(buffers);

        resolve(actualContents);
      });
      readStream.on('error', function(err) {
        reject(err);
      });
    });
  };
}
module.exports = {FileUploadDataSource}