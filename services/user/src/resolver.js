const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var atob = require('atob');
const redis = require("async-redis");
const Manager = require("./models/manager.model");
const Student = require('./models/student.model');
const Teacher = require('./models/teacher.model');
const Publisher = require('./models/publisher.model');
const Friend = require('./models/friend.model');
const fetch = require('node-fetch');
const redis_client = redis.createClient(process.env.PORT_REDIS);
const Utils = require("./utils");
const { sendVerificationEmail, sendEmailLink } = require('./utils/utils');
const emailverificationModel = require('./models/emailverification.model');
const Userprivacy = require('./models/userprivacy.model');
const MemberShip = require('./models/membership.model');
const SocialMedia = require('./models/socialMedia.model');
const Admin = require('./models/admin.model');
const PageStatus = require('./models/pageManagement.model');
const Notification = require('./models/notification.model');
const { v4: uuid } = require('uuid'); // (A)
const { extname } = require('path');
const s3 = require('./utils/s3');
const fs = require('fs');
const { student } = require('./utils');
const University = require('./models/university.model')
const DiscountCode = require('./models/discount.model');
const { where } = require('./models/manager.model');
const Target = require('./models/target.model');

module.exports = {

  Query: {
    // -----   M A N A G E R   -----
    managers: async (_, args, { token }) => {
      // Utils.checkToken(token); //console.log(decoded);
      let where = {};
      if (args.roleId !== undefined) { where.roleId = args.roleId; }
      if (args.districtId !== undefined) { where.districtId = args.districtId; }
      if (args.isConfirmed !== undefined) { where.isConfirmed = args.isConfirmed; }

      const offset = args.offset !== undefined ? args.offset : 0;
      const limit = args.limit !== undefined ? args.limit : 0;
      let managers = [];
      managers = await Manager.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data fetched successfully', content: managers};
    },
    manager: async (_, args, { token }) => {
      const manager = await Manager.findOne({ _id: args._id });
      return {status: 'Success', message: 'Data fetched successfully', content: manager};
    },

    // -----   S T U D E N T   -----
    student: async (_, args, { token }) => {
      const stu = await Student.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: stu};
    },
    students: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      //schoolId: String, studentMemberTypeId: String, isConfirmed: Boolean
      let where = {};
      if (!!args.schoolId) { where.schoolId = args.schoolId; }
      if (!!args.studentMemberTypeId) { where.studentMemberTypeId = args.studentMemberTypeId; }
      if (!!args.isConfirmed) { where.isConfirmed = args.isConfirmed; }
      let stud = await Student.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data fetched successfully', content: stud};
    },
    getUniversityPreferenceList: async (_, args, { token }) => {      
      let student = await Student.findById(args.studentId);
      if (student) {
        let list = [];
        for (let i in student.universityPreferenceList) {
          let uni = student.universityPreferenceList[i];
          let where = {};
          where._id = student._id;
          where.number = uni.number;
          let uni_ = await University.findById(uni.UniversityId);
          if (uni_) {
            where.title = uni_.title;
            where.department = uni_.department;
            where.departmentPoint = uni_.departmentPoint;
            where.departmentScore = uni_.departmentScore;
            list.push(where);
          }
        }
        return { status: 'Success', message: 'Data has been fetched', content: list};
      } else {
        return { status: 'Error', message: 'Student does not exist', content: {}};
      }    
    },

    // -----   T E A C H E R   -----
    teacher: async (_, args, { token }) => {
      const teacher = await Teacher.findOne({ _id: args._id });
      return {status: 'Success', message: 'Data fetched successfully', content: teacher};
    },
    teachers: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 100;
      let where = {};
      if (!!args.schoolId) { where.schoolId = args.schoolId; }
      if (!!args.roleId) { where.roleId = args.roleId; }
      if (!!args.isConfirmed) { where.isConfirmed = args.isConfirmed; }
      const teachers = await Teacher.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data fetched successfully', content: teachers};
    },

    // -----   P U B L I S H E R   -----
    publisher: async (_, args, { token }) => {
      const publisher = await Publisher.findOne({ _id: args._id });
      return {status: 'Success', message: 'Data fetched successfully', content: publisher};
    },
    publishers: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.name) { where.name = new RegExp(args.name, 'i'); }
      if (!!args.address) { where.address = new RegExp(args.address, 'i'); }
      if (!!args.phone) { where.phone = args.phone; }
      if (!!args.email) { where.email = args.email; }

      let publishers = await Publisher.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data fetched successfully', content: publishers};
    },

    // -----   F R I E N D   -----
    friend: async (_, args, { token }) => {
      const friend = await Friend.findOne({ _id: args._id });
      return {status: 'Success', message: 'Data fetched successfully', content: friend};
    },
    friends: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.studentId) { where.studentId = args.studentId; }
      if (!!args.teacherId) { where.teacherId = args.teacherId; }
      if (args.isAccepted !== undefined) { where.isAccepted = args.isAccepted; }
      if (args.isSenderAsStudent !== undefined) { where.isSenderAsStudent = args.isSenderAsStudent; }

      let friends = await Friend.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data fetched successfully', content: friends};
    },

    // ----------- PRIVACY ----------
    getUserPrivacy: async (_, args, {token}) => {
      const userPrivacy = await Userprivacy.find();
      return {status: 'Success', message: 'Data fetched successfully', content: userPrivacy};
    },

    getPageStatus: async (_, args, {token}) => {
      const pageStatus = PageStatus.findOne({title : "default"});
      return {status: 'Success', message: 'Data fetched successfully', content: pageStatus};
    },

    getMembership: async (_, args, {token}) => {
      const membership = MemberShip.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: membership};
    },
    getMemberships: async (_, args, {token}) => {
      const membership = MemberShip.find();
      return {status: 'Success', message: 'Data fetched successfully', content: membership};
    },
    getAdmin: async (_, args, {token}) => {
      const admin = Admin.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: admin};
    },
    getAdmins: async (_, args, {token}) => {
      const admins = Admin.find();
      return {status: 'Success', message: 'Data fetched successfully', content: admins};
    },
    getNotification: async (_, args, {token}) => {
      const notifi = Notification.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: notifi};
    },
    getNotifications: async (_, args, {token}) => {
      const notifi = Notification.find();
      return {status: 'Success', message: 'Data fetched successfully', content: notifi};
    },
    getSocialMedia: async (_, args, {token}) => {
      const media = SocialMedia.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: media};
    },
    getAllSocialMedia: async (_, args, {token}) => {
      const media = SocialMedia.find();
      return {status: 'Success', message: 'Data fetched successfully', content: media};
    },
    getDiscountCode: async (_, args, {token}) => {
      const code = DiscountCode.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: code};
    },
    getDiscountCodes: async (_, args, {token}) => {
      const codes = DiscountCode.find();
      return {status: 'Success', message: 'Data fetched successfully', content: codes};
    },

    // BACKEND FOR CHAPTER 7
    // GET TARGETS
    getTargets: async (_, args, {token}) => {
      let list = {};
      list.data = [];
      let day = Date.parse(args.day);
      let targets = await Target.find({studentId: String, created_at: day});
      let totalPercentageOfCompletion = 0;
      let totalTargetedStudyHours = 0;
      let totalTargetDate = day;
      let totalStudiedHours = 0;
      let totalFocusingLetter = "";

      for(let i in targets){
        let target = targets[i];
        let studentTarget = {};
        studentTarget.name = target.name;
        if (target.reachedTime == "SPECIAL"){
          studentTarget.reachedTime = target.reachedEndTime;
        } else {
          studentTarget.reachedTime = target.reachedTime;
        }

        let studentStudiedTime = 0;
        let targetedTimes = target.studiedTimes;
        for (let j in targetedTimes){
          studentStudiedTime += targetedTimes[j]
        }
        studentTarget.studiedTime = studentStudiedTime;

        let percentageOfCompletion = 0;
        if (target.targetedTime == 0){
          percentageOfCompletion = 0;
        } else {
          percentageOfCompletion = Math.floor(studentStudiedTime/target.targetedTime * 100);
        }
        studentTarget.percentageOfCompletion = percentageOfCompletion;

        let focusingLetter = "";
        if (percentageOfCompletion < 30){
          focusingLetter = "D";
        } else if (percentageOfCompletion >= 30 && percentageOfCompletion < 50){
          focusingLetter = "c";
        } else if (percentageOfCompletion >= 50 && percentageOfCompletion < 80){
          focusingLetter = "B";
        } else if (percentageOfCompletion >= 80){
          focusingLetter = "A";
        }

        list.data.push(studentTarget);


        totalTargetedStudyHours += target.targetedTime;
        totalStudiedHours += studentStudiedTime;
      }

      if (totalTargetedStudyHours == 0){
        totalPercentageOfCompletion = 0;
      } else {
        totalPercentageOfCompletion = Math.floor(totalStudiedHours/totalTargetedStudyHours * 100);
      }

      if (totalPercentageOfCompletion < 30){
        totalFocusingLetter = "D";
      } else if (totalPercentageOfCompletion >= 30 && totalPercentageOfCompletion < 50){
        totalFocusingLetter = "c";
      } else if (totalPercentageOfCompletion >= 50 && totalPercentageOfCompletion < 80){
        totalFocusingLetter = "B";
      } else if (totalPercentageOfCompletion >= 80){
        totalFocusingLetter = "A";
      }

      return {status: 'Success', message: 'Data fetched successfully', content: list};
    },

    getTargetsAnalysisData: async (_, args, {token}) => {
      let list = [];
      let now = new Date();
      let nowInt = now.getTime();
      
      let targets = await Target.find({studentId: String});
      for (let k = 0; k < 30; k++){ 
        let time = {}
        let startTimeInt = nowInt - (30 - k) * 24 * 60 * 60 * 1000;
        let endTimeInt = nowInt - (30 - k + 1) * 24 * 60 * 60 * 1000;
        let studentTargetedTime = 0;
        let studentStudiedTime = 0;
        for (let i in targets){
          let target = targets[i];
          let studiedTimes = target.studiedTimes;
          for (let j in studiedTimes){
            let studiedTime = studiedTimes[j];
            let tempTime = target.studiedDates[j];
            let tempTimeInt = tempTime.getTime();
            if (tempTimeInt >= startTimeInt && tempTime <= endTimeInt){
              studentTargetedTime += target.targetedTime;
              studentStudiedTime += studiedTime;
            }
          }
        }
        time.studentTargetedTime = studentTargetedTime;
        time.studentStudiedTime = studentStudiedTime;
        list.push(time);
      }
      return {status: 'Success', message: 'Data fetched successfully', content: list};
    },

    getDailyReportForTargets: async (_, args, {token}) => {
      let list = {};
      list.data = [];
      let percentage = [];
      let date = new Date();
      let hour = now.getHours();
      let now = date.getTime() - parseInt(hour) * 60 * 60 * 1000; 

      let targets = await Target.find({studentId: String});
      
      let totalStudiedHours = 0;
      let totalStudiedCount = 0;
      let totalBreakCount = target.breakCount;

      for(let i in targets){
        let target = targets[i];
        let studentTarget = {};
        studentTarget.name = target.name;

        let studentStudiedTime = 0;
        let targetedTimes = target.studiedTimes;
        for (let j in targetedTimes){
          if (target.studiedDates[j].getTime() > now) {
            studentStudiedTime += targetedTimes[j],
            totalStudiedCount += 1;
          }     
        }
        studentTarget.studiedTime = studentStudiedTime;
        percentage.push(studentStudiedTime);

        let percentageOfCompletion = 0;
        if (target.targetedTime == 0){
          percentageOfCompletion = 0;
        } else {
          percentageOfCompletion = Math.floor(studentStudiedTime/target.targetedTime * 100);
        }
        studentTarget.percentageOfCompletion = percentageOfCompletion;

        let focusingLetter = "";
        if (percentageOfCompletion < 30){
          focusingLetter = "D";
        } else if (percentageOfCompletion >= 30 && percentageOfCompletion < 50){
          focusingLetter = "c";
        } else if (percentageOfCompletion >= 50 && percentageOfCompletion < 80){
          focusingLetter = "B";
        } else if (percentageOfCompletion >= 80){
          focusingLetter = "A";
        }

        list.data.push(studentTarget);

        totalStudiedHours += studentStudiedTime;
      }

      if (totalStudiedCount == 0){
        list.totalFocusingTime = 0;
      } else {
        list.averageFocusingTime = Math.floor(totalStudiedHours/totalStudiedCount);
      }
      list.totalBreakCount = totalBreakCount;

      if (totalStudiedHours != 0){
        let n = list.data.length;
        let sum = 0;
        for(i = 0; i < n - 1; i++){
          let value = 0;
          value = Math.floor(list.data[i].studiedHours/totalStudiedHours * 100);
          list.data[i].percentageOfTotal = value;
          sum += value;
        }
        list.data[n-1].percentageOfTotal = 100 - sum;
      } else {
        for(i = 0; i < n - 1; i++){
          list.data[i].percentageOfTotal = 0;
        }
      }

      return {status: 'Success', message: 'Data fetched successfully', content: list};
    },

    getBestOfDay: async (_, args, {token}) => {
      let list = {};
      list.data = [];
      let percentage = [];
      let date = new Date();
      let hour = now.getHours();
      let now = date.getTime() - parseInt(hour) * 60 * 60 * 1000;

      let user = await Student.find({_id: args.studentId});
      list.profileImage = user.image;
      list.username = user.username;

      let targets = await Target.find({studentId: String});
      
      let totalStudiedHours = 0;
      let totalStudiedCount = 0;
      let totalBreakCount = target.breakCount;

      for(let i in targets){
        let target = targets[i];
        let studentTarget = {};
        studentTarget.name = target.name;

        let studentStudiedTime = 0;
        let targetedTimes = target.studiedTimes;
        for (let j in targetedTimes){
          if (target.studiedDates[j].getTime() > now) {
            studentStudiedTime += targetedTimes[j],
            totalStudiedCount += 1;
          }     
        }
        studentTarget.studiedTime = studentStudiedTime;
        percentage.push(studentStudiedTime);

        let percentageOfCompletion = 0;
        if (target.targetedTime == 0){
          percentageOfCompletion = 0;
        } else {
          percentageOfCompletion = Math.floor(studentStudiedTime/target.targetedTime * 100);
        }
        studentTarget.percentageOfCompletion = percentageOfCompletion;

        let focusingLetter = "";
        if (percentageOfCompletion < 30){
          focusingLetter = "D";
        } else if (percentageOfCompletion >= 30 && percentageOfCompletion < 50){
          focusingLetter = "c";
        } else if (percentageOfCompletion >= 50 && percentageOfCompletion < 80){
          focusingLetter = "B";
        } else if (percentageOfCompletion >= 80){
          focusingLetter = "A";
        }

        totalStudiedHours += studentStudiedTime;
      }

      if (totalStudiedCount == 0){
        list.totalFocusingTime = 0;
      } else {
        list.averageFocusingTime = Math.floor(totalStudiedHours/totalStudiedCount);
      }

      let targets1 = await Target.find();
      for(let i in targets1){
        let userTarget = targets1[i];
        userTarget.ranking = 1;
        for(let j in targets1){
          if (userTarget.score < targets1[j].score){
            userTarget.ranking += 1;
          }
        }
      }

      for(i = 1; i <= 100; i++){
        let rankingTarget = {};
        let data = await Target.find({ranking: i});
        let rankingUser = await Student.find({_id: data.studentId});
        rankingTarget.username = rankingUser.username;
        rankingTarget.profileImage = rankingUser.image;
        rankingTarget.focusingLetter = data.focusingLetter;
        rankingTarget.ranking = i;
        rankingTarget.targetedTime = data.targetedTime;
        list.data.push(rankingTarget);
      }

      return {status: 'Success', message: 'Data fetched successfully', content: list};
    },

    getTarget: async (_, args, {token}) => {
      let target = await Target.find({studentId: String, targetId: String});
      let list = {};
      let studentStudiedTime = 0;
      let targetedTimes = target.studiedTimes;
      for (let j in targetedTimes){
        studentStudiedTime += targetedTimes[j]
      }
      list.studiedTime = studentStudiedTime;

      let n = target.studiedDates.length;
      let lastStudyTime = target.studiedDates[n-1];
      let now = new Date();
      list.studiedTime = Math.floor((now.getTime() - lastStudyTime.getTime())/(1000 * 60));

      let percentageOfCompletion = 0;
      if (target.targetedTime == 0){
        percentageOfCompletion = 0;
      } else {
        percentageOfCompletion = Math.floor(studentStudiedTime/target.targetedTime * 100);
      }
      list.percentageOfCompletion = percentageOfCompletion;
      list.givenBreakCount = target.givenBreakCount;

      if(target.studiedTimes.length == 0){
        list.averageFocusingTime = 0;
      } else {
        list.averageFocusingTime = Math.floor(studentStudiedTime / target.studiedTimes.length);
      }

      list.focusingLetter = target.focusingLetter;
      list.targetedTime = target.targetedTime;

      return {status: 'Success', message: 'Data fetched successfully', content: list};
    }
  },

  Mutation: {
    // ---------- A D M I N O P S ----------
    addUserPrivacy: async (_, args, { token }) => {
      let userprivacy = await Userprivacy.findOne({identifier: 1});
      if (userprivacy) {
        userprivacy.statement = args.statement;
        let isupdated = await Userprivacy.findOneAndUpdate({identifier: 1}, userprivacy);
        if (isupdated) {
          return {status: 'Success', message: 'Statement is updated', content: isupdated};
        }
        return {status: 'Error', message: 'Statement couldn\'t updated', content: null}
      } else {
        const statement = {
          _id: new mongoose.mongo.ObjectId(), statement: args.statement, identifier: 1
        };
        let isCreated = await Userprivacy.create(statement);
        if (isCreated) {
          return {status: 'Success', message: 'Statement is Created', content: isCreated};
        }
        return {status: 'Error', message: 'Statement couldn\'t Created', content: null};
      }
    },

    updatedUserPrivacy: async(_, args, {token}) => {
      let userPrivacy = await Userprivacy.findOne({_id: args._id});
      userPrivacy.statement = args.statement;
      let isUpdated = await Userprivacy.findOneAndUpdate({_id: args._id}, userPrivacy, { returnOriginal: false });
      if (isUpdated) {
        return {status: 'Success', message: 'Statement is updated', content: isUpdated};
      }
      return {status: 'Error', message: 'Statement couldn\'t updated', content: null};
    },

    deleteUserPrivacy: async(_, args, {token}) => {
      let isDeleted = await Userprivacy.deleteOne({_id: args._id});
      if (isDeleted) {
        return {status: 'Success', message: 'Statement is Deleted', content: {status: 'Deleted'}};
      }
      return {status: 'Error', message: 'Statement couldn\'t Deleted', content: null};
    },

    uploadFile: async (_, { file }, {token}) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const { Location } = await s3.upload({ // (C)
        Body: stream,               
        Key: `${uuid()}${extname(filename)}`,  
        ContentType: mimetype                   
      }).promise(); 
      return {
        filename,
        mimetype,
        encoding,
        url: Location,
      };
    },
    

    // -----   M A N A G E R   -----
    addManager: async (_, args, { token }) => {
      // roleId: String!, districtId: String!, isSystemAdministrator: Boolean, name: String!, surname: String!, dateOfBirth: Date!, password: String!, email: String!,
      // gsm: String, email: String!, facebook: String, twitter: String, instagram: String, image: String
      const duplicated = await Utils.manager.checkDuplicate(args.email);
      if (!!duplicated) {
        return { status: 'Error', message: 'Email alread exists', content: {"message" : "Email Already Exist"} };
      }

      const manager = {
        _id: new mongoose.mongo.ObjectId(), roleId: args.roleId || "", districtId: args.districtId || "", name: args.name, surname: args.surname, dateOfBirth: args.dateOfBirth || "", email: args.email, city: args.city || "", district: args.district || "",
        gsm: args.gsm || "", facebook: args.facebook || "", twitter: args.twitter || "", instagram: args.instagram || "", image: args.image || "", isSystemAdministrator: args.isSystemAdministrator || false,
      };
      manager.registrationDate = new Date().toISOString();
      manager.isConfirmed = false;
      manager.confirmationKey = Math.floor(Math.random() * 900000 + 100000); // 6 digits
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      manager.password = await bcrypt.hash(args.password, salt);
      const created = await Manager.create(manager);
      const verificationEmail = sendVerificationEmail(manager._id, "Manager", args.email);

      if (!!created && verificationEmail) {
        return { status: 'Success', message: 'Data has been added successfully', content: created }; //Utils.manager.factor.unit(created)
      } else {
        return { status: 'Error', message: 'Failed to add data...', content: {"errorStatus" : "Error Occuser"} };
      }
    },
    updateManager: async (_, args, { token }) => {
      const fields = ['roleId', 'districtId', 'isSystemAdministrator', 'name', 'surname', 'dateOfBirth', 'facebook', 'twitter', 'instagram', 'image'];
      let updateData = {};
      for (let fld of fields) {
        updateData[fld] = args[fld];
      }
      const updated = await Manager.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) {
        return { status: 'Success', message: 'Data has been updated successfully', content: updated};
      } else {
        return { status: 'Error', message: 'Failed to update data...', content: null };
      }
    },
    deleteManager: async (_, args, { token }) => {
      const deleted = await Manager.deleteOne({ _id: args._id });
      if (!!deleted) {
        if (deleted.deletedCount > 0) {
          return { status: 'Success', message: 'Data has been deleted successfully', content: { ...deleted, _id: args._id } };
        } else {
          return { status: 'Error', message: 'Not found data to delete', content: {} };
        }
      } else {
        return { status: 'Error', message: 'Failed to delete data...', content: {} };
      }
    },
    confirmManager: async (_, args, { token }) => {
      const manager = await Manager.findOne({ _id: args._id });
      if (!manager) { return { status: 'Error', message: "Manager not found!", content: {} }; }

      if (manager.isConfirmed === true) {
        return { status: 'Success', message: 'Manager already verified', content: manager};
      } else if (manager.confirmationKey != args.confirmationKey) {
        return { status: 'Error', message: 'Confirmation key does not match!', content: {} };
      } else {
        // confirm manager and remove confirmation Key
        const updated = await Manager.findOneAndUpdate({ _id: args._id }, { isConfirmed: true, confirmationKey: 0 }, { returnOriginal: false });
        if (!!updated) {
          return { status: 'Success', message: 'Manager has been confirmed successfully', content: updated };
        } else {
          return { status: 'Error', message: 'Failed to confirm manager', content: {} };
        }
      }
    },

    // -----   A U T H   -----
    getToken: async (_, args, { token }) => {
      let user;
      if (args.clientType == 'Manager') {
        user = await Manager.findOne({ email: args.email });
      } else if (args.clientType == 'Teacher') {
        user = await Teacher.findOne({ email: args.email });
      } else if (args.clientType == 'Student') {
        user = await Student.findOne({email: args.email});
      }
      if (!user) { return { status: 'Error', message: 'Not found user with given email.', content: {} }; }
      const passwordMatch = await bcrypt.compare(args.password, user.password);
      if (passwordMatch === true) {
        const secret = process.env.PORT_USER;
        const expiration = Math.floor(Date.now() / 1000) - 3600 * 24;
        const jwtoken = jwt.sign({
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: expiration,
          data: {
            _id: user._id,
            email: user.email,
            name: user.name
          }
        }, secret);
        //sendVerificationEmail(user._id, "Admin", args.email);
        if (user && user.isConfirmed) {
          return {
            status: 'Success', message: 'Success', content: {
              user: { id: user._id },
              type: args.type,
              token: jwtoken,
              expiration: expiration,
            }
          };
        }
        return { status: 'Error', message: 'User Email not verified!', content: {"Warning" : "User Email not verified"} };
      } else {
        return { status: 'Error', message: 'Password does not match!', content: {} };
      }
    },
    verifyToken: async (_, args, { token }) => {
      const secret = process.env.PORT_USER;
      try {
        let decoded = jwt.verify(args.token, secret);
        return { status: 'Success', message: 'Test', content: decoded };
      } catch (e) {
        console.log(e.name);
        return { status: 'Error', message: 'Token error', content: { type: e.name } };
      }
    },

    sendMobileVerification: async (_, { gsm }, { token }) => {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const verificationMessage = "Your Verification code is " + otp + ". it will expire in next 10 minutes";
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const url = "http://panel.vatansms.com/panel/smsgonder1N.php?kno=" + process.env.SMS_KNO +
        "&kul_ad=" + process.env.SMS_KUL_AD + '&sifre=' + process.env.SMS_SIFRE + "&gonderen=" + process.env.SMS_GONDEREN +
        "&mesaj=" + verificationMessage + "&numaralar=" + gsm + "&tur=Normal";
      return await fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
          let id = new mongoose.mongo.ObjectId();;
          redis_client.setex(id.toString(), 600, otp.toString());
          if (result) {
            return { status: 'Success', message: 'Data has been added successfully', content: { cacheId: id.toString() } }
          } else {
            return { status: 'Error', message: 'Failed to Send Verification Code', content: { error: "error" } };
          }
        })
        .catch(error => {
          return { status: 'Error', message: 'Failed to Send Verification Code', content: { error: "error" } };
        });
    },

    verifiyMobileCode: async (_, { id, secret }, { token }) => {
      let isMatched = false;
      let data = await redis_client.get(id.toString());
      if (data && data.toString().trim() == secret.toString().trim()) {
        isMatched = true;
      }
      if (isMatched) {
        return { status: 'Success', message: 'Data has been added successfully', content: { status: "Otp Matched" } }
      }
      return { status: 'Error', message: 'Otp didn\'t Matched', content: { status: "Otp didn't Matched" } }
    },
    verifyUserEmail: async (_, args, { token }) => {
      let isUserExist;
      let isConfirmed;
      if (args.token) {
        isUserExist = await emailverificationModel.findOne({ token: args.token });
        if (isUserExist && atob(args.type).toString().trim() == "Manager") {
          isConfirmed = Manager.findByIdAndUpdate(isUserExist.userId, { $set: { isConfirmed: true } });
          if (isConfirmed) {
            return { status: 'Success', message: 'Email verified', content: { status: "Email verified" } }
          }
          return { status: 'Error', message: 'Email Couldn\'t be verified', content: { status: "Email Couldn\'t be verified" } }
        } else if (isUserExist && atob(args.type).toString().trim() == "Teacher") {
          isConfirmed = Teacher.findByIdAndUpdate(isUserExist.userId, { $set: { isConfirmed: true } });
          if (isConfirmed) {
            return { status: 'Success', message: 'Email verified', content: { status: "Email verified" } }
          }
          return { status: 'Error', message: 'Email Couldn\'t be verified', content: { status: "Email Couldn\'t be verified" } }
        } else if (isUserExist && atob(args.type).toString().trim() == "Student") {
          isConfirmed = Student.findByIdAndUpdate(isUserExist.userId, { $set: { isConfirmed: true } });
          if (isConfirmed) {
            return { status: 'Success', message: 'Email verified', content: { status: "Email verified" } }
          }
          return { status: 'Error', message: 'Email Couldn\'t be verified', content: { status: "Email Couldn\'t be verified" } }
        }
      } else {
        return { status: 'Error', message: 'Email Couldn\'t be verified', content: { status: "Email Couldn\'t be verified" } };
      }
    },
    sendPasswordResetLink: async (_, args, {token}) => {
      let isUserExist;
      if (args.email && args.type == 'Manager') {
        isUserExist = await Manager.find({email: args.email});
      } else if (args.email && args.type == 'Teacher') {
        isUserExist = await Teacher.find({email: args.email});
      } else if (args.email && args.type == 'Student') {
        isUserExist = await Student.find({email: args.email});
      }
        if (isUserExist) {
          if (sendEmailLink(isUserExist._id, args.email, args.type)) {
            return { status: 'Success', message: 'Email was sent', content: { status: "Email was Sent" } };
          }
        }
          return { status: 'Error', message: 'Email Couldn\'t be Sent', content: { status: "Email Couldn\'t be Sent" } };
    },
    verifyUser: async (_, args, {token}) => {
      let isUserExist;
      if (args.type && args.type == 'Manager') {
        isUserExist = await Manager.findById(args._id);
        isUserExist = JSON.parse(JSON.stringify(isUserExist));
        isUserExist.isConfirmed = true;
        isUserExist = await Manager.findByIdAndUpdate(args._id, {$set : isUserExist}, {returnOriginal : false});
      } else if (args.type && args.type == 'Teacher') {
        isUserExist = await Teacher.findById(args._id);
        isUserExist = JSON.parse(JSON.stringify(isUserExist));
        isUserExist.isConfirmed = true;
        isUserExist = await Teacher.findByIdAndUpdate(args._id, {$set : isUserExist}, {returnOriginal : false});
      } else if (args.type && args.type == 'Student') {
        isUserExist = await Student.findById(args._id);
        isUserExist = JSON.parse(JSON.stringify(isUserExist));
        isUserExist.isConfirmed = true;
        isUserExist = await Student.findByIdAndUpdate(args._id, {$set : isUserExist}, {returnOriginal : false});
      }
      if (isUserExist) {
        return { status: 'Success', message: 'User is confirmed', content: isUserExist };
      }
      return { status: 'Error', message: 'User Cannot be confirmed', content: { status: "Email Couldn\'t be Sent" } };
    },
    resetUserPassword: async (_, args, { token } ) => {
      if (args.userId && args.password && args.type == 'Manager') {
        let User = await Manager.findById(args.userId);
        if (User) {
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          User.password = await bcrypt.hash(args.password, salt);
          User = await Manager.findByIdAndUpdate(args.userId, {$set : User} , { returnOriginal: false });
          if (User) {
            return { status: 'Success', message: 'Password is Updated', content: { status: "Password is Updated" } };
          }
        }
      } else if (args.userId && args.password && args.type == 'Teacher') {
        let User =  await Teacher.findById(args.userId);
        if (User) {
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          User.password = await bcrypt.hash(args.password, salt);
          User = await Teacher.findOneAndUpdate({_id: args.userId}, User, { returnOriginal: false });
          if (User) {
            return { status: 'Success', message: 'Password is Updated', content: { status: "Password is Updated" } };
          }
        }
      }
      return { status: 'Error', message: 'Password couldn\'t be updated', content: { status: "Password couldn\'t be updated. Please check the parameters." } };
    },

    getStudentsInGraduateField: async (_, args, { token }) => {
      let students = await Student.find({graduatefield : args.name});
      students = JSON.parse(JSON.stringify(students));
      if (students.length > 0) {
        const maleCount = students.filter(student => student.gender.trim() == "male").length;
        const femaleCount = students.filter(student => student.gender.trim() == "female").length;
        if (students) {
          return { status: 'Success', message: 'Count is retrived', 
          content: { totalCount: students.length > 0 ? students.length : 0, 
          boysCount : maleCount ? maleCount : 0, girlsCount : femaleCount ? femaleCount : 0 } };
        }
      }
      return { status: 'Success', message: 'No student present', content: 
      { totalCount: 0, boysCount : 0, girlsCount : 0 } };
    },

    // -----   S T U D E N T   -----
    addStudent: async (_, args, { token }) => {
      const emailDup = await Utils.student.checkDuplicate({ email: args.email });
      if (!!emailDup) { return { status: 'Error', message: 'Email already exists!', content: null }; }
      const phoneDup = await Utils.student.checkDuplicate({ gsm: args.gsm });
      if (!!phoneDup) { return { status: 'Error', message: 'Phone number already exists!', content: null }; }
      let student = {
        _id: new mongoose.mongo.ObjectId(),
        email: args.email, 
        gsm: args.gsm, 
        name: args.name, 
        surname: args.surname, 
        dateOfBirth: args.dateOfBirth, 
        registrationDate: new Date().toISOString(), 
        isConfirmed: false,
        school: args.school ? args.school : '', 
        facebook: args.facebook ? args.facebook : "", 
        instagram: args.instagram || "", 
        twitter: args.twitter ? args.twitter : "", 
        image: args.image ? args.image : "", 
        username: args.username ? args.username : "",
        trIdentityno: args.trIdentityno ? args.trIdentityno : "", 
        graduatefield: args.graduatefield ? args.graduatefield : "", 
        exam: args.exam ? args.exam : "", 
        examfield: args.examfield ? args.examfield : "",
        city: args.city ? args.city : "", 
        district: args.district ? args.district : "", 
        secondarySchool: args.secondarySchool ? args.secondarySchool : "", 
        gender : args.gender ? args.gender : ""
      };
      student.confirmationKey = Math.floor(Math.random() * 900000 + 100000); // 6 digits;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      student.password = await bcrypt.hash(args.password, salt);
      const created = await Student.create(student);
      const verificationEmail = sendVerificationEmail(student._id, "Student", args.email);
      if (!!created && verificationEmail) { return { status: 'Success', message: 'Data has been added successfully', content : created }; }
      else { return { status: 'Error', message: 'Failed to add data...', content: null }; }
    },
    updateStudent: async (_, args, { token }) => {
      const fields = ['image', 'username', 'name', 'surname', 'dateOfBirth', 'gender', 'trIdentityno', 'graduatefield', 'exam', 'examfield', 'gsm', 'email', 'city', 'district', 'school', 'secondarySchool', 'twitter', 'instagram' ];
      let updateData = await Student.findOne({ _id: args._id });
      for (let fld of fields) { if (!!args[fld]) updateData[fld] = args[fld]; }
      const updated = await Student.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data has been updated successfully', content: updated }; }
      else { return { status: 'Error', message: 'Failed to update data...', content: null }; }
    },
    deleteStudent: async (_, args, { token }) => {
      try {
        const deleted = await Student.deleteOne({ _id: args._id });
        return { status: 'Success', message: 'Data has been deleted successfully', content: { ...deleted, _id: args._id } };
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: {} };
      }
    },
    confirmStudent: async (_, args, { token }) => {
      let student = await Student.findOne({ _id: args._id });
      if (!student) { return { status: 'Error', message: 'Data not found', content: {} }; }
      // check if already confirmed
      if (student.isConfirmed === 1) { return { status: 'Success', message: 'User is already verified', content: student} }

      if (student.confirmationKey === args.confirmationKey) {
        //const updateData = {studentisConfirmed: true, confirmationKey: 0};
        student.isConfirmed = true;
        student.confirmationKey = 0;
        const updated = await Student.findOneAndUpdate({ _id: args._id }, student, { returnOriginal: false });
        return { status: 'Success', message: 'User had been verified successfully', content: updated };
      } else { return { status: 'Error', message: 'Cofirmationkey does not match!', content: {} }; }
    },
    addUniversitytoPreferenceList: async (_, args, { token }) => {
      let student = await Student.findById(args.studentId);
      if (student) {
        student = JSON.parse(JSON.stringify(student));
        if (student.universityPreferenceList && student.universityPreferenceList.length > 0) {
          args.universityId.map(uni => {
            student.universityPreferenceList.push(uni);
          });
        } else {
          student.universityPreferenceList = [];
          args.universityId.map(uni => {
            student.universityPreferenceList.push(uni);
          });
        }
        const isUpdated = await Student.findByIdAndUpdate(args.studentId, {$set : student}, {returnOriginal : false});
        if (isUpdated) {
          return { status: 'Success', message: 'Data has been added', content: isUpdated};
        }
      }
      return { status: 'Error', message: 'Something Went Wrong', content: {} };
    },

    deleteUniversityFromPreferenceList: async (_, args, { token }) => {
      let student = await Student.findById(args.studentId);
      if (student) {
        student = JSON.parse(JSON.stringify(student));
        if (student.universityPreferenceList && student.universityPreferenceList.length > 0) {
          student.universityPreferenceList = student.universityPreferenceList.filter(uni => uni.UniversityId != args.universityId.UniversityId);
        } else {
          return { status: 'Error', message: 'No universities Exist', content: {} };
        }
        const isUpdated = await Student.findByIdAndUpdate(args.studentId, {$set : student}, {returnOriginal : false});
        if (isUpdated) {
          return { status: 'Success', message: 'Item has been removed from the list', content: isUpdated};
        }
      }
      return { status: 'Error', message: 'Something Went Wrong', content: {} };
    },

    // -----   T E A C H E R   -----
    addTeacher: async (_, args, { token }) => {
      const emailDup = await Utils.teacher.checkDuplicate({ email: args.email });
      if (!!emailDup) { return { status: 'Error', message: 'Email already exists!', content: null }; }
      const phoneDup = await Utils.teacher.checkDuplicate({ gsm: args.gsm });
      if (!!phoneDup) { return { status: 'Error', message: 'Phone number already exists!', content: null }; }
      let teacher = {
        _id: new mongoose.mongo.ObjectId(), email: args.email, gsm: args.gsm, name: args.name, surname: args.surname, registrationDate: new Date().toISOString(), isConfirmed: false,
        city: args.city || "", district: args.district || "", school: args.school, schoolBranch: args.schoolBranch, schoolId: args.schoolId || '',
        roleId: args.roleId || "", facebook: args.facebook || "", instagram: args.instagram || "", twitter: args.twitter || "", image: args.image || "", youtube : args.youtube || ""
      };
      teacher.confirmationKey = Math.floor(Math.random() * 900000 + 100000); // 6 digits;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      teacher.password = await bcrypt.hash(args.password, salt);
      const created = await Teacher.create(teacher);
      const verificationEmail = sendVerificationEmail(teacher._id, "Teacher", args.email);
      if (!!created && verificationEmail) { return { status: 'Success', message: 'Data has been added successfully', content: created}; }
      else { return { status: 'Error', message: 'Failed to add data...', content: null }; }
    },
    updateTeacher: async (_, args, { token }) => {
      const fields = ['_id', 'school', 'name' ,'roleId', 'gsm' ,'schoolBranch', 'name', 'district', 'city' ,'surname', 'dateOfBirth', 'facebook', 'instagram', 'twitter', 'image', 'youtube'];
      let updateData = await Teacher.findById( args._id);
      for (let fld of fields) { if (!!args[fld]) updateData[fld] = args[fld]; }
      const updated = await Teacher.findByIdAndUpdate(args._id, {$set : updateData} , { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data has been updated successfully', content: updated}; }
      else { return { status: 'Error', message: 'Failed to update data...', content: null }; }
    },
    deleteTeacher: async (_, args, { token }) => {
      try {
        const deleted = await Teacher.deleteOne({ _id: args._id });
        return { status: 'Success', message: 'Data has been deleted successfully', content: { ...deleted, _id: args._id } };
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: {} };
      }
    },
    getTeacherStudent: async (_, args, { token }) => {
      const teacher = await Teacher.findOne({ _id: args._id });
      if (teacher) {
        return { status: 'Success', message: 'Data has been successfully retrived', content: teacher };
      } else {
        return { status: 'Error', message: 'Data couldn\'t be retrived', content: null };
      }
    },
    confirmTeacher: async (_, args, { token }) => {
      let teacher = await Teacher.findOne({ _id: args._id });
      if (!teacher) { return { status: 'Error', message: 'Data not found', content: {} }; }
      // check if already confirmed
      if (teacher.isConfirmed === 1) { return { status: 'Success', message: 'User is already verified', content: teacher} }

      if (teacher.confirmationKey === args.confirmationKey) {
        //const updateData = {studentisConfirmed: true, confirmationKey: 0};
        teacher.isConfirmed = true;
        teacher.confirmationKey = 0;
        const updated = await Teacher.findOneAndUpdate({ _id: args._id }, teacher, { returnOriginal: false });
        return { status: 'Success', message: 'User had been verified successfully', content: updated };
      } else { return { status: 'Error', message: 'Cofirmationkey does not match!', content: {} }; }
    },

    sendFriendRequest: async(_, args, {token}) => {
      const teacher = await Teacher.findOne({_id: args.teacherId});
      if (teacher) {
        if (teacher.friendRequests.length) {
          teacher.friendRequests.push(args.studentId);
        } else {
          teacher.friendRequests = [args.studentId];
        }
        const isUpdated = await Teacher.findOneAndUpdate({_id: args.teacherId}, teacher, { returnOriginal: false });
        if (isUpdated) {
          return { status: 'Success', message: 'Friend Request is sent', content: isUpdated};
        }
      }
      return { status: 'Error', message: 'Friend Request could not be sent', content: {'errorDetails': 'Error Sending request'}};
    },

    acceptFriendRequest: async (_ , args, {token}) => {
      let teacher = await Teacher.findOne({_id: args.teacherId});
      let student = await Student.findOne({_id: args.studentId});
      teacher = JSON.parse(JSON.stringify(teacher));
      student = JSON.parse(JSON.stringify(student));
      if (teacher) {
        if (teacher.friends) {
            teacher.friends.push(args.studentId);
            teacher.friendRequests.splice(teacher.friendRequests.indexOf(args.studentId), 1);
        } else {
          teacher.friends = [args.studentId];
        }
        if (student && student.guideTeacher && student.guideTeacher.length > 0) {
          student.guideTeacher.push(teacherId);
        } else if (student) {
          let guideTeacher = [teacherId];
          student.guideTeacher = guideTeacher;
        }
        const isUpdated = Teacher.findByIdAndUpdate(args.teacherId,{$set : teacher}, {returnOriginal: false});
        const isUpdatedStudent = Student.findByIdAndUpdate(args.teacherId,{$set : student}, {returnOriginal: false});
        if (isUpdated && isUpdatedStudent) {
          return { status: 'Success', message: 'Friend Request is Accepted', content: isUpdated};
        }
      }
      return { status: 'Error', message: 'Friend Request could not be Accepted', content: {'errorDetails': 'Error Accepting request'}};
    },

    // -----   P U B L I S H E R   -----
    addPublisher: async (_, args, { token }) => {
      const pubDuplicated = await Utils.publisher.checkDuplicate({ email: args.email });
      if (!!pubDuplicated) { return { status: 'Error', message: 'Email already exists', content: {} }; }

      let publisher = { _id: new mongoose.mongo.ObjectId(), email: args.email, name: args.name, phone: args.phone, address: args.address, logo: args.logo};
      const created = await Publisher.create(publisher);
      if (!!created) { return { status: 'Success', message: 'Data has been added successfully', content: created }; }
      else { return { status: 'Error', message: 'Failed to add data...', content: {} }; }
    },
    updatePublisher: async (_, args, { token }) => {
      const fields = ['name', 'email', 'phone', 'address', 'logo'];
      let updateData = await Publisher.findOne({ _id: args._id });

      for (let fld of fields) { if (!!args[fld]) updateData[fld] = args[fld]; }
      const updated = await Publisher.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data has been updated successfully', content: updated }; }
      else { return { status: 'Error', message: 'Failed to update data...', content: {} }; }
    },
    deletePublisher: async (_, args, { token }) => {
      try {
        const deleted = await Publisher.deleteOne({ _id: args._id });
        return { status: 'Success', message: 'Data has been deleted successfully', content: deleted };
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: {} };
      }
    },

    // -----   F R I E N D   -----
    addFriend: async (_, args, { token }) => {
      // todo - check student and teacher exists?

      // check duplicated
      const duplicated = await Utils.friend.checkDuplicate({ studentId: args.studentId, teacherId: args.teacherId });
      if (!!duplicated) { return { status: 'Scucess', message: 'Dupliated data', content: {} }; }

      const friend = { _id: new mongoose.mongo.ObjectId(), studentId: args.studentId, teacherId: args.teacherId, isAccepted: false, isSenderAsStudent: args.isSenderAsStudent || true };
      const created = await Friend.create(friend);
      if (!!created) { return { status: 'Success', message: 'Data has been added successfully', content: created }; }
      else { return { status: 'Error', message: 'Failed to add data...', content: {} }; }
    },
    updateFriend: async (_, args, { token }) => {
      let updateData = await Friend.findOne({ _id: args._id });

      if (args.isAccepted !== undefined) { updateData.isAccepted = args.isAccepted; }
      if (args.isSenderAsStudent !== undefined) { updateData.isSenderAsStudent = args.isSenderAsStudent; }
      const updated = await Friend.findOneAndUpdate({ _id: args._id }, updateData, { returnOriginal: false });
      if (!!updated) { return { status: 'Success', message: 'Data has been updated successfully', content: updated }; }
      else { return { status: 'Error', message: 'Failed to update data...', content: {} }; }
    },
    deleteFriend: async (_, args, { token }) => {
      try {
        const deleted = await Friend.deleteOne({ _id: args._id });
        return { status: 'Success', message: 'Data has been deleted successfully', content: deleted };
      } catch (e) {
        return { status: 'Error', message: 'Failed to delete data...', content: {} };
      }
    },

    // ---------------- MEMBERSHIP ------------------
    addMembership: async (_, args, {token}) => {
      const membership = {
        _id : new mongoose.mongo.ObjectId(),
        title: args.title,
        description: args.description,
        price: args.price,
        date: args.date,
        paymenttitle: args.paymenttitle,
        productLink: args.productLink,
        availableModule: args.availableModule || []
      };
      console.log(membership);
      const isCreated = await MemberShip.create(membership);
      console.log(isCreated);
      if (isCreated) {
        return {status: 'Success', message: 'Membership has been added in the database', content: isCreated};
      }
      return {status: 'Error', message: 'Membership could not be added', content: {}};
    },

    updateMembership: async (_, args, {token}) => {
      const membership = await MemberShip.findById(args._id);
      if (membership) {
        membership.title = args.title ? args.title : membership.title;
        membership.description= args.description ? args.description : membership.description;
        membership.price= args.price ? args.price : membership.price;
        membership.date= args.date ? args.date : membership.date;
        membership.paymenttitle= args.paymenttitle ? args.paymenttitle : membership.paymenttitle;
        membership.productLink= args.productLink ? args.productLink : membership.productLink;
        membership.availableModule= args.availableModule ? args.availableModule : membership.availableModule;

        const isUpdated = await MemberShip.findByIdAndUpdate(args._id, {$set : membership}, {returnOriginal : false});
        if (isUpdated) {
          return {status: 'Success', message: 'Membership has been Updated', content: isUpdated};
        }
        return {status: 'Error', message: 'Membership could not be updated', content: {}};
      }
    },
    deleteMembership: async (_, args, {token}) => {
      if (args._id) {
        const isDeleted = await MemberShip.findByIdAndDelete(args._id);
        return {status: 'Success', message: 'Membership has been Deleted', content: isDeleted};
      }
    },

    // ---------------- SOCIAL MEDIA -----------------
    addSocialMedia: async(_, args, {token}) => {
      let socialMedia = {
        title : args.title,
        link: args.link
      };
      const isDuplicate = await SocialMedia.findOne(socialMedia);
      if (isDuplicate) {
        return {status: 'Error', message: 'The media Url already Exist. Please edit the entry', content: {}};
      } else {
        socialMedia._id = new mongoose.mongo.ObjectId();
        const isCreated = await SocialMedia.create(socialMedia);
        if (isCreated) {
          return {status: 'Success', message: 'The media Url has been added Successfully', content: isCreated};
        }
        return {status: 'Error', message: 'Unable to add the social media', content: null};
      }
    },

    updateSocialMedia: async(_, args, {token}) => {
      const media = await SocialMedia.findById(args._id);
      if (media) {
        media.title = args.title ? args.title : media.title;
        media.link = args.link ? args.link : media.link;
        const isUpdated = await SocialMedia.findByIdAndUpdate(args._id, {$set : media}, {returnOriginal : false});
        if (isUpdated) {
          return {status: 'Success', message: 'The data is updated Successfully', content: isUpdated};
        }
      }
      return {status: 'Error', message: 'Data Could not be updated', content: null};
    },
    deleteSocialMedia: async(_, args, {token}) => {
      const isDeleted = await SocialMedia.findOneAndRemove(args._id);
      if (isDeleted) {
        return {status: 'Success', message: 'The data is deleted Successfully', content: isUpdated};
      }
      return {status: 'Error', message: 'Data Could not be deleted', content: null};
    },

    //-------------- USER MANAGEMENT --------------
    //Adding admin to the System
    addAdmin: async (_, args, {token}) => {
      let admin = {
        _id: new mongoose.mongo.ObjectId(),
        name: args.name,
        surname: args.surname,
        email: args.email,
        city: args.city,
        district: args.district,
        phone: args.phone,
        role: args.role
      };
      const isDuplicate = await Admin.findOne({email: args.email});
      if (isDuplicate) {
        return {status: 'Error', message: 'Duplicate entry', content: null};
      } else {
        const created = await Admin.create(admin);
        if (created) { return {status: 'Success', message: 'Admin has been added', content: created}; }
        return {status: 'Error', message: 'Admin could not be added', content: {}};
      }
    },
    //Updating any existing admin from the system
    updateAdmin: async (_, args, {token}) => {
      const admin = await Admin.findById(args._id);
      if (admin) {
        admin.name = args.name ? args.name : admin.name;
        admin.surname= args.surname ? args.surname : admin.surname;
        admin.email= args.email ? args.email : admin.email;
        admin.city= args.city ? args.city : admin.city;
        admin.district= args.district ? args.district : admin.district;
        admin.phone= args.phone ? args.phone : admin.phone;
        admin.role= args.role ? args.role : admin.role;
        const isUpdated = await Admin.findByIdAndUpdate(args._id, {$set : admin}, {returnOriginal : false});
        if (isUpdated) {
          return {status: 'Success', message: 'Data has been Updated', content: isUpdated};
        }
        return {status: 'Error', message: 'Admin could not be Updated', content: {}};
      }
    },
    //Deleting any existing Admin
    deleteAdmin: async (_, args, {token}) => {
      if (args._id) {
        const isDeleted = await Admin.findByIdAndDelete(args._id);
        return {status: 'Success', message: 'Deleted Successfully', content: isDeleted};
      }
      return {status: 'Error', message: 'Admin could not be Deleted', content: {}};
    },
    //-------- PAGE MANAGEMENT -----------
    //Updating Page Status
    updatePageStatus: async(_, args, {token}) => {
      const page = await PageStatus.findOne({title: args.title == "default" ? args.title : "default"});
      if (page) {
        page.isDown = args.isDown;
        const isUpdated = await PageStatus.findOneAndUpdate({title: 'default'}, page, {returnOriginal: false});
        if (isUpdated) {
          return {status: 'Success', message: 'The Status has been updated', content: isUpdated};
        }
      } else {
        let pageStatus = {
          _id: new mongoose.mongo.ObjectId(),
          title: 'default',
          isDown: args.isDown || false
        };
        const isCreated = await PageStatus.create(pageStatus);
        if (isCreated) {
          return {status: 'Success', message: 'The Status has been updated', content: isCreated};
        }
      }
      return {status: 'Error', message: 'The Status not updated', content: null};
    },
    //----------- NOTIFICATION ----------
    //Adding a notification
    addNotification: async(_, args, {token}) => {
      const notification = {
        _id: new mongoose.mongo.ObjectId(),
        title: args.title,
        content: args.content
      };
      const isCreated = await Notification.create(notification);
      if (isCreated) {
        return {status: 'Success', message: 'Notification Created', content: isCreated};
      }
      return {status: 'Error', message: 'Notification could not be created', content: {'errorDetails': 'Couldn\t create the notification'}};
    },
    //Updating an existing notification
    updateNotification: async(_, args, {token}) => {
      const notifi = await Notification.findById(args._id);
      if (notifi) {
        notifi.title = args.title ? args.title : notifi.title;
        notifi.content = args.content ? args.content : notifi.content;
      }
      const isUpdated = await Notification.findByIdAndUpdate(args._id, {$set : notifi}, {returnOriginal : false});
      if (isUpdated) {
        return {status: 'Success', message: 'Data has been updated', content: isUpdated};
      }
      return {status: 'Error', message: 'Data could not be updated', content: {}};
    },
    //Deleting an existing notification
    deleteNotification: async(_, args, {token}) => {
      if (args._id) {
        const isDeleted = Notification.findOneAndRemove(args._id);
        return {status: 'Success', message: 'Data has been Deleted', content: isDeleted};
      }
    },
    //To be removed after development is done. Just a test api to remove existing Teachers and managers
    clearUserBase: async(_, args, {token}) => {
      const isTeacherCleared = await Teacher.deleteMany({});
      const isManagerCleared = await Manager.deleteMany({});

      if (isTeacherCleared && isManagerCleared) {
        return {status: 'Success', message: 'Database cleared', content: {status: 'All Teachers and Managers have been removed'}};
      }
      return {status: 'Error', message: 'Couldn\'t clear database', content: {'errorDetails': 'something Went wrong'}};
    },
    //Adding a new discount Code
    addDiscountCode: async(_, args, {token}) => {
      const doesExist = await DiscountCode.findOne({code : args.code});
      if (doesExist) {
        return {status: 'Error', message: 'Code Already Exist', content: {'errorDetails': 'Duplicate Code'}};
      } else {
        const discountCode = {
          _id : new mongoose.mongo.ObjectId(),
          code : args.code,
          value : args.value
        };
        const created = await DiscountCode.create(discountCode);
        if (created) {
          return {status: 'Success', message: 'Discount code has been added', content: created};
        }
      }
      return {status: 'Error', message: 'something went wrong', content: {'errorDetails': 'something Went wrong'}};
    },
    //Deleting a existing discount Code
    updateDiscountCode: async(_, args, {token}) => {
      let code = await DiscountCode.findById(args._id);
      if (code) {
        code.code = args.code ? args.code : code.code;
        code.value = args.value ?  args.value : code.value;
        const updatedValue = await DiscountCode.findByIdAndUpdate(args._id, {$set : code}, {returnOriginal : false});
        if (updatedValue) {
          return {status: 'Success', message: 'Discount code has been added', content: updatedValue};
        }
      }
      return {status: 'Error', message: 'something went wrong', content: {'errorDetails': 'something Went wrong'}};
    },
    //Deleting a discount Code
    deleteDiscountCode : async(_, args, {token}) => {
      const isdeleted = await DiscountCode.findByIdAndDelete(args._id);
      if (isdeleted) {
        return {status: 'Success', message: 'Discount code has been added', content: isdeleted};
      }
      return {status: 'Error', message: 'something went wrong', content: {'errorDetails': 'something Went wrong'}};
    },
    //Getting number of students enrolled in a membership.
    getNumberOfStudentInAMembership : async(_, args, {token}) => {
      let students = await Student.find({studentMemberTypeId : args._id});
      students = JSON.parse(JSON.stringify(students));
      if (students && students.length) {
        return {status: 'Success', message: 'Number of Students enrolled in project is fetch Successfully', content: {number : students.length}};
      }
      else {
        return {status: 'Success', message: 'Number of Students enrolled in project is fetch Successfully', content: 0};
      }
    },
    //Getting number of students enrolled in a membership from a start date to end Date.
    getNumberOfStudentInAMembershipInAPeriod : async(_, args, {token}) => {
      let where = { $gte: args.startDate, $lte: args.endDate };
      let students = await Student.find({studentMemberTypeId : args._id, membershipStartDate : where});
      students = JSON.parse(JSON.stringify(students));
      if (students && students.length) {
        return {status: 'Success', message: 'Number of Students enrolled in project is fetch Successfully', content: {number : students.length}};
      }
      else {
        return {status: 'Success', message: 'Number of Students enrolled in project is fetch Successfully', content: {number : 0}};
      }
    },

    // BACKEND FOR CHAPTER 7
    // ADD TARGET FOR STUDENT
    addTarget: async(_, args, {token}) => {
      const doesExist  = await Target.findOne({name: args.name});
      if (doesExist) {
        return {status: 'Error', message: 'Target Already Exist', content: {'errorDetails': 'Duplicate Code'}};
      } else {
        const target = {
          _id : new mongoose.mongo.ObjectId(),
          studentId: args.studentId,
          name: args.name,  
          targetedTime: args.targetedTime,
          startTime: args.startTime,
          reachedTime: args.reachedTime,
          reachedStartTime: args.reachedStartTime,
          reachedEndTime: args.reachedEndTime,
          studyDay: args.studyDay,
          color: args.color,
          ranking: 0,
          created_at: new Date(),
          studiedHours: 0,
          percentageOfCompletion: 0,
          breakCount: 0,
          score: 0,
          emegencyBreakCount: 0
        }        
        const created = await Target.create(target);
        if (created) {
          return {status: 'Success', message: 'Target code has been added', content: created};
        }
      }
      return {status: 'Error', message: 'something went wrong', content: {'errorDetails': 'something Went wrong'}};
    }
  },
};
