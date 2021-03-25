const mongoose = require('mongoose');
const {
  UserInputError
} = require('apollo-server');

const Category = require('./models/category.model');
const City = require("./models/city.model");
const District = require('./models/district.model');
const Role = require('./models/role.model');
const RoleAuthority = require('./models/roleAuthority.model');
const School = require('./models/school.model');
const StudentMemberType = require('./models/studentMemberType.model');
const University = require('./models/university.model');
const GraduateField = require('./models/graduatefield.model');
const Class = require('./models/class.model');
const AnswerKeyEditorRole = require('./models/answerKeyEditorRole.model');
const AnswerKeyEditorRoleQuestion = require('./models/answerKeyEditorRoleQuestion.model');
const GraduateStatus = require('./models/GraduateStatus');
// const { checkToken } = require('./libs/middleware');
const Utils = require("./utils");
const Student = require('./models/student.model');
const answerKeyEditorRoleModel = require('./models/answerKeyEditorRole.model');

module.exports = {
  Query: {
    // -----   C A T E G O R Y   -----
    category: async (_, args, { token }) => {
      const category = await Category.findOne({ _id: args._id });
      return { status: 'Success', message: 'Data updated fetched', content: category };
    },
    categories: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.categoryTitle) { where.categoryTitle = new RegExp(args.title, 'i'); }

      let cates = await Category.find(where).skip(offset).limit(limit);
      return { status: 'Success', message: 'Data updated fetched', content: cates };
    },

    // -----   C I T Y   -----
    cities: async (_, args, { token }) => {
      // Utils.checkToken(token); //console.log(decoded);
      let where = {};
      let cities = [];
      const offset = args.offset !== undefined ? args.offset : 0;
      if (args.limit !== undefined) {
        cities = await City.find(where).skip(offset).limit(args.limit);
      } else {
        cities = await City.find(where);
      }
      return { status: 'Success', message: 'Data updated fetched', content: cities };;
    },
    city: async (_, args, { token }) => {
      if (args._id === undefined && args.code === undefined) {
        throw new UserInputError('Either of _id or code is required', {
          invalidArgs: ['_id', 'code']
        });
      }
      let where = {};
      if (args._id !== undefined) {
        where._id = args._id;
      }
      if (args.code !== undefined) {
        where.code = args.code;
      }
      const city = await City.findOne(where);
      return { status: 'Success', message: 'Data updated fetched', content: city };
    },

    // -----   D I S T R I C T   -----
    districts: async (_, args, { token }) => {
      let where = {};
      let districts = [];
      const offset = args.offset !== undefined ? args.offset : 0;
      if (args.limit !== undefined) {
        districts = await District.find(where).skip(offset).limit(args.limit);
      } else {
        districts = await District.find(where);
      }
      return { status: 'Success', message: 'Data updated fetched', content: districts };
    },
    district: async (_, args, { token }) => {
      const district = await District.findOne({ _id: args._id });
      return { status: 'Success', message: 'Data updated fetched', content: district };
    },

    // -----   R O L E   -----
    roles: async (_, args, { token }) => {
      let where = {};
      let roles = [];
      const offset = args.offset !== undefined ? args.offset : 0;
      if (!!args.limit) {
        roles = await Role.find(where).skip(offset).limit(args.limit);
      } else {
        roles = await Role.find(where);
      }
      return { status: 'Success', message: 'Data updated fetched', content: roles };
    },
    role: async (_, args, { token }) => {
      const role = await Role.findOne({ _id: args._id });
      return { status: 'Success', message: 'Data updated fetched', content: role };
    },

    // -----     R O L E    A U T H O R I T Y     -----
    roleAuthority: async (_, args, { token }) => {
      const roleAuthority = await RoleAuthority.findOne({ _id: args._id });
      return { status: 'Success', message: 'Data updated fetched', content: roleAuthority };
    },
    roleAuthorities: async (_, args, { token }) => {
      let where = {};
      if (!!args.roleId) { where.roleId = args.roleId; }
      if (!!args.module) { where.module = args.module; }
      if (!!args.roleConstant) { where.roleConstant = args.roleConstant; }
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;

      const roleAuthorities = await RoleAuthority.find(where).skip(offset).limit(limit);
      return { status: 'Success', message: 'Data updated fetched', content: roleAuthorities };
    },

    // -----     S C H O O L     -----
    school: async (_, args, { token }) => {
      const school = await School.findOne({ _id: args._id });
      return { status: 'Success', message: 'Data updated fetched', content: school };
    },
    schools: async (_, args, { token }) => {
      let where = {};
      if (!!args.districtId) { where.districtId = args.districtId; }
      if (!!args.name) { where.name = new RegExp(args.name, 'i'); }
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      const schools = await School.find(where).skip(offset).limit(limit); //console.log('school', schools);
      return { status: 'Success', message: 'Data updated fetched', content: schools };
    },

    // -----     STUDENT MEMBER TYPE     -----
    studentMemberType: async (_, args, { token }) => {
      const smt = await StudentMemberType.findOne({ _id: args._id });
      return { status: 'Success', message: 'Data updated fetched', content: smt };
    },
    studentMemberTypes: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      const smts = await StudentMemberType.find().skip(offset).limit(limit);
      return { status: 'Success', message: 'Data updated fetched', content: smts };
    },

    // ---------- UNIVERSITY -----------
    university: async (_, args, { token }) => {
      const uni = await University.findById(args._id);
      if (uni) {
        return { status: 'Success', message: 'Data fetched successfully', content: uni };
      }
      return { status: 'Error', message: 'No Data found', content: {} };
    },

    universities: async (_, args, { token }) => {
      const universities = await University.find();
      if (universities) {
        return { status: 'Success', message: 'Data fetched successfully', content: universities };
      }
      return { status: 'Error', message: 'No Data found', content: {} };
    },

    // ------- GRADUATE FIELDS ----------------
    graduateField: async (_, args, { token }) => {
      const field = await GraduateField.findById(args._id);
      if (field) {
        return { status: 'Success', message: 'Data fetched successfully', content: field };
      }
      return { status: 'Error', message: 'No Data found', content: {} };
    },

    graduateFields: async (_, args, { token }) => {
      const fields = await GraduateField.find();
      if (fields) {
        return { status: 'Success', message: 'Data fetched successfully', content: fields };
      }
      return { status: 'Error', message: 'No Data found', content: {} };
    },

    GraduateStatus: async(_, args, {token}) => {
      const field = await GraduateStatus.findById(args._id);
      if (field) {
        return { status: 'Success', message: 'Data fetched successfully', content: field };
      }
      return { status: 'Error', message: 'No Data found', content: {} };
    },
    AllGraduateStatus: async(_, args, {token}) => {
      const field = await GraduateStatus.find();
      if (field) {
        return { status: 'Success', message: 'Data fetched successfully', content: field };
      }
      return { status: 'Error', message: 'No Data found', content: {} };
    },
    class : async(_, args, {token}) => {
      const clas = await Class.findById(args._id);
      return { status: 'Success', message: 'Data fetched successfully', content: clas };
    },
    classes : async(_, args, {token}) => {
      let where = {};
      if (args.teacherId) {
        where = {teacherId : args.teacherId}
      }
      const classes = await Class.find(where);
      return { status: 'Success', message: 'Data fetched successfully', content: classes };
    },
    getAnswerKeyEditorRoleQuestion : async(_, args, {token}) => {
      const clas = await AnswerKeyEditorRoleQuestion.findById(args._id);
      return { status: 'Success', message: 'Data fetched successfully', content: clas };
    },
    getAnswerKeyEditorRoleQuestions: async(_, args, {token}) => {
      const classes = await AnswerKeyEditorRoleQuestion.find();
      return { status: 'Success', message: 'Data fetched successfully', content: classes };
    },
    getAnswerKeyEditorRolePratice: async(_, args, {token}) => {
      const clas = await answerKeyEditorRoleModel.findById(args._id);
      return { status: 'Success', message: 'Data fetched successfully', content: clas };
    },
    getAnswerKeyEditorRolePratices: async(_, args, {token}) => {
      const classes = await answerKeyEditorRoleModel.find();
      return { status: 'Success', message: 'Data fetched successfully', content: classes };
    },

    //---- BACKEND FOR CHAPTER 6
    // ------------ SEARCHE CLASS ----------------------
    searchClass: async(_, args, {token}) => {
      let list = [];
      let classes = await Class.find({title : new RegExp(args.className, 'i')});
      for(let i in classes){
        let studentClass = classed[i];
        let data = {};
        data.title = studentClass.title;
        data.description = studentClass.description;
        data.isPrivate = studentClass.isPrivate;
        data.isPublished = studentClass.isPublished;
        data.classCode = studentClass.classCode;
        data.teacherId = studentClass.teacherId;
        data.isStudentJoined = studentClass.studentId.include(args.studentId); 
        data.NumberOfStudents = studentClass.studentId.length;
        list.push(data);
      }
      return { status: 'Success', message: 'Data fetched successfully', content: list };
    }
  },

  Mutation: {
    // --------  GRADUATE STATUS ----------------
    addGraduateStatus : async(_, args, {token}) => {
      let graduateStatus = {
        _id : new mongoose.mongo.ObjectId(),
        title : args.title,
        exam : args.exam
      }
      const field = await GraduateStatus.create(graduateStatus);
      if (field) {
        return { status: 'Success', message: 'Data Added successfully', content: field };
      }
      return { status: 'Error', message: 'No Data Added', content: {} };
    },

    updateGraduateStatus : async(_, args, {token}) => {
      let graduateStatus = await GraduateStatus.findById(args._id);
      if (graduateStatus) {
        graduateStatus.title = args.title ? args.title : graduateStatus.title;
        graduateStatus.exam = args.exam ? args.exam : graduateStatus.exam;
        const field = await GraduateStatus.findByIdAndUpdate(args._id , {$set : graduateStatus}, {returnOriginal : false});
        if (field) {
          return { status: 'Success', message: 'Data Added successfully', content: field };
        } 
      }
      return { status: 'Error', message: 'No Data Upadated', content: {} };
    },

    deleteGraduateStatus : async(_, args, {token}) => {
      if (args._id) {
        const field = await GraduateStatus.findByIdAndRemove(args._id);
        if (field) {
          return { status: 'Success', message: 'Data Added successfully', content: field };
        } 
      }
      return { status: 'Error', message: 'No Data Deleted', content: {} };
    },

    // -----   C I T Y   -----
    addCategory: async (_, args, { token }) => {
      const duplicated = await Category.findOne({ categoryTitle: args.categoryTitle });
      if (!!duplicated) { return { status: 'Error', message: 'Title already exists', content: null }; }

      let category = { _id: new mongoose.mongo.ObjectId(), categoryTitle: args.categoryTitle };
      const created = await Category.create(category);
      if (!!created) { return { status: 'Success', message: 'Data has been added successfully', content: created}; }
      else { return { status: 'Error', message: 'Failed to add data', content: null }; }
    },
    updateCategory: async (_, args, { token }) => {
      let updateData = await Category.findOne({ _id: args._id });
      if (!updateData) { return { status: "Error", message: 'Data not found', content: null }; }

      let exists = await Category.findOne({ categoryTitle: args.categoryTitle });
      if (exists && updateData._id.equals(exists._id)) { return { status: 'Success', message: 'Data has been updated successfully', content: exists } }
      if (exists && !updateData._id.equals(exists._id)) { return { status: 'Error', message: 'Data duplicated', content: null }; }

      const updated = await Category.findOneAndUpdate({ _id: args._id }, { categoryTitle: args.categoryTitle }, { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data updated successfully', content: updated }; }
      else { return { status: 'Error', message: 'Failed to update data', content: null }; }
    },
    deleteCategory: async (_, args, { token }) => {
      try {
        const deleted = await Category.deleteOne({ _id: args._id });
        return { status: 'Success', message: 'Data has been deleted successfully', content: { ...deleted, _id: args._id } };
      }
      catch (e) {
        return { status: 'Error', message: 'Something went wrong', content: {} };
      }
    },

    // -----   C I T Y   -----
    addCity: async (_, args, { token }) => {
        let city = {
          _id: new mongoose.mongo.ObjectId(),
          cityId: args.cityId,
          cityName: args.cityName,
        };

        const created = await City.create(city);
        if (!created) {
          return {
            status: 'Error',
            message: "Failed to add city...",
            content: {}
          };
        } else {
          return {
            status: 'Success',
            message: "You added a new city successfully",
            content: created
          };
        }
    },
    updateCity: async (_, args, { token }) => {
      let updateData = await City.findOne({ _id: args._id });
      if (!updateData) { return { status: 'Error', message: 'No data found', content: {} }; }
      // check duplicated

      if (!!args.cityId) { updateData.cityId = args.cityId; }
      if (!!args.cityName) { updateData.cityName = args.cityName; }

      const updated = await City.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) {
        return {
          status: 'Success',
          message: 'Data has been updated successfully',
          content: updated,
        };
      } else { return { status: 'Error', message: 'Failed to udpate data...', content: {} }; }
    },
    deleteCity: async (_, args, { token }) => {
      try {
        let deleted = await City.deleteOne({ _id: args._id });
        deleted._id = args._id;
        return { status: 'Success', message: 'Data has been deleted successfully', content: deleted };
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: e.message }
      }
    },

    // -----   D I S T R I C T   -----
    addDistrict: async (_, args, { token }) => {
      const duplicated = await Utils.checkDuplicate.district(args.cityId, args.districtName, args.districtName);
      if (duplicated === true) {
        return { status: 'Error', message: 'District already exists!', content: {} };
      }
      let district = { _id: new mongoose.mongo.ObjectId(), cityId: args.cityId, districtId: args.districtId || "", districtName: args.districtName };
      const created = await District.create(district);
      if (!created) {
        return { status: 'Error', message: 'Failed to add a district...', content: {} };
      } else {
        return { status: 'Success', message: 'Data had been added successfully', content: created};
      }
    },
    updateDistrict: async (_, args, { token }) => {
      Utils.checkOptionalRequired(args, ['cityId', 'districtName']);
      let updateData = await District.findOne({ _id: args._id });
      if (!updateData) { return { status: 'Error', message: 'Not data to update', content: null } }

      // check duplicated

      const exists = await District.findOne({
        _id: { $ne: args._id },
        cityId: args.cityId || updateData.cityId,
        districtName: args.districtName || updateData.districtName,
      });
      if (!!exists) { return { status: 'Error', message: 'Duplicated data', content: null }; }

      if (!!args.cityId) { updateData.cityId = args.cityId; }
      if (!!args.districtName) { updateData.districtName = args.districtName; }

      const updated = await District.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) {
        return { status: 'Success', message: 'Data has been updated successfully', content: updated};
      } else { return { status: 'Error', message: 'Failed to update data...', content: null }; }
    },
    deleteDistrict: async (_, args, { token }) => {
      try {
        let deleted = await District.deleteOne({ _id: args._id });
        if (deleted.n > 0) {
          deleted._id = args._id;
          return { status: 'Success', message: 'Data has been deleted successfully', content: deleted };
        } else { return { status: 'Error', message: 'No data to delete', content: deleted }; }

      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: e.message };
      }
    },

    // -----   R O L E   -----
    addRole: async (_, args, { token }) => {
      const duplicated = await Utils.checkDuplicate.role({ title: args.title });
      if (duplicated === true) {
        return { status: 'Error', message: 'Role already exists!', content: {} }
      }

      let role = { _id: new mongoose.mongo.ObjectId(), title: args.title, description: args.description };

      const created = await Role.create(role);
      if (!created) {
        return { status: 'Error', message: 'Failed to add a role...', content: {} };
      } else {
        return { status: 'Success', message: 'Data had been added successfully', content: created };
      }
    },
    updateRole: async (_, args, { token }) => {
      Utils.checkOptionalRequired(args, ['title', 'description']);
      let updateData = await Role.findOne({ _id: args._id });

      if (!!args.title) {
        const exists = await Role.findOne({ _id: { $ne: args._id }, title: args.title });
        if (!!exists) { return { status: 'Error', message: 'Duplicated data', content: {} }; }
      }

      if (args.title !== undefined) { updateData.title = args.title; }
      if (args.description !== undefined) { updateData.description = args.description; }

      const updated = await Role.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) {
        return { status: 'Success', message: 'Data had been updated successfully', content: updated};
      } else {
        return { status: 'Error', message: 'Failed to update data...', content: {} };
      }
    },
    deleteRole: async (_, args, { token }) => {
      try {
        let deleted = await Role.deleteOne({ _id: args._id });
        if (deleted.n > 0) {
          deleted.id = args._id;
          return { status: 'Success', message: 'Data has been deleted successfully', content: deleted };
        } else {
          return { status: 'Error', message: 'Not found data to delete', content: deleted };
        }
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: e.message };
      }
    },

    // -----     R O L E    A U T H O R I T Y     -----
    addRoleAuthority: async (_, args, { token }) => {
      const duplicated = await Utils.checkDuplicate.roleAuthority({ roleId: args.roleId, module: args.module, roleConstant: args.roleConstant });
      if (duplicated === true) { return { status: 'Error', message: 'Role authority already defined!', content: {} }; }

      let roleAuthority = { _id: mongoose.mongo.ObjectId(), roleId: args.roleId, module: args.module, roleConstant: args.roleConstant };
      const created = await RoleAuthority.create(roleAuthority);
      if (!created) { return { status: 'Error', message: 'Failed to add data', content: {} }; }
      else { return { status: 'Success', message: "Data had been added successfully", content: created}; }
    },
    addAnswerKeyEditorRoleForPracticeExam: async (_, args, {token}) => {
      const role = {
        _id: mongoose.mongo.ObjectId(),
        admin: args.admin,
        role: args.role,
        practiceExamSet: args.practiceExamSet|| [],
        bookletTest: args.bookletTest|| []
      }
      const isCreated = await AnswerKeyEditorRole.create(role);
      if (isCreated) {
        return {status: 'Success', message: 'Role has been Created', content: isCreated};
      }
      return {status: 'Error', message: 'Role cannot be added', content: {'errorDetails': 'error while creating value'}};
    },
    updateAnswerKeyEditorRoleForPracticeExam: async (_, args, {token}) => {
      const field = AnswerKeyEditorRole.findById(args._id);
      if (field) {
        field.admin = args.admin ? args.admin : field.admin;
        field.role = args.role? args.role : field.role;
        field.practiceExamSet = args.practiceExamSet? args.practiceExamSet : field.practiceExamSet
        field.bookletTest = args.bookletTest? args.bookletTest : field.bookletTest;
        const isUpdated = await AnswerKeyEditorRole.findByIdAndUpdate(args._id, {$set : field}, {returnOriginal : false});
        if (isUpdated) {
          return {status: 'Success', message: 'Data has been updated', content: isUpdated};
        }
      }
      return {status: 'Error', message: 'Something Went Wrong', content: {'errorDetails': 'Something Went Wrong'}};
    },
    deletedAnswerKeyEditorRoleForPracticeExam: async (_, args, {token}) => {
      if (args._id) {
        const isDeleted = await AnswerKeyEditorRole.findByIdAndDelete(args._id)
        if (isDeleted) {
          return {status: 'Success', message: 'Data has been Deleted', content: isDeleted};
        }
      }
      return {status: 'Error', message: 'Unable to Delete', content: {'errorDetails': 'something Went Wrong'}};
    },
    addAnswerKeyEditorRoleForQuestionBook: async (_, args, {token}) => {
      const role = {
        _id: mongoose.mongo.ObjectId(),
        admin: args.admin,
        book: args.book,
        BookUnit: args.BookUnit || [],
        BookUnitSection: args.BookUnitSection|| [],
        tests: args.tests|| [],
        role: args.role,
      }
      const isCreated = await AnswerKeyEditorRoleQuestion.create(role);
      if (isCreated) {
        return {status: 'Success', message: 'Role has been Created', content: isCreated};
      }
      return {status: 'Error', message: 'Role cannot be added', content: {'errorDetails': 'error while creating value'}};
    },
    updateAnswerKeyEditorRoleForQuestionBook: async (_, args, {token}) => {
      const field = AnswerKeyEditorRoleQuestion.findById(args._id);
      if (field) {
        field.admin = args.admin ? args.admin : field.admin;
        field.book = args.book? args.book : field.book;
        field.BookUnit = args.BookUnit? args.BookUnit : field.BookUnit;
        field.BookUnitSection = args.BookUnitSection? args.BookUnitSection : field.BookUnitSection;
        field.tests = args.tests? args.tests : field.tests;
        field.role = args.role? args.role : field.role;
        const isUpdated = await AnswerKeyEditorRoleQuestion.findByIdAndUpdate(args._id, {$set : field}, {returnOriginal : false});
        if (isUpdated) {
          return {status: 'Success', message: 'Data has been updated', content: isUpdated};
        }
      }
      return {status: 'Error', message: 'Something Went Wrong', content: {'errorDetails': 'Something Went Wrong'}};
    },
    deletedAnswerKeyEditorRoleForQuestionBook: async (_, args, {token}) => {
      if (args._id) {
        const isDeleted = await AnswerKeyEditorRoleQuestion.findByIdAndDelete(args._id)
        if (isDeleted) {
          return {status: 'Success', message: 'Data has been Deleted', content: isDeleted};
        }
      }
      return {status: 'Error', message: 'Unable to Delete', content: {'errorDetails': 'something Went Wrong'}};
    },
    updateRoleAuthority: async (_, args, { token }) => {
      Utils.checkOptionalRequired(args, ['roleId', 'module', 'roleConstant']);
      const roleAuthority = await RoleAuthority.findOne({ _id: args._id });
      if (!roleAuthority) { return { status: 'Error', message: 'Not found data', content: {} }; }

      let updateData = { roleId: roleAuthority.roleId, module: roleAuthority.module, roleConstant: roleAuthority.roleConstant };

      if (!!args.roleId) { updateData.roleId = args.roleId; }
      if (!!args.module) { updateData.module = args.module; }
      if (!!args.roleConstant) { updateData.roleConstant = args.roleConstant; }

      const updateExist = await RoleAuthority.findOne({ ...updateData, _id: { $ne: args._id } });
      if (!!updateExist) { return { status: 'Error', message: 'Same info already exists.', content: {} }; }
      const updated = await RoleAuthority.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data has been updated successfully', content: updated}; }
      else { return { status: 'Error', message: 'Failed to update data...', content: {} }; }
    },
    deleteRoleAuthority: async (_, args, { token }) => {
      try {
        const deleted = await RoleAuthority.deleteOne({ _id: args._id });
        if (deleted.n > 0) {
          deleted._id = args._id;
          return { status: 'Success', message: 'Data has been deleted successfully', content: deleted };
        }
        else { return { status: 'Error', message: 'Not found to delete', content: {} }; }

      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: e.message };
      }
    },

    // -----     S C H O O L     -----
    addSchool: async (_, args, { token }) => {
      const duplicated = await Utils.checkDuplicate.school({ districtId: args.districtId, name: args.name, cityId: args.cityId });
      if (!!duplicated) { return { status: 'Error', message: 'School already exists!', content: null }; }

      let school = { _id: new mongoose.mongo.ObjectId(), districtId: args.districtId, name: args.name, cityId: args.cityId || "" };
      const created = await School.create(school);
      if (!created) { return { status: 'Error', message: 'Failed to add data', content: null }; }
      else { return { status: 'Success', message: 'Data has been added successfully', content: created}; }
    },
    updateSchool: async (_, args, { token }) => {
      Utils.checkOptionalRequired(args, ['districtId', 'name']);

      // check existence
      let updateData = await School.findOne({ _id: args._id });
      if (!updateData) { return { status: 'Error', message: 'Not found data', content: null }; }

      // check duplicate
      const exists = await School.findOne({
        _id: { $ne: args._id },
        districtId: args.districtId || updateData.districtId,
        name: args.name || updateData.name,
      });
      if (!!exists) { return { status: 'Error', message: 'Duplicated data', content: null }; }

      if (!!args.name) { updateData.name = args.name; }
      if (!!args.districtId) { updateData.districtId = args.districtId; }

      const updated = await School.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data has been updated successfully', content: updated}; }
      else { return { status: 'Error', message: 'Failed to update data...', content: {} }; }
    },
    deleteSchool: async (_, args, { token }) => {
      try {
        let deleted = await School.deleteOne({ _id: args._id });

        return { status: 'Success', message: 'Data has been deleted successfully', content: { ...deleted, _id: args._id } };
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: e.message };
      }
    },

    // -----     STUDENT MEMBER TYPE     -----
    addStudentMemberType: async (_, args, { token }) => {
      const duplicated = await Utils.checkDuplicate.smt({ typeTitle: args.typeTitle });
      if (!!duplicated) { return { status: 'Error', message: 'Data already exists', content: null }; }

      let smt = { _id: new mongoose.mongo.ObjectId(), typeTitle: args.typeTitle, descriptions: args.descriptions || "", piece: args.piece || 0 };
      const created = await StudentMemberType.create(smt);
      if (!created) { return { status: 'Error', message: 'Failed to add data', content: null }; }
      else { return { status: 'Success', message: 'Data had been added successfully', content: created }; }
    },
    updateStudentMemberType: async (_, args, { token }) => {
      Utils.checkOptionalRequired(args, ['typeTitle', 'descriptions', 'piece']);
      const smt = await StudentMemberType.findOne({ _id: args._id });
      if (!smt) { return { status: 'Error', message: "Not found data", content: {} }; }

      let updateData = { typeTitle: smt.typeTitle, descriptions: smt.descriptions, piece: smt.piece };
      if (!!args.typeTitle) { updateData.typeTitle = args.typeTitle; }
      if (!!args.descriptions) { updateData.descriptions = args.descriptions; }
      if (!!args.piece) { updateData.piece = args.piece; }

      const updateExists = await StudentMemberType.findOne({ typeTitle: updateData.typeTitle, _id: { $ne: args._id } });
      if (!!updateExists) { return { status: 'Error', message: 'Same info already exists.', content: {} }; }

      const updated = await StudentMemberType.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data has been updated successfully', content: updated}; }
      else { return { status: 'Error', message: 'Failed to update data...', content: {} }; }

    },
    deleteStudentMemberType: async (_, args, { token }) => {
      try {
        let deleted = await StudentMemberType.deleteOne({ _id: args._id });
        return { status: 'Success', message: 'Data had been deleted successfully', content: { ...deleted, _id: args._id } };
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: e.message };
      }
    },

    // ----------- BULK ADDITION VIA EXCEL -------------------
    addSchoolsViaExcel: async (_, args, { token }) => {
      let NewlyAdded = 0;
      await args.schools.map(async res => {
        const duplicated = await Utils.checkDuplicate.school({ districtId: res.districtId, name: res.name, cityId: res.cityId });
        if (!duplicated) {
          let school = { _id: new mongoose.mongo.ObjectId(), districtId: res.districtId, res: args.name, cityId: res.cityId || "" };
          const created = await School.create(school);
          if (created) {
            NewlyAdded = NewlyAdded + 1;
          }
        }
      });
      return { status: 'Success', message: 'Data had been Updated successfully', content: { "schoolAdded": NewlyAdded } };
    },
    addCitiesViaExcel: async (_, args, { token }) => {
      let NewlyAdded = 0;
      await args.cities.map(async res => {
        const whereDup = {
          cityId: res.cityId
        };
        const duplicated = await City.findOne(whereDup);
        if (!duplicated) {
          let city = {
            _id: new mongoose.mongo.ObjectId(),
            cityId: res.cityId,
            cityName: res.cityName,
          };
          const created = await City.create(city);
          if (created) {
            NewlyAdded = NewlyAdded + 1;
          }
        }
      });
      return { status: 'Success', message: 'Data had been Updated successfully', content: { "citiesAdded": NewlyAdded } };
    },
    addDistrictViaExcel: async (_, args, { token }) => {
      let NewlyAdded = 0;
      await args.districts.map(async res => {
        const duplicated = await Utils.checkDuplicate.district(res.cityId, res.districtName, res.districtName);
        if (!duplicated) {
          let district = { _id: new mongoose.mongo.ObjectId(), cityId: res.cityId, districtId: res.districtId || "", districtName: res.districtName };
          const created = await District.create(district);
          if (created) {
            NewlyAdded = NewlyAdded + 1;
          }
        }
      });
      return { status: 'Success', message: 'Data had been Updated successfully', content: { "districtAdded": NewlyAdded } };
    },

    addUniversityViaExcel: async (_, args, { token }) => {
      let NewlyAdded = 0;
      await args.universities.map(async res => {
        let university;
        let uni;
        if (args.title) {
          uni = {
            title: res.title,
            department: res.department
          };
          university = await University.findOne(uni);
          if (!university) {
            uni = {
              _id: new mongoose.mongo.ObjectId(),
              title: args.title,
              department: args.department,
              departmentPoint: args.departmentPoint,
              departmentScore: args.departmentScore
            }
            university = await University.create(uni);
            if (university) {
              NewlyAdded = NewlyAdded + 1;
            }
          }
        }
      })
    },

    addGraduateField: async (_, args, {token}) => {
      const isDuplicate = await GraduateField.findOne({title: args.title});
      if (isDuplicate) {
        return { status: 'Error', message: 'Data cannot be added', content: {ErrorDetail: "duplicated entry"}};
      } else {
        let graduatefield = {
          _id: new mongoose.mongo.ObjectId(),
          title: args.title
        };
        const isCreated = await GraduateField.create(graduatefield);
        if (isCreated) {
          return { status: 'Success', message: 'Data has been added', content: isCreated};
        }
        return { status: 'Error', message: 'Data cannot be added', content: {ErrorDetail: "Unable to Create"}};
      }
    },

    updateGraduateField: async (_, args, { token }) => {
      const field = await GraduateField.findById(args._id);
      if (field) {
        field.title = args.title ? args.title : field.title;
        const isUpdated = await GraduateField.findByIdAndUpdate(args._id, {$set : field} , {returnOriginal : false});
        if (isUpdated) {
          return { status: 'Success', message: 'Data has been Updated', content: isUpdated};
        }
        return { status: 'Error', message: 'Data cannot be Updated', content: {ErrorDetail: "unable to updated. Missing fields"}};
      }
      return { status: 'Error', message: 'Data cannot be Updated', content: {ErrorDetail: "unable to updated. Missing fields"}};
    },

    deletedGraduateField : async (_, args, { token }) => {
      if (args._id) {
        const isDeleted = await GraduateField.findByIdAndDelete(args._id);
        if (isDeleted) {
          return { status: 'Success', message: 'The data has been Successfully Deleted', content: isDeleted};
        };
      }
      return { status: 'Error', message: 'Something Went wrong', content: { "errorDetails": "Something Went wrong" } };
    },
    // --------- C L A S S -----------------------
    addClass: async (_, args, { token }) => {
      let newClass = {
        title: args.title,
        description: args.description,
        teacherId: args.teacherId
      };
      const isDuplicate = await Class.findOne({ newClass });
      if (isDuplicate) {
        return { status: 'Error', message: 'Duplicated Entry', content: { "errorDetails": "Duplicated Entry. Cannot be rewritten" } };
      } else {
        newClass._id = new mongoose.mongo.ObjectId();
        newClass.isPrivate = args.isPrivate == true ? args.isPrivate : false;
        newClass.isPublished = args.isPublished == true ? args.isPublished : false;
        newClass.studentsId = args.studentsId || [];
        newClass.classCode = args.classCode || new mongoose.mongo.ObjectId();
        const isCreated = await Class.create(newClass);
        if (isCreated) {
          return { status: 'Success', message: 'The data has been Successfully added', content: isCreated };
        }
        return { status: 'Error', message: 'Duplicated Entry', content: { "errorDetails": "Duplicated Entry. Cannot be rewritten" } };
      }
    },    
    updateClass: async (_, args, { token }) => {
      let newClass = {};
        const existingclass = await Class.findById(args._id);
        newClass.title = args.title ? args.title : existingclass.title;
        newClass.description = args.description? args.description : existingclass.description;
        newClass.teacherId = args.teacherId? args.teacherId : existingclass.teacherId;
        newClass._id = existingclass._id;
        newClass.isPrivate = args.isPrivate == true || args.isPrivate == false ? args.isPrivate : existingclass.isPrivate;
        newClass.isPublished = args.isPublished == true || args.isPublished == false ? args.isPublished : existingclass.isPublished;
        newClass.studentsId = args.studentsId ? args.studentsId : existingclass.studentsId;
        newClass.classCode = args.classCode ? args.classCode : existingclass.classCode;
        const isUpdated = await Class.findByIdAndUpdate(args._id, {$set : newClass});
        if (isUpdated) {
          return { status: 'Success', message: 'The data has been Successfully Updated', content: isUpdated };
        }
        return { status: 'Error', message: 'Something Went wrong', content: { "errorDetails": "Something Went wrong" } };
    },
    deleteClass: async (_, args, { token }) => {
      if (args._id) {
        const isDeleted = await Class.findByIdAndDelete(args._id);
        if (isDeleted) {
          return { status: 'Success', message: 'The data has been Successfully Deleted', content: {"Message" : "Operation completed Successfully"} };
        };
      }
      return { status: 'Error', message: 'Something Went wrong', content: { "errorDetails": "Something Went wrong" } };
    },
    addStudentToClass: async (_, args, { token }) => {
      if (args.classId && args.studentId) {
        let selectedClass = await Class.findById(args.classId);
        selectedClass = JSON.parse(JSON.stringify(selectedClass));
        if (selectedClass.studentsId && selectedClass.studentsId.length > 0) {
          selectedClass.studentsId.push(args.studentId);
        } else {
          selectedClass.studentsId = [args.studentId]
        }
        const isUpdated = await Class.findByIdAndUpdate(args.classId, {$set : selectedClass});
        console.log('Here');
        let student = await Student.findById(args.studentId);
        console.log('Here 2');
        student = JSON.parse(JSON.stringify(student));
        if (student.classes && student.classes.length > 0) {
          student.classes.push(args.classId);
        } else {
          student.classes = [args.classId]
        }
        const ClassAddedInStudentData = await Student.findByIdAndUpdate(args.studentId, {$set : student});
        if (isUpdated) {
          return { status: 'Success', message: 'The Student has been Successfully added to Class', content: {"Message" : "The Student has been Successfully added to Class"} };
        }
      }
      return { status: 'Error', message: 'Something Went wrong', content: { "errorDetails": "Something Went wrong" } };
    },
    addStudentToClassByEmail: async (_, args, { token }) => {
      let selectedClass = await Class.findById(args.classId);
      selectedClass = JSON.parse(JSON.stringify(selectedClass));
      let student = await Student.findOne({email: args.email});
      student = JSON.parse(JSON.stringify(student));
      if (selectedClass.studentsId && selectedClass.studentsId.length > 0) {
        selectedClass.studentsId.push(student._id);
      } else {
        selectedClass.studentsId = [student._id]
      }
      const isUpdated = await Class.findByIdAndUpdate(args.classId, {$set : selectedClass});
        if (student.classes && student.classes.length > 0) {
          student.classes.push(args.classId);
        } else {
          student.classes = [args.classId]
        }
      const ClassAddedInStudentData = await Student.findByIdAndUpdate(args.studentId, {$set : student});
      if (isUpdated) {
        return { status: 'Success', message: 'The Student has been Successfully added to Class', content: {"Message" : "The Student has been Successfully added to Class"} };
      }
      return { status: 'Error', message: 'Something Went wrong', content: { "errorDetails": "Something Went wrong" } };
    },
    allClassesByTeacher: async (_, args, { token }) => {
      if (args.teacherId) {
        const allClasses = await Class.find({teacherId : args.teacherId});
        if (allClasses) {
          return { status: 'Success', message: 'Data has been fetched', content: allClasses};
        };
      }
      return { status: 'Error', message: 'Something Went wrong', content: { "errorDetails": "Something Went wrong" } };
    },
    getClassByTeacherId: async (_, args, {token}) => {
      const classes = await Class.find({teacherId: args._id});
      if (classes) {
        return {status: 'Success', message: 'Data has been retrived', content: classes};
      }
      return {status: 'Error', message: 'Data couldn\'t be  retrived', content: null};
    },

    // ------- U N I V E R S I T Y ---------------
    addUniversity: async (_, args, {token}) => {
      let university;
      let uni;
      if (args.title) {
        uni = {
          title: args.title,
          department: args.department
        };
        university = await University.findOne(uni);
        if (university) {
          return { status: 'Error', message: 'Data had Cannot be added', content: { "ErrorDetail": "Duplicate entry" } };
        } else {
          uni = {
            _id: new mongoose.mongo.ObjectId(),
            title: args.title,
            department: args.department,
            departmentPoint: args.departmentPoint,
            departmentScore: args.departmentScore
          }
          university = await University.create(uni);
          if (university) {
            return { status: 'Success', message: 'Data has been successfully added.', content: university };
          } else {
            return { status: 'Error', message: 'Data had Cannot be added', content: { "ErrorDetail": "Couldn't not create new university" } };
          }
        }
      }
    },
    updateUniversity : async (_, args, {token}) => {
      const uni = await University.findById(args._id);
      if (uni) {
        uni.title = args.title ? args.title : uni.title;
        uni.departmentPoint = args.departmentPoint ? args.departmentPoint : uni.departmentPoint;
        uni.department = args.department ? args.department : uni.department;
        uni.departmentScore = args.departmentScore ? args.departmentScore : uni.departmentScore;
        const isUpdated = await University.findByIdAndUpdate(args._id , {$set : uni}, {returnOriginal : false});
        if (isUpdated) {
          return { status: 'Success', message: 'Data has been successfully Updated.', content: isUpdated };
        }
      }
      return { status: 'Error', message: 'Data had Cannot be Updated', content: { "ErrorDetail": "Something Went Wrong" } };
    },
    deleteUniversity : async (_, args, {token}) => {
      if (args._id) {
        const isDeleted = await University.findOneAndRemove(args._id);
        if (isDeleted) {
          return { status: 'Success', message: 'Data has been successfully Deleted.', content: isDeleted };
        }
      }
      return { status: 'Error', message: 'Data could not be Deleted.', content: {} };
    },
  },
};
