require('dotenv').config();
const mongoose = require('mongoose');
const PointManager = require('./models/PointManager.model');
const ObpManager = require('./models/ObpManager.model');
const PointLesson = require('./models/PointLesson.model');
const ExamField = require('./models/ExamField.model');
const PointJson = require('./point.json')
const fs = require('fs');
const storeFS = ({ stream, filename }) => {
  const uploadDir = '../backend/photos';
  const path = `${uploadDir}/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path }))
  );
}
module.exports = {

  Query: {
    getObpConstant: async (_, args, { token }) => {
      const pointManager = await ObpManager.findById(args._id);
      return { status: 'Success', message: 'Data Fetched Successfully', content: pointManager };
    },
    getObpConstants: async (_, args, { token }) => {
      let data = await ObpManager.find();
      data = JSON.parse(JSON.stringify(data));
      console.log(data);
      return { status: 'Success', message: 'Data Fetched Successfully', content: data[0] };
    },
    getPointConstant: async (_, args, { token }) => {
      const pointManager = await PointManager.findById(args._id);
      return { status: 'Success', message: 'Data Fetched Successfully', content: pointManager };
    },
    getPointConstants: async (_, args, { token }) => {
      let pointManager = await PointManager.find();
      pointManager = JSON.parse(JSON.stringify(pointManager));
      return { status: 'Success', message: 'Data Fetched Successfully', content: pointManager[0] };
    },
    getPointLesson: async (_, args, { token }) => {
      const pointLesson = await PointLesson.findById(args._id);
      return { status: 'Success', message: 'Data Fetched Successfully', content: pointLesson };
    },
    getPointLessons: async (_, args, { token }) => {
      const pointLesson = await PointLesson.find();
      return { status: 'Success', message: 'Data Fetched Successfully', content: pointLesson };
    },
    getExamField: async (_, args, { token }) => {
      const examField = await ExamField.findById(args._id);
      return { status: 'Success', message: 'Data Fetched Successfully', content: examField };
    },
    getExamFields: async (_, args, { token }) => {
      const examField = await ExamField.find();
      return { status: 'Success', message: 'Data Fetched Successfully', content: examField };
    },
    getPointResult: async (_, args, { token }) => {
      let obpConstant = await ObpManager.find();
      if (obpConstant && PointJson) {
        try {
          let HAMPOINT = null;
          let YERCONSTANT = null;
          args.lesson = JSON.parse(JSON.stringify(args.lesson));
          if (args.lesson.length > 0) {
            args.lesson.map(les => {
              HAMPOINT = HAMPOINT + ((les.correctAnswer - (les.wrongAnswer / args.splintConstant)) * les.scoreConstant)
            });
            obpConstant = JSON.parse(JSON.stringify(obpConstant));
            obpConstant = obpConstant[0].obpConstant;
            if (args.uniEnrolled)
              YERCONSTANT = HAMPOINT + ((obpConstant * args.graduationGrade) / 2);
            else
              YERCONSTANT = HAMPOINT + (obpConstant * args.graduationGrade);
          }
          let lastrow;
          console.log(YERCONSTANT);
          for (let i = 0; i < PointJson.length; i++) {
            if (parseFloat(PointJson[i]['2019 BASED PO?NT']) == HAMPOINT) {
              return {
                status: "Success",
                message: 'Your Ranking has been fetched',
                content: {
                  ranking: parseFloat(PointJson[i]['2019  BASED  SCORE RANK?NG'])
                }
              }
            } else if (parseFloat(PointJson[i]['2019 BASED PO?NT']) > HAMPOINT && lastrow && parseFloat(lastrow['2019 BASED PO?NT']) < HAMPOINT) {
              let ranking;
              let p1 = parseFloat(lastrow['2019 BASED PO?NT']);
              let p2 = parseFloat(PointJson[i]['2019 BASED PO?NT']);
              let r1 = parseFloat(lastrow['2019  BASED  SCORE RANK?NG']);
              let r2 = parseFloat(PointJson[i]['2019  BASED  SCORE RANK?NG']);
              ranking = (((r1 - r2) * (HAMPOINT - p1)) / (p2 + p1)) + r2;
              return {
                status: "Success",
                message: 'Your Ranking has been fetched',
                content: {
                  ranking: ranking
                }
              }
            }
            lastrow = PointJson[i];
          }
        } catch (exception) {
          console.log("Exception has occured");
          return {
            status: "Error",
            message: 'Something Went Wrong.',
            content: {
              errorDetails: "Either the Admin has not added the ObpContant or some data is missing"
            }
          }
        }
      } else {
        return {
          status: "Error",
          message: 'Something Went Wrong.',
          content: {
            errorDetails: "Either the Admin has not added the ObpContant or some data is missing"
          }
        }
      }
    },
  },

  Mutation: {
    addObpConstant: async (_, args, { token }) => {
      let pointManager = await ObpManager.find().count();
      pointManager = JSON.parse(JSON.stringify(pointManager));
      if (pointManager && pointManager.length > 0) {
        return { status: 'Error', message: 'Obp Point already Exist', content: { "message" : "Please Edit the existing constant"} };
      } else {
        pointManager = {
          _id: new mongoose.mongo.ObjectId(),
          obpConstant: args.obpConstant
        }
        const isAdded = await ObpManager.create(pointManager);
        if (isAdded) { return { status: 'Success', message: 'Data Created Successfully', content: isAdded }; }
      }
      return { status: 'Error', message: 'Error Creating details', content: {} };
    },
    updateObpConst: async (_, args, { token }) => {
      let pointManager = await ObpManager.findById(args._id);
      if (pointManager) {
        pointManager.obpConstant = args.obpConstant;
        const isAdded = await ObpManager.findByIdAndUpdate(args._id, { $set: pointManager }, { returnOriginal: false });
        if (isAdded) { return { status: 'Success', message: 'Data Updated Successfully', content: isAdded }; }
      }
      return { status: 'Error', message: 'Error Creating details', content: {} };
    },
    deleteObpPoint: async (_, args, { token }) => {
      let pointManager = await ObpManager.findByIdAndDelete(args._id);
      if (pointManager) {
        return { status: 'Success', message: 'Data Deleted Successfully', content: pointManager };
      }
      return { status: 'Error', message: 'Error Creating details', content: {} };
    },
    addPointConstant: async (_, args, { token }) => {
      let pointManager = await PointManager.find().count();
      pointManager = JSON.parse(JSON.stringify(pointManager));
      if (pointManager && pointManager.length > 0) {
        return { status: 'Error', message: 'Data already Exist please update or delete', content: {"message" : "Please Edit the existing constant"} };
      } else {
        pointManager = {
          _id: new mongoose.mongo.ObjectId(),
          pointConstant: args.pointConstant,
        };
        const isAdded = await PointManager.create(pointManager);
        if (isAdded) { return { status: 'Success', message: 'Data Created Successfully', content: isAdded }; }
      }
      return { status: 'Error', message: 'Error Creating details', content: {} };
    },
    updatePointConstant: async (_, args, { token }) => {
      let pointManager = PointManager.findById(args._id);
      if (pointManager) {
        pointManager.pointConstant = args.pointConstant;
        const isAdded = await PointManager.findByIdAndUpdate(args._id, { $set: pointManager }, { returnOriginal: false });
        if (isAdded) { return { status: 'Success', message: 'Data Updated Successfully', content: isAdded }; }
      }
      return { status: 'Error', message: 'Error updating details', content: {} };
    },
    deletePointConstant: async (_, args, { token }) => {
      let pointManager = await PointManager.findByIdAndDelete(args._id);
      if (pointManager) {
        return { status: 'Success', message: 'Data Deleted Successfully', content: pointManager };
      }
      return { status: 'Error', message: 'Error Deleting details', content: {} };
    },
    addPointLesson: async (_, args, { token }) => {
      let pointLesson = {
        _id: new mongoose.mongo.ObjectId(),
        title: args.title,
        numberOfQuestion: args.numberOfQuestion,
        ScoreConstant: args.ScoreConstant
      };
      const isCreated = await PointLesson.create(pointLesson);
      if (isCreated) {
        return { status: 'Success', message: 'Data Fetched Successfully', content: isCreated };
      }
      return { status: 'Error', message: 'Error Creating details', content: {} };
    },
    updatePointLesson: async (_, args, { token }) => {
      let pointLesson = await PointLesson.findById(args._id);
      if (pointLesson) {
        pointLesson.title = args.title ? args.title : pointLesson.title;
        pointLesson.numberOfQuestion = args.numberOfQuestion ? args.numberOfQuestion : pointLesson.numberOfQuestion;
        pointLesson.ScoreConstant = args.ScoreConstant ? args.ScoreConstant : pointLesson.ScoreConstant;
      }
      const isUpdated = await PointLesson.findByIdAndUpdate(args._id, { $set: pointLesson }, { returnOriginal: false });
      if (isUpdated) {
        return { status: 'Success', message: 'Data Fetched Successfully', content: isUpdated };
      }
      return { status: 'Error', message: 'Error Creating details', content: {} };
    },
    deletePointLesson: async (_, args, { token }) => {
      const isDeleted = await PointLesson.findByIdAndRemove(args._id);
      if (isDeleted) {
        return { status: 'Success', message: 'Data deleted Successfully', content: isDeleted };
      }
      return { status: 'Error', message: 'could not be deleted', content: null };
    },
    addExamField: async (_, args, { token }) => {
      let examField = {
        _id: new mongoose.mongo.ObjectId(),
        title: args.title,
        lessonId: args.lessonId,
        splintConstant: args.splintConstant
      };
      const isCreated = await ExamField.create(examField);
      if (isCreated) {
        return { status: 'Success', message: 'Data Fetched Successfully', content: isCreated };
      }
      return { status: 'Error', message: 'Error Creating details', content: {} };
    },
    updateExamField: async (_, args, { token }) => {
      let examField = await ExamField.findById(args._id);
      if (examField) {
        examField.title = args.title ? args.title : examField.title;
        examField.lessonId = args.lessonId ? args.lessonId : examField.lessonId;
        examField.splintConstant = args.splintConstant ? args.splintConstant : examField.splintConstant;
      }
      const isUpdated = await ExamField.findByIdAndUpdate(args._id, { $set: examField }, { returnOriginal: false });
      if (isUpdated) {
        return { status: 'Success', message: 'Data Updated Successfully', content: isUpdated };
      }
      return { status: 'Error', message: 'Error Updated details', content: {} };
    },
    deleteExamField: async (_, args, { token }) => {
      const isDeleted = await ExamField.findByIdAndRemove(args._id);
      if (isDeleted) {
        return { status: 'Success', message: 'Data deleted Successfully', content: isDeleted };
      }
      return { status: 'Error', message: 'could not be deleted', content: null };
    },
    addResultFile: async (_, args, { token }) => {
      const { filename, mimetype, createReadStream } = await args.file;
      let stream = createReadStream();
      const uploadDir = './';
      const path = `${uploadDir}/${filename}`;
      await new Promise((resolve, reject) =>
        stream
          .on('error', error => {
            if (stream.truncated)
              // delete the truncated file
              fs.unlinkSync(path);
            reject(error);
          })
          .pipe(fs.createWriteStream(path))
          .on('error', error => reject(error))
          .on('finish', () => resolve({ path }))
      );
      return {
        status: 'Success',
        message: 'File has been Added to backend',
        content: {
          details: "The Result File has been added"
        }
      }
    },
    deleteResultFile: async (_, args, { token }) => {
      fs.unlink('sample.txt', function (err) {
        if (err) return { status: 'Error', message: 'File could not be deleted', content: null };
        // if no error, file has been deleted successfully
        return { status: 'Success', message: 'File has been deleted', content: null };
      });
    },

  }
};
