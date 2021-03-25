const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const Exam = require("./models/exam.model");
const ExamAnswer = require('./models/examAnswer.model');
const ExamSet = require('./models/examSet.model');
const ExamSetBookie = require('./models/examSetBookie.model');
const ExamTest = require('./models/examTest.model');
const Lesson = require('./models/lesson.model');
const Subtopic = require('./models/subtopic.model');
const Topic = require('./models/topic.model');
const PracticeExam = require('./models/practiceexam.model');
const PracticeExamBooklet = require ('./models/practiceExamBooklet.model');
const BookletTest = require('./models/bookletTest.model');
const BookletTestAnswer = require('./models/bookletTestAnswer.model');
const HomeWork = require('./models/homeWork.model');
const StudentExamSet = require('./models/studentExamSet.model');
const StudentExamSetBookie = require('./models/studentExamSetBookie.model');
const StudentExamTest = require('./models/studentExamTest.model');
const StudentExamAnswer = require('./models/studentExamAnswer.model');
const BookCategory = require('./models/bookCategory.model');
const Publisher = require('./models/publisher.model');
const Utils = require("./utils");
const { examSet } = require('./utils');

module.exports = {
  Query: {
    // -----   E X A M   -----
    exams: async (_, args, { token }) => {
      // Utils.checkToken(token); //console.log(decoded);
      const offset = args.offset !== undefined ? args.offset : 0;
      const limit = args.limit !== undefined ? args.limit : 0;

      let where = {};
      if (!!args.title) { where.title = new RegExp(args.title, 'i'); }
      
      const exams = await Exam.find(where).skip(offset).limit(limit);
      if (exams) {return { status: 'Success', message: 'Data fetched successfully', content: exams};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    exam: async (_, args, { token }) => {
      const exam = await Exam.findOne({ _id: args._id });
      if (exam) {return { status: 'Success', message: 'Data fetched successfully', content: exam};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    
    // -----   E X A M    A N S W E R   -----
    examAnswer: async (_, args, { token }) => {
      const ea = await ExamAnswer.findOne({_id: args._id});
      if (ea) {return { status: 'Success', message: 'Data fetched successfully', content: ea};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    examAnswers: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.examSetTestId) {where.examSetTestId = args.examSetTestId;}
      if (!!args.subTopicId) {where.subTopicId = args.subTopicId;}
      if (!!args.questionNumber) {where.questionNumber = args.questionNumber;}
      if (!!args.correctAnswer) {where.correctAnswer = args.correctAnswer;}

      const eas = await ExamAnswer.find(where).skip(offset).limit(limit);
      if (eas) {return { status: 'Success', message: 'Data fetched successfully', content: eas};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },

    // -----   E X A M    S E T   -----
    examSet: async (_, args, { token }) => {
      const es = await ExamSet.findOne({_id: args._id});
      if (es) {return { status: 'Success', message: 'Data fetched successfully', content: es};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    examSets: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.examId) { where.examId = args.examId; }
      if (!!args.categoryId) { where.categoryId = args.categoryId; }
      if (!!args.publisherId) { where.publisherId = args.publisherId; }
      if (!!args.publishYear) { where.publishYear = args.publishYear; }
      //if (!!args.isbn) { where.isbn = args.isbn; }
      if (args.showToUsers !== undefined) { where.showToUsers = args.showToUsers; }
      if (!!args.level) { where.level = args.level; }
      let ess = await ExamSet.find(where).skip(offset).limit(limit);
      if (ess) {return { status: 'Success', message: 'Data fetched successfully', content: ess};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },

    // -----   EXAM SET BOOKIE   -----
    examSetBookie: async (_, args, { token }) => {
      const esb = await ExamSetBookie.findOne({_id: args._id});
      if (esb) {return { status: 'Success', message: 'Data fetched successfully', content: esb};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    examSetBookies: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.examSetId) {where.examSetId = args.examSetId;}
      if (!!args.bookieTitle) {where.bookieTitle = args.bookieTitle;}
      const esbs = await ExamSetBookie.find(where).skip(offset).limit(limit);
      if (esbs) {return { status: 'Success', message: 'Data fetched successfully', content: esbs};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },

    // -----   EXAM TEST   -----
    examTest: async (_, args, { token }) => {
      const et = await ExamTest.findOne({_id: args._id});
      if (et) {return { status: 'Success', message: 'Data fetched successfully', content: et};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    examTests: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.examSetBookieId) {where.examSetBookieId = args.examSetBookieId;}
      if (!!args.title) {where.title = new RegExp(args.title, 'i');}
      if (!!args.sequence) {where.sequence = args.sequence;}
      if (!!args.questionCount) {where.questionCount = args.questionCount; }

      let ets = await ExamTest.find(where).skip(offset).limit(limit);
      if (ets) {return { status: 'Success', message: 'Data fetched successfully', content: ets};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },

    // -----   L E S S O N   -----
    lesson: async (_, args, { token }) => {
      const lesson = await Lesson.findOne({_id: args._id});
      if (lesson) {
        return { status: 'Success', message: 'Data has been added successfully', content: lesson};
      }
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    lessons: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.title) { where.title = new RegExp(args.title, 'i'); }
      let lessons = await Lesson.find(where).skip(offset).limit(limit);
      if (lessons) {
        console.log(lessons);
        return { status: 'Success', message: 'Data has been added successfully', content: lessons};
      }
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },

    // -----   S U B T O P I C   -----
    subtopic: async (_, args, { token }) => {
      const subtopic = await Subtopic.findOne({_id: args._id});
      if (subtopic) {return { status: 'Success', message: 'Data fetched successfully', content: subtopic};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    subtopics: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.topicId) { where.topicId = args.topicId; }
      if (!!args.title) { where.title = new RegExp(args.title, 'i'); }
      let subtopics = await Subtopic.find(where).skip(offset).limit(limit);
      if (subtopics) {return { status: 'Success', message: 'Data fetched successfully', content: subtopics};}
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },

    // -----   T O P I C   -----
    topic: async (_, args, { token }) => {
      const topic = await Topic.findOne({_id: args._id});
      if (topic) {
        return { status: 'Success', message: 'Data has been added successfully', content: topic};
      }
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },
    topics: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.lessonId) { where.lessonId = args.lessonId; }
      if (!!args.title) { where.title = new RegExp(args.title, 'i'); }

      let topics = await Topic.find(where).skip(offset).limit(limit);
      if (topics) {
        return { status: 'Success', message: 'Data has been added successfully', content: topics};
      }
      return { status: 'Error', message: 'No Data Available', content: {"errorDetails": "No Data Available"}};
    },

    PraticeExam : async (_, args, { token }) => {
      const exam = await PracticeExam.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    PraticeExams : async (_, args, { token }) => {
      const exam = await PracticeExam.find();
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    PracticeExamBooklet : async (_, args, { token }) => {
      const exam = await PracticeExamBooklet.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    PracticeExamBooklets: async (_, args, { token }) => {
      const exam = await PracticeExamBooklet.find();
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    BookletTest: async (_, args, { token }) => {
      const exam = await BookletTest.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    BookletTests: async (_, args, { token }) => {
      const exam = await BookletTest.find();
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    BookletTestAnswer: async (_, args, { token }) => {
      const exam = await BookletTestAnswer.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    BookletTestAnswers: async (_, args, { token }) => {
      const exam = await BookletTestAnswer.find();
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    GetHomeWorkfromQuestionBank: async (_, args, { token }) => {
      const exam = await HomeWork.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    GetHomeWorksfromQuestionBanks: async (_, args, { token }) => {
      const exam = await HomeWork.find();
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    GetHomeWorkfromPraticeExam: async (_, args, { token }) => {
      const exam = await HomeWork.findById(args._id);
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },

    GetHomeWorksfromPraticeExam: async (_, args, { token }) => {
      const exam = await HomeWork.find();
      return {status: 'Success', message: 'Data fetched successfully', content: exam ? exam : {}}
    },


    //------------------------------------- BACKEND --------------------------------------
    studentExamSets: async (_, args, { token }) => {
      let studentExamSets = [];
      let examSetIds = await StudentExamSet.find({studentId: args.studentId});
      
      for(let i in examSetIds) {
        let studentExamSet = {};
        let examSet = await ExamSet.findOne({_id: examSetIds[i].examSetId, categoryId: args.categoryId});
        if (!!examSet) {
          studentExamSet.studentId = args.studentId;
          let category = await BookCategory.findById(args.categoryId);
          studentExamSet.categoryId = category.category;
          studentExamSet.examSetId = examSet._id;
          studentExamSet.title = examSet.title;
          studentExamSet.image = examSet.image;

          let numberOfStudent = 0;
          let examSetsTemp1 = await StudentExamSet.find({examSetId: examSet._id});
          numberOfStudent = examSetsTemp1.length;
          studentExamSet.numberOfStudents = numberOfStudent;
          
          let testCount = 0;
          let tests = await ExamTest.find({examSetId: examSet._id});  
          testCount = tests.length ? tests.length : 0;
          studentExamSet.testCount = testCount;

          let questionCount = 0;
          for(let j in tests){
            questionCount = questionCount + tests[j].questionCount;
          }
          studentExamSet.questionCount = questionCount;
          
          let studentSolvedQuestionCount = 0;
          let studentCorrectAnswerCount = 0;
          let studentIncorrectAnswerCount = 0;
          let studentSolvedTests = await StudentExamTest.find({studentId: args.studentId, examSetId: examSet._id});
          let solvedTestCount = 0;
          solvedTestCount =  studentSolvedTests.length;

          if (testCount == 0) {
            studentExamSet.completionPercentage = 0;
          } else {
            studentExamSet.completionPercentage = Math.floor(solvedTestCount/testCount * 100);
          }
          for (let i in studentSolvedTests){
            let studentSolvedTest = studentSolvedTests[i];
            let studentSolvedQuestions = await StudentExamAnswer.find({studentId: args.studentId, studentExamTestId: studentSolvedTest._id});
            for(let j  in studentSolvedQuestions){
              let studentSolvedQuestion = studentSolvedQuestions[j];
              studentSolvedQuestionCount = studentSolvedQuestionCount + 1;
              if (studentSolvedQuestion.isCorrect == true) {studentCorrectAnswerCount = studentCorrectAnswerCount + 1;}
            }
          }
          //console.log(studentSolvedQuestionCount);
          studentIncorrectAnswerCount = studentSolvedQuestionCount - studentCorrectAnswerCount;

          studentExamSet.solvedQuestionCount = studentSolvedQuestionCount;
          studentExamSet.correctAnswerCount = studentCorrectAnswerCount;
          studentExamSet.incorrectAnswerCount = studentIncorrectAnswerCount;
      
          studentExamSets.push(studentExamSet);
        }
        
      }
      return {status: 'Success', message: 'Data has been fetched', content: studentExamSets};
      
    },

    // --------------- STUDENT EXAMSET SEARCH ----------------
    examSetSearch: async (_, args, { token }) => {
      let list = [];
      let examSets = await ExamSet.find({title: new RegExp(args.title, 'i')});
      if (examSets.length > 0) {
        for (let i in examSets) {
          let examSet = {};
          examSet.examSetId = examSets[i]._id;
          examSet.title = examSets[i].title;
          examSet.image = examSets[i].image;

          let tests = await ExamTest.find({examSetId: examSets[i]._id});
          book.testCount = tests.length; 

          let count = 0;
          for(let j in tests){
              count = count + tests[j].questionCount;
          }
          examSet.questionCount = count;

          list.push(examSet);
        }
          return {status: 'Success', message: 'Data has been fetched', content: list};
      } else {
          return {status: 'Success', message: 'No Data has been matched', content: list};
      }  
    },

     // --------------- EXAMSET PUBLISHERS ----------------
     examSetPublishers: async (_, args, {token}) => {
      let examSetPublishers = [];
      let publishers = await Publisher.find();
      for (let i in publishers){
        let publisher = publishers[i];
        let examSetPublishers = {
          publisherId: publisher._id,
          publisherName: publisher.name,
          publisherLogo: publisher.logo
        };

        examSetPublishers.push(examSetPublishers);
      }

      return {status: 'Success', message: 'Data has been fetched', content: examSetPublishers};
    },

    // --------------- EXAMSET PUBLISHER SEARCH ----------------
    examSetPublisherSearch: async (_, args, {token}) => {
      let examSetPublishers = [];
      let publishers = await Publisher.find({name: new RegExp(args.publisherSearchWord, 'i')});
      for (let i in publishers){
        let publisher = publishers[i];
        let examSetPublisher = {
          publisherId: publisher._id,
          publisherName: publisher.name,
          publisherLogo: publisher.logo
        };

        examSetPublishers.push(examSetPublisher);
      }

      return {status: 'Success', message: 'Data has been fetched', content: examSetPublishers};
    },

    // ---------------- EXAMSETS SELECCTED BY STUDENT & PUBLISHER
    studentPublisherExamSets: async (_, args, {token}) => {
      let studentPublisherExamSets = [];
      let examSets = await ExamSet.find({publisherId: args.publisherId, categoryId: args.categoryId});
      for(let i in examSets){
        let examSet = examSets[i];
        studentExamSet = {};
        studentExamSet._id = book._id;
        studentExamSet.title = book.title;
        studentExamSet.image = book.image;
        studentExamSet.isSelectedByStudent = false;
        let studentSelectBook = await StudentExamSet.findOne({bookId: book._id});
        if (!!studentSelectBook) {studentExamSet.isSelectedByStudent = true;}

        studentExamSet.testCount = 0;
        studentExamSet.questionCount = 0;
        let testCount = 0;
        let questionCount = 0;
        let tests = await BookTest.find({bookId: book._id});
        for (let j in tests){
          let test = tests[j];
          testCount = testCount + 1;
          questionCount = questionCount + test.questionCount;
        }
        studentExamSet.testCount = testCount;
        studentExamSet.questionCount = questionCount;
        studentPublisherExamSets.push(studentExamSet);
      }
      return {status: 'Success', message: 'Data has been fetched', content: studentPublisherExamSets};
    },

    // --------------- STUDENT EXAMSET BOOKIES ----------------
    studentExamSetBookies: async (_, args, {token}) => {
      let studentExamSetBookies = [];
      let studentExamSet = await StudentExamSet.findOne({studentId: args.studentId, examSetId: args.examSetId});
      let examSet = ExamSet.findOne({_id: args.examSetId});

      if (!!studentExamSet && !!examSet) {

        //console.log(!!studentExamSet);
        //console.log(!!examSet);

        let examSetBookies = await ExamSetBookie.find({examSetId: args.examSetId});

        //console.log("bookId: " + args.bookId);
        //console.log("booksection length : " + bookSections.length);
      
        for (let i in examSetBookies){
          let studentExamSetBookie = {};
          let examSetBookie  = examSetBookies[i];

          studentExamSetBookie.examSetBookieName = examSetBookie.bookieTitle;

          let tests = await ExamTest.find({examSetBookieId: examSetBookie._id});
          studentExamSetBookie.testCount = tests.length;
          //console.log(tests.length);

          let studentTests = await StudentExamTest.find({examSetBookieId: examSetBookie._id});
          studentExamSetBookie.solvedTestCount = studentTests.length;
          if (studentExamSetBookie.testCount != 0) {
            studentExamSetBookie.completionPercentage = Math.floor(studentExamSetBookie.solvedTestCount/studentExamSetBookie.testCount * 100);
          } else {
            studentExamSetBookie.completionPercentage = 0;
          }
          
          //console.log(studentTests.length);

          let solvedQuestionCount = 0;
          let correctAnswerCount = 0;
          let incorrectAnswerCount = 0;
          for (let j in studentTests) {
            let studentTest = studentTests[j];
            let studentAnswers = await StudentExamAnswer.find({studentExamTestId: studentTest._id});
            for(let k in studentAnswers){
              let studentAnswer = studentAnswers[k];
              solvedQuestionCount = solvedQuestionCount + 1;
              if (studentAnswer.isCorrect == true) { correctAnswerCount = correctAnswerCount + 1; }
            }
          }
          studentExamSetBookie.solvedQuestionCount = solvedQuestionCount;
          studentExamSetBookie.correctAnswerCount = correctAnswerCount;
          studentExamSetBookie.incorrectAnswerCount = solvedQuestionCount - correctAnswerCount;
          if (solvedQuestionCount != 0){
            studentExamSetBookie.successRate = Math.floor(correctAnswerCount/solvedQuestionCount * 100);
          } else {
            studentExamSetBookie.successRate = 0;
          }  
          //console.log(correctAnswerCount/solvedQuestionCount * 100);
          
          studentExamSetBookies.push(studentExamSetBookie);
        }
        return {status: 'Success', message: 'Data has been fetched', content: studentExamSetBookies};
      } else {
        return {status: 'Error', message: 'No Data has been fetched', content: {}};
      }

    },

    // ------------------ STUDENT EXAMTESTS -----------------------
    studentExamTests: async (_, args, {token}) => {
      let studentExamTests = [];
      let studentExamSet = await StudentExamSet.findOne({studentId: args.studentId, examSetId: args.examSetId});
      let examSet = await ExamSet.findOne({_id: args.examSetId});
      let examSetBookie = await ExamSetBookie.findOne({_id: args.examSetBookieId});

      if (!!studentExamSet && !!examSet && !!examSetBookie) {
        let examTests = await ExamTest.find({examSetId: args.examSetId, examSetBookieId: args.examSetBookieId});
        //console.log(examTests.length);

        for (let i in examTests){
          let examTest = examTests[i];
          // Check if this Test is solved by this user(student) before
          let examTestTemp = await StudentExamTest.findOne({studentId: args.studentId, examTestId: examTest._id});
          //console.log(!!examTestTemp);

          let studentExamTest = {};
          let testSuccessRate = 0;
          let solvedQuestionCount = 0;
          let correctAnswerCount = 0;
          let incorrectAnswerCount = 0;
          let blankAnswerCount = 0;
          let completionPercentage = 0;

          studentExamTest.studentId = args.studentId;
          studentExamTest.examSetId = examSet._id;
          studentExamTest.examSetImage = examSet.image;
          studentExamTest.examSetBookieId = examSetBookie._id;
          studentExamTest.examSetName = examSet.title;
          studentExamTest.examSetImage = examSet.image;
          studentExamTest.examTestId = examTest._id;
          studentExamTest.testName = examTest.title;
          studentExamTest.questionCount = examTest.questionCount;
          studentExamTest.testSuccessRate = 0;
          studentExamTest.solvedQuestionCount = 0;
          studentExamTest.correctAnswerCount = 0;
          studentExamTest.incorrectAnswerCount = 0;
          studentExamTest.blankAnswerCount = examTest.questionCount;
          studentExamTest.completionPercentage = 0;
          studentExamTest.numberOfStudents = 0;
          studentExamTest.isSolved = false;
          studentExamTest.date = "";
          studentExamTest.timeSpent = 0;
          studentExamTest.sorting = 0;
          studentExamTest.numberOfStudents = 0;

          if (!!examTestTemp){
            studentExamTest.isSolved = true;
            let studentAnswers = await StudentExamAnswer.find({studentExamTestId: examTestTemp._id});
            //console.log("studentAnswers: " + studentAnswers.length);

            for (let j in studentAnswers){
              let studentAnswer = studentAnswers[j];
              solvedQuestionCount = solvedQuestionCount + 1;
              if (studentAnswer.isCorrect == true) { correctAnswerCount = correctAnswerCount + 1; }
            }

            studentExamTest.solvedQuestionCount = solvedQuestionCount;
            studentExamTest.correctAnswerCount = correctAnswerCount;
            studentExamTest.inCorrectAnswerCount = solvedQuestionCount - correctAnswerCount;
            studentExamTest.blankAnswerCount = examTest.questionCount - solvedQuestionCount;
            if (examTest.questionCount != 0) { studentExamTest.completionPercentage = Math.floor(solvedQuestionCount/examTest.questionCount * 100); }
            if (solvedQuestionCount != 0) { studentExamTest.testSuccessRate = Math.floor(correctAnswerCount/solvedQuestionCount * 100); }
            studentExamTest.date = examTestTemp.date;
            studentExamTest.timeSpent = examTestTemp.timeSpent;
          }

          let examTestTemp2 = await StudentExamTest.find({examTestId: examTest._id});
          console.log(examTestTemp2.length);
          studentExamTest.numberOfStudents = 0;
          if (!!examTestTemp2) { studentExamTest.numberOfStudents = examTestTemp2.length; }

          studentExamTests.push(studentExamTest);
        }
        return {status: 'Success', message: 'Data has been fetched', content: studentExamTests};
      } else {
        return {status: 'Error', message: 'No Data has been fetched', content: {}};
      }
    },

    // ------------------ STUDENT TEST -----------------------
    studentExamTest: async (_, args, {token}) => {
      let studentExamAnswers = [];
      let studentExamSet = await StudentExamSet.findOne({studentId: args.studentId, examSetId: args.examSetId});
      let examSet = await ExamSet.findOne({_id: args.examSetId});
      let examSetBookie = await ExamSetBookie.findOne({_id: args.examSetBookieId});
      let examTest = await ExamTest.findOne({_id: args.examTestId});

      if (!!studentExamSet && !!examSet && !!examSetBookie && !!examTest) {
        // All answers in the selected examTest
        let examAnswers = await ExamAnswer.find({examSetTestId: args.examTestId});
        //console.log(examAnswers.length);
        for (let i in examAnswers) {
          let examAnswer = examAnswers[i];

          // Answer for user(student)'s review
          let studentExamAnswer = {};
          let studentExamAnswerPast = await StudentExamAnswer.findOne({examAnswerId: examAnswer._id});
          //console.log(examAnswer._id);
          //console.log(!!studentExamAnswerPast);
          //let bookCategory = await BookCategory.findById({_id: args.categoryId});
          
          studentExamAnswer.studentId = args.studentId;
          //studentExamAnswer.questionBankName = bookCategory.category;
          studentExamAnswer.examSetId = args.examSetId;
          studentExamAnswer.examSetBookieId = examSetBookie._id;
          studentExamAnswer.examTestId = args.examTestId;
          studentExamAnswer.examAnswerId = examAnswer._id;
          studentExamAnswer.questionNumber = examAnswer.questionNumber;
          studentExamAnswer.isAnswered = false;
          studentExamAnswer.correctAnswer = examAnswer.correctAnswer;
          studentExamAnswer.studentAnswer = "Unknown";
          studentExamAnswer.isCorrect = false;
          studentExamAnswer.date = "";
          studentExamAnswer.timeSpent = 0;
          studentExamAnswer.questionPhoto = "";
          studentExamAnswer.solutionPhoto = "";

          if (!!studentExamAnswerPast) {
            studentExamAnswer.isAnswered = true;
            studentExamAnswer.studentAnswer = studentExamAnswerPast.studentAnswer;
            studentExamAnswer.isCorrect = studentExamAnswerPast.isCorrect;
            studentExamAnswer.date = "";
            studentExamAnswer.timeSpent = studentExamAnswerPast.timeSpent;
            studentExamAnswer.questionPhoto = studentExamAnswerPast.questionPhoto;
            studentExamAnswer.solutionPhoto = studentExamAnswerPast.solutionPhoto;
          }

          studentExamAnswers.push(studentExamAnswer);
        }

        return {status: 'Success', message: 'Data has been fetched', content: studentExamAnswers};
      } else {
        return {status: 'Error', message: 'No Data has been fetched', content: {}};
      }
    },

    //--- BACKEND CHAPTER 5 -- Incorrect Solved Questions in the selected course and topics. 5.1.1 (64p)
    studentAnswersInExamSetBookie: async (_, args, {token}) => { 
      let list = [];
      let studentExamSets = await StudentExamSet.find({studentId: args.studentId});
      for(let i in studentExamSets){
        let studentExamSet = studentExamSets[i];
        let examSets = await examSet.find({_id: studentExamSet.examSetId});
        for(let j in examSets){
          let examSet = examSets[j];
          let examSetBookies = await ExamSetBookie.find({examSetId: examSet._id});
          for(let k in examSetBookies){
            let examSetBookie = examSetBookies[k];
            let examTests = await ExamTest.find({examSetBookieId: examSetBookie._id, lessonId: args.lessonId});
            for(let l in examTests){
              let examTest = examTests[l];

              let studentExamTest = await StudentExamTest.findOne({examTestId: examTest._id});

              let student_d = studentExamTest.date;
              if(studentExamTest.date == null) {student_d = new Date();}
              let startTime = Date.parse(args.startTime);
              let endTime = Date.parse(args.endTime);

              if (student_d.getTime() > startTime && student_d.getTime() < endTime){
                  let studentExamAnswers = await StudentExamAnswer.find({studentExamTestId: studentExamTest._id});
                  for(let n in studentExamAnswers){
                    let studentAnswer = {};                    
                    let studentExamAnswer = studentExamAnswers[n];
                    if (!studentExamAnswer.isCorrect){
                      studentAnswer.questionPhoto = studentExamAnswer.questionPhoto;
                      studentAnswer.solutionPhoto = studentExamAnswer.solutionPhoto;
                      studentAnswer.timeSpent = studentExamAnswer.timeSpent;
                      studentAnswer.date = studentExamAnswer.date;
                    }
                    list.push(studentAnswer);
                  }                  
              }
            }
          }
        }
      }

      return {status: 'Success', message: 'Data has been fetched', content: list};
    },

    // ---------------- A STUDENT'S INDIVIDUAL SUBTOPIC SCREEN (5.2.2. 67P)
    studentAnswersInExamSetBookieBySubTopic : async (_, args, {token}) => { 
      let list = [];
      let studentExamSets = await StudentExamSet.find({studentId: args.studentId});
      for(let i in studentExamSets){
        let studentExamSet = studentExamSets[i];
        let examSets = await ExamSet.find({_id: studentExamSet.examSetId});
        for(let j in examSets){
          let examSet = examSets[j];
          let examSetBookies = await ExamSetBookie.find({examSetId: examSet._id});
          for(let k in examSetBookies){
            let examSetBookie = examSetBookies[k];
            let examTests = await ExamTest.find({examSetBookieId: examSetBookie._id, lessonId: args.lessonId});
            for(let l in examTests){
              let examTest = examTests[l];
              let examAnswers = await ExamAnswer.find({examSetTestId: examTest._id, subTopicId: args.subTopicId});
              for(let m in examAnswers){
                let examAnswer = examAnswers[m];
                let studentExamAnswer = await StudentExamAnswer.findOne({examAnswerId: examAnswer._id});
                let studentAnswer = {};
                studentAnswer.questionPhoto = studentExamAnswer.questionPhoto;
                studentAnswer.solutionPhoto = studentExamAnswer.solutionPhoto;
                studentAnswer.timeSpent = studentExamAnswer.timeSpent;
                studentAnswer.date = studentExamAnswer.date;
                list.push(studentAnswer);
              }
              
            }
          }
        }
      }

      return {status: 'Success', message: 'Data has been fetched', content: list};
    },

    practiceExamHomework: async (_, args, {token}) => {
      let curr = new Date;
      let first = curr.getDate() - curr.getDay();
      let last = first + 6;

      let firstday = new Date(curr.setDate(first)).toUTCString();
      let lastday = new Date(curr.setDate(last)).toUTCString();

      let list = [];
      let homeworks = {};
      if (args.timeInterval == "Past") {
        homeworks = await HomeWork.find({student: args.studentId, deadline: {"$lt": firstday} });
      } else if (args.timeInterval == "CurrentWeek") {
        homeworks = await HomeWork.find({student: args.studentId, deadline: {"$gte": firstday, "$lt": lastday}});
      } else if (args.timeInterval == "Upcoming") {
        homeworks = await HomeWork.find({student: args.studentId, deadline: {"$gte": firstday}});
      }

      for (let i in homeworks){
        let homework = homeworks[i];
        let studentHomework = {};
        studentHomework.teacher = homework.teacherId;
        studentHomework.title = homework.title;
        studentHomework.deadline = homework.deadline; 
        let examSet = await ExamSet.find({_id: homework.examSet});
        studentHomework.image = examSet.image;
        let examBooklet = await ExamSetBookie.find({_id: homework.examBooklet});
        studentHomework.isAllTestesd = true;
        let questionCount = 0;
        bookletTests = await ExamTest.find({examSetBookieId: examBooklet._id});
        for (let j in bookletTests){
          let bookletTest = bookletTests[j];
          if (!homework.tests.include(bookletTest._id)) { continue; }
          questionCount += bookletTest.questionCount;
          let studentBookletTest = await StudentExamTest.find({examTestId: bookletTest._id});
          if(!studentBookletTest) {studentHomework.isAllTestesd = false;}
        }
        
        list.push(studentHomework);
      }
      return {status: 'Success', message: 'Data has been fetched', content: list};
    },

    // BACKEND -> CHAPTER 3
    // ------------- PRACTICE EXAM HOME ---------------------------
    PracticeExamHome: async (_, args, {token}) => {
    
    }


  },


  Mutation: {
    //--------------BACKEND START--------------------
    // ----------- STUDENT EXAMSET ------------
    addStudentExamSet: async(_, args, {token}) => {
      console.log("test");
      let studentExamSet = {
        studentId: args.studentId,
        examSetId: args.examSetId
      }
      let isDublicate = await StudentExamSet.findOne(studentExamSet);
      console.log(!!isDublicate);
      if (!!isDublicate) {
        return {status: 'Error', message: 'Entry cannot be added', content: {Details: "Dupicate entry"}};
      } else {
        studentExamSet._id = new mongoose.mongo.ObjectId();
        const isCreated = await StudentExamSet.create(studentExamSet);
        if (isCreated) {
          return {status: "Success", message: "The Data has been successfully added", content: isCreated};
        } else {
          return {status: "Error", message: "Could Not Create an Entry", content: {errorDetails: "failed to add Entry in the database"}};
        }
      }
    },

    // ----------- STUDENT BOOK TEST ------------
    // it is called when a student confirmed the end of his Question Bank Book Test
    addStudentExamTest: async(_, args, {token}) =>{
      let examTest = await ExamTest.findById(args.examTestId);
      console.log("examTest: " + !!examTest);
      
      let studentExamTest = {
        studentId: args.studentId,
        examSetId: args.examSetId,
        examSetBookieId: args.examSetBookieId,
        examTestId: args.examTestId,
        date: new Date(),
        timeSpent: args.timeSpent
      }
      console.log("examTestId: " + args.examTestId);

      let isDublicate = await StudentExamTest.findOne({examTestId: args.examTestId});
      if (!!isDublicate) {
        return {status: 'Error', message: 'Entry cannot be added', content: {Details: "Selected ExamSet Test already Exists"}};
      } else {
        studentExamTest._id = new mongoose.mongo.ObjectId();
        const isCreated = await StudentExamTest.create(studentExamTest);
        console.log("studentExamTest isCreated: " + !!isCreated);
        if (isCreated) {
          let questionCount = examTest.questionCount;
          console.log("Question Count : " + questionCount);
          let solvedQuestionCount = 0;
          let correctAnswerCount = 0;
          let incorrectAnswerCount = 0;
          let blankAnswerCount = 0;

          for (let i = 0; i < questionCount; i++) {
            let where = {};
            where.studentId = args.studentId;
            where.examSetTestId = args.examTestId;
            where.studentExamTestId = studentExamTest._id;
            where.studentAnswer = args.studentAnswers[i];

            let examAnswer = {};
            examAnswer = await ExamAnswer.findOne({examSetTestId: args.examTestId, questionNumber: i + 1})

            if (!(!!examAnswer)) {
                console.log(!(!!examAnswer));
                return {status: "Error", message: "Could Not Create an Entry", content: {errorDetails: "Exam Answer does not exist"}};
            }
            console.log("questionNumber: " + (i + 1));

            let isCorrect = false;
            if (args.studentAnswers[i] == "" || args.studentAnswers[i] == null){
              blankAnswerCount += 1;
            } else {
              solvedQuestionCount += 1;
              if (args.studentAnswers[i] == examAnswer.correctAnswer) { 
                isCorrect = true;
                correctAnswerCount += 1;
              } else {
                incorrectAnswerCount += 1;
              }
            }

            where.isCorrect = isCorrect;
            where.timeSpent = args.timeSpent;
            where.questionPhoto = "";
            where.solutionPhoto = "";

            let isDublicate1 = await StudentExamAnswer.findOne(where);
            if (isDublicate1) {
              continue;
            } else {
              where._id = new mongoose.mongo.ObjectId();
              const isCreated1 = await StudentExamAnswer.create(where);
            }
          }

          let filter = {_id: isCreated._id};
          let update = {
            solvedQuestionCount: solvedTestCount,
            correctAnswerCount: correctAnswerCount,
            incorrectAnswerCount: incorrectAnswerCount,
            blankAnswerCount: blankAnswerCount
          }
          const isUpdated = await StudentExamTest.findOneAndUpdate(filter, update, {returnOriginal: false});

          return {status: "Success", message: "The Data has been successfully added", content: isCreated};
        } else {
          return {status: "Error", message: "Could Not Create an Entry", content: {errorDetails: "failed to add Entry in the database"}};
        }
      }
    },
  
    // 
  

    //--------------- BACKEND END ---------------------


    // -----   E X A M   -----
    addExam: async (_, args, { token }) => {
      const exam = {
        _id: new mongoose.mongo.ObjectId(),
        title: args.title,
        date: args.date,
      };
      
      const created = await Exam.create(exam);
      if (!!created) {
        return { status: 'Success', message: 'Data has been added successfully', content: created}; //Utils.manager.factor.unit(created)
      } else {
        return { status: 'Error', message: 'Failed to add data...', content: null };
      }
    },
    updateExam: async (_, args, { token }) => {
      const fields = ['title', 'date'];
      let updateData = await Exam.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'Data not found', content: null}; }
      for (let fld of fields) {
        updateData[fld] = args[fld];
      }
      const updated = await Exam.findByIdAndUpdate(args._id, {$set : updateData}, {returnOriginal : false});
      if (!!updated) {
        return { status: 'Success', message: 'Data has been updated successfully', content: updated};
      } else {
        return { status: 'Error', message: 'Failed to update data...', content: null };
      }
    },
    deleteExam: async (_, args, { token }) => {
      const deleted = await Exam.deleteOne({ _id: args._id });
      if (!!deleted) {
        if (deleted.deletedCount > 0) {
          return { status: 'Success', message: 'Data has been deleted successfully', content: {...deleted, _id: args._id} };
        } else {
          return { status: 'Error', message: 'Not found data to delete', content: {} };
        }
      } else {
        return { status: 'Error', message: 'Failed to delete data...', content: {} };
      }
    },
    
    // -----   E X A M    A N S W E R   -----
    addExamAnswer: async (_, args, { token }) => {
      const duplicated = await Utils.examAnswer.checkDuplicated({examSetTestId: args.examSetTestId, subTopicId: args.subTopicId,  questionNumber: args.questionNumber});
      if (!!duplicated) { return {status: 'Error', message: 'Duplicated data', content: {}}; }

      const examAnswer = {
        _id: new mongoose.mongo.ObjectId(),
        examSetTestId: args.examSetTestId,
        subTopicId: args.subTopicId,
        questionNumber: args.questionNumber,
        correctAnswer: args.correctAnswer,
      };
      const created = await ExamAnswer.create(examAnswer);
      if (!!created) {return {status: 'Success', message: 'Data has been added successfully', content: created};}
      else {return {status: 'Error', message: 'Failed to add data', content: {}};}
    },
    updateExamAnswer: async (_, args, { token }) => {
      // check existence
      let updateData = await ExamAnswer.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}}; }

      // check duplicate
      const exists = await ExamAnswer.findOne({
        _id: {$ne: args},
        examSetTestId: args.examSetTestId || updateData.examSetTestId,
        subTopicId: args.subTopicId || updateData.subTopicId,
        questionNumber: args.questionNumber || updateData.questionNumber,
      });
      if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: {}}; }
      // patch data to update
      if (!!args.examSetTestId) {updateData.examSetTestId = args.examSetTestId;}
      if (!!args.subTopicId) {updateData.subTopicId = args.subTopicId;}
      if (!!args.questionNumber) {updateData.questionNumber = args.questionNumber;}
      if (!!args.correctAnswer) {updateData.correctAnswer = args.correctAnswer;}

      const updated = await ExamAnswer.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) {return {status: 'Success', message: 'Data has been updated', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteExamAnswer: async (_, args, { token }) => {
      try {
        const deleted = await ExamAnswer.deleteOne({_id: args._id});
        if (deleted) {
          return {status: 'Success', message: 'Data deleted been deleted', content: deleted};
        }
        return {status: 'Error', message: 'Failed to update data', content: {}};
      } catch (e) {return {status: 'Error', message: 'Failed to update data', content: {}};}
    },

    // -----   E X A M    S E T   -----
    addExamSet: async (_, args, { token }) => {
      const duplicated = await Utils.examSet.checkDuplicate({ examId: args.examId, categoryId: args.categoryId, title: args.title, publisherId: args.publisherId, publishYear: args.publishYear });
      if (duplicated) { return {status: 'Error', message: 'Same exam set already exists', content: null}; }

      let es = {
        _id: new mongoose.mongo.ObjectId(),
        examId: args.examId,
        categoryId: args.categoryId,
        title: args.title,
        publisherId: args.publisherId,
        publishYear: args.publishYear,
        isbn: args.isbn || "",
        level: args.level || "",
        showToUsers: args.showToUsers || false,
        image: args.image || "" 
      };
      const created = await ExamSet.create(es);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created};}
      else { return {status: 'Error', message: 'Failed to add data', content: null}; }
    },
    updateExamSet: async (_, args, { token }) => {
      let updateData = await ExamSet.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'Data not found', content: null} }

      
      const updateFlds = ['examId', 'categoryId', 'title', 'publisherId', 'publishYear', 'isbn', 'level', 'showToUsers', 'image'];
      const reqFlds = ['examId', 'categoryId', 'title', 'publisherId', 'publishYear'];
      let reqWhere = {};

      for (let fld of reqFlds) {
        reqWhere[fld] = args[fld] || updateData[fld];
      }
      for (let fld of updateFlds) {
        if (args[fld] !== undefined) { updateData[fld] = args[fld]; }
      }

      const exists = await ExamSet.findOne(reqWhere);
      if (!!exists && !exists._id.equals(updateData._id)) { return {status: 'Success', message: 'Duplicated data', content: null}; }

      const updated = await ExamSet.findOneAndUpdate({_id: args._id}, updateData, {returnOriginal: false});
      if (!!updated) { return {status: 'Success', message: 'Data has been updated successfully', content: updated}; }
      else { return {status: 'Error', message: 'Failed to update data...', content: null}; }
    },
    deleteExamSet: async (_, args, { token }) => {
      try {
        const deleted = await ExamSet.findByIdAndDelete(args._id);
        if (!!deleted) { return {status: 'Success', message: 'Data has been deleted', content: {...deleted, _id: args._id}}; }
        else { return {status: 'Error', message: 'Failed to delete data', content: {}}; }
      } catch (e) {
        return {status: 'Error', message: 'Failed to delete data', content: {}};
      }
    },

    // -----   EXAM SET BOOKIE   -----
    addExamSetBookie: async (_, args, { token }) => {
      const duplicated = await Utils.examSetBookie.checkDuplicated({examSetId: args.examSetId, bookieTitle: args.bookieTitle});
      if (!!duplicated) { return {status: 'Error', message: 'Data already exists', content: {}}; }
      const esb = {_id: new mongoose.mongo.ObjectId(), examSetId: args.examSetId, bookieTitle: args.bookieTitle};
      const created = await ExamSetBookie.create(esb);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created};}
      else {return {status: 'Error', message: 'Failed to add data', content: {}};}
    },
    updateExamSetBookie: async (_, args, { token }) => {
      let updateData = await ExamSetBookie.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}}; }
      
      const exists = await ExamSetBookie.findOne({_id: {$ne: args._id}, examSetId: args.examSetId || updateData.examSetId, bookieTitle: args.bookieTitle || updateData.bookieTitle});console.log('hi')
      if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: {}}; }
      console.log('hi')
      // patch update data
      if (!!args.examSetId) {updateData.examSetId = args.examSetId;}
      if (!!args.bookieTitle) {updateData.bookieTitle = args.bookieTitle;}

      const updated = await ExamSetBookie.findOneAndUpdate({_id: args._id}, updateData, {returnOriginal: false});
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content:{}};}
    },
    deleteExamSetBookie: async (_, args, { token }) => {
      try {
        const deleted = await ExamSetBookie.findByIdAndDelete(args._id);
        return {status: 'Success', message: 'Data has been deleted', content: deleted};
      } catch (e) {
        return {status: 'Error', message: 'Something went wrong', content: {}};
      }
    },

    // -----   EXAM TEST   -----
    addExamTest: async (_, args, { token }) => {
      const duplicate = await Utils.examTest.checkDuplicated({examSetBookieId: args.examSetBookieId, title: args.title});
      if (!!duplicate) {return {status: 'Error', message: 'Duplicated data', content: {}};}

      const et = {
        _id: new mongoose.mongo.ObjectId(),
        examSetBookieId: args.examSetBookieId,
        title: args.title,
        sequence: args.sequence || 0,
        questionCount: args.questionCount || 0,
      };
      const created = await ExamTest.create(et);
      if (!!created) {return {status: 'Scuccess', message: 'Data has been added successfully', content: created};}
      else { return {status: 'Error', message: 'Failed to add data', content: {}}; }
    },
    updateExamTest: async (_, args, { token }) => {
      let updateData = await ExamTest.findOne({_id: args._id});
      if (!updateData) {return {status: 'Error', message: 'No data found', content: {}};}

      const exists = await ExamTest.findOne({
          _id: {$ne: args._id}, 
          examSetBookieId: args.examSetBookieId || updateData.examSetBookieId,
          title: args.title || updateData.title
        });
      if (!!exists) {return {status: 'Error', message: 'Same data alread exists', content: {}};}

      if (!!args.examSetBookieId) {updateData.examSetBookieId = args.examSetBookieId;}
      if (!!args.title) {updateData.title = args.title;}
      if (!!args.sequence) {updateData.sequence = args.sequence;}
      if (!!args.questionCount) {updateData.questionCount = args.questionCount;}

      const updated = await ExamTest.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteExamTest: async (_, args, { token }) => {
      try {
        const deleted = ExamTest.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted', content: deleted};
      } catch (e) {return {status: 'Error', message: 'Failed to delete data', content: {}};}
    },

    // -----   L E S S O N   -----
    addLesson: async (_, args, { token }) => {
      const duplicated = await Utils.lesson.checkDuplicate({title: args.title});
      if (!!duplicated) { return {status: 'Error', message: 'Duplicated data', content: null}; }

      let lesson = {_id: new mongoose.mongo.ObjectId(), title: args.title, exam: args.exam};
      const created = await Lesson.create(lesson);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content:created}; }
      else { return { status: 'Error', message: 'Failed to add data', content: null }; }
    },
    updateLesson: async (_, args, { token }) => {
      const updateData = await Lesson.findById(args._id);
      if (!updateData) { return {status: 'Error', message: 'No data found', content: null}; }
      if(args.title) {updateData.title = args.title}
      if(args.exam) {updateData.exam = args.exam}
      const updated = await Lesson.findByIdAndUpdate(args._id, {$set: updateData}, {returnOriginal: false});
      if (!!updated) { return {status: 'Success', message: 'Data has been updated successfully', content: updated}; }
      else { return {status: 'Error', message: 'Failed to update data', content: null}; }
    },
    deleteLesson: async (_, args, { token }) => {
      try {
        const deleted = await Lesson.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted successfully', content: {...deleted, _id: args._id}};
      }
      catch (e) {
        return {status: 'Error', message: 'Something went wrong', content: {}};
      }
    },

    // -----   S U B T O P I C   -----
    addSubtopic: async (_, args, { token }) => {
      const duplicated = await Utils.subtopic.checkDuplicate({topicId: args.topicId, title: args.title});
      if (!!duplicated) { return {status: 'Error', message: 'Duplicated data', content: null}; }

      const subtopic = {_id: new mongoose.mongo.ObjectId(), topicId: args.topicId, title: args.title, lessonId: args.lessonId};
      const created = await Subtopic.create(subtopic);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created}; }
      else { return {status: 'Error', message: 'Failed to add data', content: null}; }
    },
    updateSubtopic: async (_, args, { token }) => {
      let updateData = await Subtopic.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: null}; }

      let exists = await Subtopic.findOne({topicId: args.topicId || updateData.topicId, title: args.title || updateData.title, _id: {$ne: args._id}});
      if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: null}; }

      if (!!args.topicId) {updateData.topicId = args.topicId;}
      if (!!args.title) { updateData.title = args.title; }
      if (args.lessonId) {updateData.lessonId = args.lessonId}
      const updated = await Subtopic.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) { return {status: 'Success', message: 'Data has been updated successfully', content: updated}; }
      else { return {status: 'Error', message: 'Failed to update data', content: null}; }
    },
    deleteSubtopic: async (_, args, { token }) => {
      try {
        const deleted = await Subtopic.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data had been deleted successfully', content: {...deleted, _id: args._id}};
      }
      catch (e) {
        return {status: 'Error', message: 'Something went wrong', content: {}};
      }
    },

    // -----   T O P I C   -----
    addTopic: async (_, args, { token }) => {
      const duplicated = await Topic.findOne({lessonId: args.lessonId, title: args.title});
      if (!!duplicated) { return {status: 'Error', message: 'Duplicated data', content: null}; }
      const topic = { _id: new mongoose.mongo.ObjectId(), lessonId: args.lessonId, title: args.title };
      const created = await Topic.create(topic);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created} }
      else { return {status: 'Error', message: 'Failed to add data', content: {"errorDetails" : "Something Went Wrong"}}; }
    },
    updateTopic: async (_, args, { token }) => {
      let updateData = await Topic.findOne({_id: args._id});
      if (!updateData) {return {status: 'Error', message: 'No data found', content: null};}

      const exists = await Topic.findOne({lessonId: args.lessonId, title: args.title, _id: {$ne: args._id}});
      if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: null}; }

      if (!!args.lessonId) {updateData.lessonId = args.lessonId;}
      if (!!args.title) {updateData.title = args.title;}
      const updated = await Topic.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content: {"errorDetails" : "Something Went Wrong"}};}
    },
    deleteTopic: async (_, args, { token }) => {
      try {
        const deleted = await Topic.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Topic deleted successfully', content: {...deleted, _id: args._id}};
      } catch (e) {
        return {status: 'Error', message: 'Something went wrong', content: {}};
      }
    },

    // ------- P R A T I C E   E X A M ------------------
    addPracticeExam: async (_, args, { token }) => {
      let practiceExam = {
        title: args.title,
        category: args.category,
        exam: args.exam,
        publisher: args.publisher,
        releaseYear: args.releaseYear
      };
      const isDuplicate = await PracticeExam.findOne(practiceExam);
      if (isDuplicate) {
        return { status: 'Error', message: 'Duplicated entry', content: { 'errorDetails': 'Duplicated Entry cannot be added' } };
      } else {
        practiceExam._id = new mongoose.mongo.ObjectId();
        practiceExam.photoId = args.photoId;
        practiceExam.isbn = args.isbn;
        practiceExam.level = args.level;
        practiceExam.showToUser = args.showToUser;

        const isCreated = await PracticeExam.create(practiceExam);
        if (isCreated) {
          return { status: 'Success', message: 'Data has been added to the system', content: isCreated };
        }
        return { status: 'Error', message: 'Data cannot be added to the database', content: { 'errorDetails': 'Database insertion error' } };
      }
    },

    updatePracticeExam: async (_, args, {token}) => {
      let praticeExam = await PracticeExam.findById(args._id);
      if (praticeExam) {
        praticeExam.title= args.title ? args.title : praticeExam.title;
        praticeExam.category= args.category ? args.category : praticeExam.category;
        praticeExam.exam= args.exam ? args.exam : praticeExam.exam;
        praticeExam.publisher= args.publisher ? args.publisher : praticeExam.publisher;
        praticeExam.releaseYear= args.releaseYear ? args.releaseYear : praticeExam.releaseYear;
        praticeExam.photoId = args.photoId ? args.photoId : praticeExam.photoId;
        praticeExam.isbn = args.isbn  ? args.isbn : praticeExam.isbn;
        praticeExam.level = args.level ? args.level : praticeExam.level;
        praticeExam.showToUser = args.showToUser == true || args.showToUser == false ? args.showToUser : praticeExam.showToUser;
        const isUpdated = await PracticeExam.findByIdAndUpdate(args._id, {$set : praticeExam}, {returnOriginal : false});
        if (isUpdated) {
          return { status : 'Success', message : 'Data has been Updated' , content : isUpdated};
        }
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },

    deletedPracticeExam: async (_, args, {token}) => {
      let praticeExam = await PracticeExam.findByIdAndDelete(args._id);
      if (praticeExam) {
        return { status : 'Success', message : 'Data has been Deleted' , content : {}};
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },

    addPracticeExamBooklet: async (_, args, {token}) => {
      let booklet = {
        title: args.title,
        examSet : args.examSet
      };
      const isDuplicate = await PracticeExamBooklet.findOne(booklet);
      if (isDuplicate) {
        return { status : 'Error', message : 'Duplicated entry' , content : {'errorDetails' : 'Entry already exist cannot be rewrite'}};
      } else {
        booklet._id = new mongoose.mongo.ObjectId();
        const isCreated = await PracticeExamBooklet.create(booklet);
        if (isCreated) {
          return { status : 'Success', message : 'Data has been added to the database' , content : isCreated};
        }
        return { status : 'Error', message : 'Data cannot be added to the database' , content : {'errorDetails' : 'Cannot enter the value in database'}};
      }
    },
    updatePracticeExamBooklet: async (_, args, {token}) => {
      let praticeExam = await PracticeExamBooklet.findById(args._id);
      if (praticeExam) {
        praticeExam.title = args.title ? args.title : praticeExam.title;
        praticeExam.examSet = args.examSet  ? args.examSet : praticeExam.examSet;
        const isUpdated = await PracticeExamBooklet.findByIdAndUpdate(args._id, {$set : praticeExam}, {returnOriginal : false});
        if (isUpdated) {
          return { status : 'Success', message : 'Data has been Updated' , content : isUpdated};
        }
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },
    deletedPracticeExamBooklet: async (_, args, {token}) => {
      let praticeExam = await PracticeExamBooklet.findByIdAndDelete(args._id);
      if (praticeExam) {
        return { status : 'Success', message : 'Data has been Deleted' , content : {}};
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },
    addBookletTest: async (_, args, {token}) => {
      let test = {
        title: args.title,
        examSet: args.examSet,
        lesson: args.lesson,
        booklet: args.booklet,
        questions: args.questions
      };
      const isDuplicate = await BookletTest.findOne(test);
      if (isDuplicate) {
        return { status : 'Error', message : 'Duplicated entry' , content : {'errorDetails' : 'Entry already exist cannot be rewrite'}};
      } else {
        test._id = new mongoose.mongo.ObjectId();
        test.sortOrder = args.sortOrder;
        const isCreated = await BookletTest.create(test);
        if (isCreated) {
          return { status : 'Success', message : 'Data has been added to the database' , content : isCreated};
        }
        return { status : 'Error', message : 'Data cannot be added to the database' , content : {'errorDetails' : 'Cannot enter the value in database'}};
      }
    },

    updateBookletTest: async (_, args, {token}) => {
      let Booklettest = await BookletTest.findById(args._id);
      if (Booklettest) {
        Booklettest.title = args.title ? args.title : Booklettest.title;
        Booklettest.examSet = args.examSet ? args.examSet : Booklettest.examSet;
        Booklettest.lesson = args.lesson ? args.lesson : Booklettest.lesson;
        Booklettest.booklet = args.lession ? args.lession : Booklettest.lession;
        Booklettest.questions = args.questions ? args.questions : Booklettest.questions;
        const isUpdated = await BookletTest.findByIdAndUpdate(args._id, {$set : Booklettest}, {returnOriginal : false});
        if (isUpdated) {
          return { status : 'Success', message : 'Data has been Updated' , content : isUpdated};
        }
      }
      return { status : 'Error', message : 'No Such Test Exist' , content : {}};
    },

    deleteBookletTest: async (_, args, {token}) => {
      let Booklettest = await BookletTest.findByIdAndDelete(args._id);
      if (Booklettest) {
        return { status : 'Success', message : 'Data has been Deleted' , content : {}};
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },

    addBookletTestAnswer: async (_, args, {token}) => {
      let testAnswer = {
        _id: new mongoose.mongo.ObjectId(),
        topic: args.topic,
        subtopic: args.subtopic,
        bookletTestId: args.bookletTestId || "",
        answer : args.answer
      };
      const isCreated = await BookletTestAnswer.create(testAnswer);
      if (isCreated) {
        return { status : 'Success', message : 'Data has been added to the database' , content : isCreated};
      }
      return { status : 'Error', message : 'Data cannot be added to the database' , content : {'errorDetails' : 'Cannot enter the value in database'}};
    },
    updateBookletTestAnswer : async (_, args, {token}) => {
      let bookletTestAnswer = await BookletTestAnswer.findById(args._id);
      if (bookletTestAnswer) {
        bookletTestAnswer.topic = args.topic ? args.topic : bookletTestAnswer.topic;
        bookletTestAnswer.subtopic = args.subtopic ? args.subtopic : bookletTestAnswer.subtopic;
        bookletTestAnswer.bookletTestId = args.bookletTestId ? args.bookletTestId : bookletTestAnswer.bookletTestId;
        bookletTestAnswer.answer = args.answer ? args.answer : bookletTestAnswer.answer;
        const isUpdated = await BookletTestAnswer.findByIdAndUpdate(args._id, {$set : bookletTestAnswer}, {returnOriginal : false});
        if (isUpdated) {
          return { status : 'Success', message : 'Data has been Updated' , content : isUpdated};
        }
      }
      return { status : 'Error', message : 'No Such Test Exist' , content : {}};
    },

    deletedBookletTestAnswer: async (_, args, {token}) => {
      let Booklettest = await BookletTestAnswer.findByIdAndDelete(args._id);
      if (Booklettest) {
        return { status : 'Success', message : 'Data has been Deleted' , content : {}};
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },


    // ------------- HOMEWORK -----------------
    addHomeWorkFromQuestionBank: async (_, args, {token}) => {
      const homeWork = {
        _id : new mongoose.mongo.ObjectId(),
        title: args.title,
        teacherId: args.teacherId,
        deadline: args.deadline,
        description: args.description,
        questionBankBook: args.questionBankBook,
        bookUnit: args.bookUnit || "",
        sections: args.sections ? args.sections : [],
        tests: args.tests ? args.tests : [],
      };
      const isCreated = await HomeWork.create(homeWork);
      if (isCreated) {
        return {status:'Success', message: 'Homework has been Created', content: isCreated};
      }
      return {status: 'Error', message: 'Couldn\'t create homework', content: {errorDetails: 'Home work could not be added'}};
    },
    deleteHomeWorkFromQuestionBank: async (_, args, {token}) => {
      let item = await HomeWork.findByIdAndDelete(args._id);
      if (item) {
        return { status : 'Success', message : 'Data has been Deleted' , content : {}};
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },
    updateHomeWorkFromQuestionBank: async (_, args, {token}) => {
      let homework = await HomeWork.findById(args._id);
      if (homework) {
        homework.class = args.class ? args.class : homework.class;
        homework.title = args.title ? args.title : homework.title;
        homework.deadline = args.deadline ? args.deadline : homework.deadline;
        homework.description = args.description ? args.description : homework.description;
        homework.questionBankBook = args.questionBankBook ? args.questionBankBook : homework.questionBankBook;
        homework.bookUnit = args.bookUnit ? args.bookUnit : homework.bookUnit;
        homework.sections = args.sections ? args.sections : homework.sections;
        homework.tests = args.tests ? args.tests : homework.tests;
        const isUpdated = await HomeWork.findByIdAndUpdate(args._id, {$set : homework}, {returnOriginal : false});
        if (isUpdated) {
          return { status : 'Success', message : 'Data has been Updated' , content : isUpdated};
        }
      }
      return { status : 'Error', message : 'No Such Test Exist' , content : {}};
    },

    // ------------- HOMEWORK -----------------
    addHomeWorkFromPraticeExam: async (_, args, {token}) => {
      const homeWork = {
        _id : new mongoose.mongo.ObjectId(),
        title: args.title,
        deadline: args.deadline,
        teacherId: args.teacherId,
        description: args.description,
        examSet: args.examSet || "",
        examBooklet: args.examBooklet || "",
        bookletTests: args.bookletTests || []
      };
      const isCreated = await HomeWork.create(homeWork);
      if (isCreated) {
        return {status:'Success', message: 'Homework has been Created', content: isCreated};
      }
      return {status: 'Error', message: 'Couldn\'t create homework', content: {errorDetails: 'Home work could not be added'}};
    },
    deleteHomeWorkFromPraticeExam: async (_, args, {token}) => {
      let item = await HomeWork.findByIdAndDelete(args._id);
      if (item) {
        return { status : 'Success', message : 'Data has been Deleted' , content : {}};
      }
      return { status : 'Error', message : 'No Such Data Exist' , content : {}};
    },
    updateHomeWorkFromPraticeExam: async (_, args, {token}) => {
      let homework = await HomeWork.findById(args._id);
      if (homework) {
        homework.class = args.class ? args.class : homework.class;
        homework.title = args.title ? args.title : homework.title;
        homework.deadline = args.deadline ? args.deadline : homework.deadline;
        homework.description = args.description ? args.description : homework.description;
        homework.examSet = args.examSet ? args.examSet : homework.examSet;
        homework.examBooklet = args.examBooklet ? args.examBooklet : homework.examBooklet;
        homework.bookletTests = args.bookletTests ? args.bookletTests : homework.bookletTests;
        const isUpdated = await HomeWork.findByIdAndUpdate(args._id, {$set : homework}, {returnOriginal : false});
        if (isUpdated) {
          return { status : 'Success', message : 'Data has been Updated' , content : isUpdated};
        }
      }
      return { status : 'Error', message : 'No Such Test Exist' , content : {}};
    },
  },

  Exam: {
    async __resolveReference(exm) {
      const exam = await Exam.findOne({_id: exm._id});
      if (exam) {return {status:'Success', message: 'data fetch successfully', content: exam};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
  },

  ExamAnswer: {
    async __resolveReference(ea) {
      const examAnswer = await ExamAnswer.findOne({_id: ea._id});
      if (examAnswer) {return {status:'Success', message: 'data fetch successfully', content: examAnswer};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    async subtopic(ea) {
      const subtopic = await Subtopic.findOne({_id: ea.subTopicId});
      if (subtopic) {return {status:'Success', message: 'data fetch successfully', content: subtopic};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    async examTest(ea) {
      const examTest = await ExamTest.findOne({_id: ea.examSetTestId});
      if (examTest) {return {status:'Success', message: 'data fetch successfully', content: examTest};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
  },

  ExamSet: {
    async __resolveReference(es) {
      const examSet = await ExamSet.findOne({_id: es._id});
      if (examSet) {return {status:'Success', message: 'data fetch successfully', content: examSet};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    async exam(es) {
      const exam = await Exam.findOne({_id: es.examId});
      if (exam) {return {status:'Success', message: 'data fetch successfully', content: exam};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    category(es) { return {__typename: "Category", _id: es.categoryId}; },
    publisher(es) { return {__typename: "Publisher", _id: es.publisherId}; }
  },

  ExamSetBookie: {
    async __resolveReference(esb) {
      const examSetBookie = await ExamSetBookie.findOne({_id: esb._id});
      if (examSetBookie) {return {status:'Success', message: 'data fetch successfully', content: examSetBookie};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    async examSet(esb) {
      const examSet = await ExamSet.findOne({_id: esb.examSetId});
      if (examSet) {return {status:'Success', message: 'data fetch successfully', content: examSet};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
  },

  ExamTest: {
    async __resolveReference(et) {
      const examTest = await ExamTest.findOne({_id: et._id});
      if (examTest) {return {status:'Success', message: 'data fetch successfully', content: examTest};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    async examSetBookie(et) {
      const esb = await ExamSetBookie.findOne({_id: et.examSetBookieId});
      if (esb) {return {status:'Success', message: 'data fetch successfully', content: esb};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
  },

  Lesson: {
    async __resolveReference(ls) {
      const lesson = await Lesson.findOne({_id: ls._id});
      if (lesson) {return {status:'Success', message: 'data fetch successfully', content: lesson};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
  },

  Subtopic: {
    async __resolveReference(st) {
      const subtopic = await Subtopic.findOne({_id: st._id});
      if (subtopic) {return {status:'Success', message: 'data fetch successfully', content: subtopic};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    async topic(subtopic) {
      const tp = await Topic.findOne({_id: subtopic.topicId});
      if (tp) {return {status:'Success', message: 'data fetch successfully', content: tp};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    }
  },

  Topic: {
    async __resolveReference(tp) {
      const topic = await Topic.findOne({_id: tp._id});
      if (topic) {return {status:'Success', message: 'data fetch successfully', content: topic};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
    async lesson(topic) {
      const lesson = await Lesson.findOne({_id: topic.lessonId});
      if (lesson) {return {status:'Success', message: 'data fetch successfully', content: lesson};}
      return {status: 'Error', message: 'No Data found', content: {errorDetails: 'No Data found'}};
    },
  },

  

};
