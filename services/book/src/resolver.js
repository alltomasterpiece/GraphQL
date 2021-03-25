const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const Book = require('./models/book.model');
const BookTest = require('./models/bookTest.model');
const BookTestAnswer = require('./models/bookTestAnswer.model');
const BookUnit = require('./models/bookUnit.model');
const BookUnitPart = require('./models/bookUnitPart.model');
const BookUnitSubTopic = require('./models/bookUnitSubTopic.model');
const BookUnitTopic = require('./models/bookUnitTopic.model');
const Question = require('./models/question.model');
const BookSection = require('./models/bookSection.model');
const BookCategory = require('./models/bookCategory.model');
const StudentBook = require('./models/studentBook.model');
const StudentBookTest = require('./models/studentBookTest.model');
const StudentBookTestAnswer = require('./models/studentBookTestAnswer.model');
const Topic1 = require('./models/topic1.model');
const Publisher = require('./models/publisher.model');
const HomeWork = require('./models/homeWork.model');
const Utils = require("./utils");
const { slice, conforms } = require('lodash');
const { isTypeNodeAnEntity } = require('@apollo/federation/dist/composition/utils');



module.exports = {
  Query: {
    // -----   B O O K   -----
    book: async (_, args, { token }) => {
      const book = await Book.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: book};
    },
    getStudentOfBooks: async (_, args, { token }) => {
      let book = await Book.findOne({_id: args._id});
      book = JSON.parse(JSON.stringify(book));
      if (book) {
        return {status: 'Success', message: 'Data has been fetched', content: { numberOfStudent : book.students.length}};
      }
      return {status: 'Error', message: 'No book available', content: {}};
    },
    books: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.examId) { where.examId = args.examId; }
      if (!!args.categoryId) {where.categoryId = args.categoryId;}
      if (!!args.title) {where.title = new RegExp(args.title, 'i');}
      if (!!args.publisherId) {where.publisherId = args.publisherId;}
      if (!!args.publishYear) {where.publishYear = args.publishYear;}
      if (!!args.isbn) {where.isbn = args.isbn;}
      if (!!args.level) {where.level = args.level;}
      if (args.showToUsers !== undefined) {where.showToUsers = args.showToUsers;}
      
      let books = await Book.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data has been fetched', content: books};
    },

    // -----   B O O K   T E S T   -----
    bookTest: async (_, args, { token }) => {
      const bookTest = await BookTest.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: bookTest};
    },
    bookTests: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.iimit ? args.limit : 0;
      let where = {};
      if (!!args.bookUnitSectionId) {where.bookUnitSectionId = args.bookUnitSectionId;}
      if (!!args.bookUnitId) {where.bookUnitId = args.bookUnitId;}
      if (!!args.bookId) {where.bookId = args.bookId;}
      if (!!args.testName) {where.testName = new RegExp(args.testName, 'i');}
      if (!!args.questionCount) {where.questionCount = args.questionCount;}

      let bookTests = await BookTest.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data has been fetched', content: bookTests};
    },

    // -----   B O O K   T E S T   A N S W E R   -----
    bookTestAnswer: async (_, args, { token }) => {
      const bta = await BookTestAnswer.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: bta};
    },
    bookTestAnswers: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.iimit ? args.limit : 0;
      let where = {};
      if (!!args.bookTestId) {where.bookTestId = args.bookTestId;}
      if (!!args.subTopicId) {where.subTopicId = args.subTopicId;}
      if (!!args.questionNumber) {where.questionNumber = args.questionNumber;}
      if (!!args.correctAnswer) {where.correctAnswer = args.correctAnswer;}

      let bookTestAnswers = await BookTestAnswer.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data has been fetched', content: bookTestAnswers};
    },

    // -----   B O O K   U N I T   -----
    bookUnit: async (_, args, { token }) => {
      const bookUnit = await BookUnit.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: bookUnit};
    },
    bookUnits: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.iimit ? args.limit : 0;
      let where = {};
      if (!!args.bookId) {where.bookId = args.bookId;}
      if (!!args.lessonId) {where.lessonId = args.lessonId;}
      if (!!args.title) {where.title = new RegExp(args.title, 'i');}

      let bookUnits = await BookUnit.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data has been fetched', content: bookUnits};
    },

    // -----   B O O K   U N I T    P A R T   -----
    bookUnitPart: async (_, args, { token }) => {
      const but = await BookUnitPart.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },
    bookUnitParts: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.title) {where.title = new RegExp(args.title, 'i');}
      if (!!args.bookUnitId) {where.bookUnitId = args.bookUnitId;}

      let buts = await BookUnitPart.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data has been fetched', content: buts};
    },

    // -----   B O O K   U N I T   S U B T O P I C   -----
    bookUnitSubTopic: async (_, args, { token }) => {
      const but = await BookUnitSubTopic.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },
    bookUnitSubTopics: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.subTopicId) {where.subTopicId = args.subTopicId;}
      if (!!args.bookUnitPartId) {where.bookUnitPartId = args.bookUnitPartId;}

      let buts = await BookUnitSubTopic.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data has been fetched', content: buts};
    },

    // -----   B O O K   U N I T   T O P I C   -----
    bookUnitTopic: async (_, args, { token }) => {
      const but = await BookUnitTopic.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },
    bookUnitTopics: async (_, args, { token }) => {
      const offset = !!args.offset ? args.offset : 0;
      const limit = !!args.limit ? args.limit : 0;
      let where = {};
      if (!!args.topicId) {where.topicId = args.topicId;}
      if (!!args.bookUnitPartId) {where.bookUnitPartId = args.bookUnitPartId;}

      let buts = await BookUnitTopic.find(where).skip(offset).limit(limit);
      return {status: 'Success', message: 'Data has been fetched', content: buts};
    },

    question: async (_, args, { token }) => {
      const but = await Question.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },

    questions: async (_, args, { token }) => {
      const but = await Question.find();
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },

    bookSection: async (_, args, { token }) => {
      const but = await BookSection.findOne({_id: args._id});
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },

    booksections: async (_, args, { token }) => {
      const but = await BookSection.find();
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },

    bookCategory: async (_, args, { token }) => {
      const but = await BookCategory.findById(args._id);
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },

    bookCategoris: async (_, args, { token }) => {
      const but = await BookCategory.find();
      return {status: 'Success', message: 'Data has been fetched', content: but};
    },

    // --------------- STUDENT BOOK ----------------
    studentBooks: async (_, args, {token}) => {
      let studentBooks = [];
      let bookIds = await StudentBook.find({studentId: args.studentId});
      
      for(let i in bookIds) {
        let studentBook = {};
        let book = await Book.findOne({_id: bookIds[i].bookId, categoryId: args.categoryId});
        if (!!book) {
          studentBook.studentId = args.studentId;
          let category = await BookCategory.findById(args.categoryId);
          studentBook.questionBankName = category.category;
          studentBook.bookId = book._id;
          studentBook.title = book.title;
          studentBook.image = book.image;
          
          let testCount = 0;
          let tests = await BookTest.find({bookId: book._id});  
          testCount = tests.length;
          studentBook.testCount = testCount;

          let questionCount = 0;
          for(let j in tests){
            questionCount = questionCount + tests[j].questionCount;
          }
          studentBook.questionCount = questionCount;
          
          let studentSolvedQuestionCount = 0;
          let studentCorrectAnswerCount = 0;
          let studentIncorrectAnswerCount = 0;
          let studentSolvedTests = await StudentBookTest.find({studentId: args.studentId, bookId: book._id});
          let solvedTestCount = 0;
          solvedTestCount =  studentSolvedTests.length;

          if (testCount == 0) {
            studentBook.completionPercentage = 0;
          } else {
            studentBook.completionPercentage = Math.floor(solvedTestCount/testCount * 100);
          }
          for (let i in studentSolvedTests){
            let studentSolvedTest = studentSolvedTests[i];
            let studentSolvedQuestions = await StudentBookTestAnswer.find({studentId: args.studentId, studentBookTestId: studentSolvedTest._id});
            for(let j  in studentSolvedQuestions){
              let studentSolvedQuestion = studentSolvedQuestions[j];
              studentSolvedQuestionCount = studentSolvedQuestionCount + 1;
              if (studentSolvedQuestion.isCorrect == true) {studentCorrectAnswerCount = studentCorrectAnswerCount + 1;}
            }
          }
          //console.log(studentSolvedQuestionCount);
          studentIncorrectAnswerCount = studentSolvedQuestionCount - studentCorrectAnswerCount;
          let bookSuccessRate = 0;
          if (studentSolvedQuestionCount == 0) {
            bookSuccessRate = 0;
          } else {
            bookSuccessRate = Math.floor(studentCorrectAnswerCount/studentSolvedQuestionCount * 100);
          }
          studentBook.solvedQuestionCount = studentSolvedQuestionCount;
          studentBook.correctAnswerCount = studentCorrectAnswerCount;
          studentBook.incorrectAnswerCount = studentIncorrectAnswerCount;
          studentBook.bookSuccessRate = bookSuccessRate;
      
          studentBooks.push(studentBook);
        }
        
      }
      return {status: 'Success', message: 'Data has been fetched', content: studentBooks};      
    },

    studentAllBooks: async (_, args, {token}) => {
      let studentAllBooks = [];
      
      
      return {status: 'Success', message: 'Data has been fetched', content: studentBooks};      
    },

    // --------------- STUDENT BOOK SEARCH ----------------
    bookSearch: async (_, args, { token }) => {
      let list = [];
      let books = await Book.find({title: new RegExp(args.title, 'i')});
      if (books.length > 0) {
        for (let i in books) {
          let book = {};
          book.bookId = books[i]._id;
          book.title = books[i].title;
          book.image = books[i].image;

          let tests = await BookTest.find({bookId: books[i]._id});
          book.testCount = tests.length; 

          let count = 0;
          for(let j in tests){
              count = count + tests[j].questionCount;
          }
          book.questionCount = count;

          list.push(book);
        }
          return {status: 'Success', message: 'Data has been fetched', content: list};
      } else {
          return {status: 'Success', message: 'No Data has been matched', content: list};
      }  
    },

     // --------------- STUDENT PUBLISHERS ----------------
     studentPublishers: async (_, args, {token}) => {
      let studentPublishers = [];
      let publishers = await Publisher.find();
      for (let i in publishers){
        let publisher = publishers[i];
        let studentPublisher = {
          publisherId: publisher._id,
          publisherName: publisher.name,
          publisherLogo: publisher.logo
        };

        studentPublishers.push(studentPublisher);
      }

      return {status: 'Success', message: 'Data has been fetched', content: studentPublishers};
    },


    // --------------- STUDENT PUBLISHER SEARCH ----------------
    studentPublisherSearch: async (_, args, {token}) => {
      let studentPublishers = [];
      let publishers = await Publisher.find({name: new RegExp(args.publisherSearchWord, 'i')});
      for (let i in publishers){
        let publisher = publishers[i];
        let studentPublisher = {
          publisherId: publisher._id,
          publisherName: publisher.name,
          publisherLogo: publisher.logo
        };

        studentPublishers.push(studentPublisher);
      }

      return {status: 'Success', message: 'Data has been fetched', content: studentPublishers};
    },

    // ---------------- BOOKS SELECCTED BY STUDENT & PUBLISHER
    studentPublisherBooks: async (_, args, {token}) => {
      let studentPublisherBooks = [];
      let books = await Book.find({publisherId: args.publisherId, categoryId: args.categoryId});
      for(let i in books){
        let book = books[i];
        studentBook = {};
        studentBook._id = book._id;
        studentBook.title = book.title;
        studentBook.image = book.image;
        studentBook.isSelectedByStudent = false;
        let studentSelectBook = await StudentBook.findOne({bookId: book._id});
        if (!!studentSelectBook) {studentBook.isSelectedByStudent = true;}

        studentBook.testCount = 0;
        studentBook.questionCount = 0;
        let testCount = 0;
        let questionCount = 0;
        let tests = await BookTest.find({bookId: book._id});
        for (let j in tests){
          let test = tests[j];
          testCount = testCount + 1;
          questionCount = questionCount + test.questionCount;
        }
        studentBook.testCount = testCount;
        studentBook.questionCount = questionCount;
        studentPublisherBooks.push(studentBook);
      }
      return {status: 'Success', message: 'Data has been fetched', content: studentPublisherBooks};
    },

    // --------------- STUDENT BOOK SECTION(TOPIC) ----------------
    studentBookUnitSections: async (_, args, {token}) => {
      let studentBookSections = [];
      let studentBook = await StudentBook.findOne({studentId: args.studentId, bookId: args.bookId});
      let book = Book.findOne({_id: args.bookId});

      if (!!studentBook && !!book) {

        //console.log(!!studentBook);
        //console.log(!!book);

        let bookSections = await BookSection.find({bookId: args.bookId});

        //console.log("bookId: " + args.bookId);
        //console.log("booksection length : " + bookSections.length);
      
        for (let i in bookSections){
          let studentBookSection = {};
          let bookSection  = bookSections[i];

          let book = await Book.findOne({_id: bookSection.bookId});
          studentBookSection.bookName = book.title;
          studentBookSection.bookUnitId = bookSection.unitId;

          //studentBookSection.topicName = "";
          let topic = await Topic1.findOne({_id: bookSection.topicId[0]});
          if (!!topic) {studentBookSection.topicName = topic.title}
          //console.log(studentBookSection.topicName);

          let tests = await BookTest.find({bookUnitSectionId: bookSection._id});
          studentBookSection.testCount = tests.length;
          //console.log(tests.length);

          let studentTests = await StudentBookTest.find({bookUnitSectionId: bookSection._id});
          studentBookSection.solvedTestCount = studentTests.length;
          if(studentBookSection.testCount != 0) {
            studentBookSection.completionPercentage = Math.floor(studentBookSection.solvedTestCount/studentBookSection.testCount * 100);
          } else {
            studentBookSection.completionPercentage = 0;
          }
          
          //console.log(studentTests.length);

          let solvedQuestionCount = 0;
          let correctAnswerCount = 0;
          let incorrectAnswerCount = 0;
          for (let j in studentTests) {
            let studentTest = studentTests[j];
            let studentAnswers = await StudentBookTestAnswer.find({studentBookTestId: studentTest._id});
            for(let k in studentAnswers){
              let studentAnswer = studentAnswers[k];
              solvedQuestionCount = solvedQuestionCount + 1;
              if (studentAnswer.isCorrect == true) { correctAnswerCount = correctAnswerCount + 1; }
            }
          }
          studentBookSection.solvedQuestionCount = solvedQuestionCount;
          studentBookSection.correctAnswerCount = correctAnswerCount;
          studentBookSection.incorrectAnswerCount = solvedQuestionCount - correctAnswerCount;
          if (correctAnswerCount != 0){
            studentBookSection.topicSuccessRate = Math.floor(correctAnswerCount/solvedQuestionCount * 100);
          } else {
            studentBookSection.topicSuccessRate = 0;
          }  
          //console.log(correctAnswerCount/solvedQuestionCount * 100);
          
          studentBookSections.push(studentBookSection);
        }
        return {status: 'Success', message: 'Data has been fetched', content: studentBookSections};
      } else {
        return {status: 'Error', message: 'No Data has been fetched', content: {}};
      }

    },

    // --------------- STUDENT BOOK TEST LIST ----------------
    studentBookTests: async (_, args, {token}) => {
      let studentBookTests = [];
      let studentBook = await StudentBook.findOne({studentId: args.studentId, bookId: args.bookId});
      let book = await Book.findOne({_id: args.bookId});
      let bookUnitSection = await BookSection.findOne({_id: args.bookUnitSectionId});

      if (!!studentBook && !!book && !!bookUnitSection) {
        let bookTests = await BookTest.find({bookId: args.bookId, bookUnitSectionId: args.bookUnitSectionId});
        //console.log(bookTests.length);

        for (let i in bookTests){
          let bookTest = bookTests[i];
          // Check if this Test is solved by this user(student) before
          let bookTestTemp = await StudentBookTest.findOne({bookTestId: bookTest._id});
          //console.log(!!bookTestTemp);

          let studentBookTest = {};
          let testSuccessRate = 0;
          let solvedQuestionCount = 0;
          let correctAnswerCount = 0;
          let incorrectAnswerCount = 0;
          let blankAnswerCount = 0;
          let completionPercentage = 0;

          studentBookTest.studentId = bookTest.studentId;
          studentBookTest.bookId = bookTest.bookId;
          studentBookTest.bookUnitId = bookTest.bookUnitId;
          studentBookTest.bookUnitSectionId = bookTest.bookUnitSectionId;
          studentBookTest.bookName = book.title;
          studentBookTest.bookImage = book.image;
          studentBookTest.bookTestId = bookTest._id;
          studentBookTest.testName = bookTest.testName;
          studentBookTest.questionCount = bookTest.questionCount;
          studentBookTest.testSuccessRate = 0;
          studentBookTest.solvedQuestionCount = 0;
          studentBookTest.correctAnswerCount = 0;
          studentBookTest.incorrectAnswerCount = 0;
          studentBookTest.blankAnswerCount = bookTest.questionCount;
          studentBookTest.completionPercentage = 0;
          studentBookTest.isSolved = false;
          studentBookTest.date = "";
          studentBookTest.timeSpent = 0;

          if (!!bookTestTemp){
            studentBookTest.isSolved = true;
            let studentAnswers = await StudentBookTestAnswer.find({studentBookTestId: bookTestTemp._id});
            //console.log("studentAnswers: " + studentAnswers.length);

            for (let j in studentAnswers){
              let studentAnswer = studentAnswers[j];
              solvedQuestionCount = solvedQuestionCount + 1;
              if (studentAnswer.isCorrect == true) { correctAnswerCount = correctAnswerCount + 1; }
            }

            studentBookTest.solvedQuestionCount = solvedQuestionCount;
            studentBookTest.correctAnswerCount = correctAnswerCount;
            studentBookTest.incorrectAnswerCount = solvedQuestionCount - correctAnswerCount;
            studentBookTest.blankAnswerCount = bookTest.questionCount - solvedQuestionCount;
            if (bookTest.questionCount != 0) { studentBookTest.completionPercentage = Math.floor(solvedQuestionCount/bookTest.questionCount * 100); }
            if (solvedQuestionCount != 0) { studentBookTest.testSuccessRate = Math.floor(correctAnswerCount/solvedQuestionCount * 100); }
            studentBookTest.date = bookTestTemp.date;
            studentBookTest.timeSpent = bookTestTemp.timeSpent;
          }

          studentBookTests.push(studentBookTest);
        }
        return {status: 'Success', message: 'Data has been fetched', content: studentBookTests};
      } else {
        return {status: 'Error', message: 'No Data has been fetched', content: {}};
      }
    },

    // --------------- STUDENT BOOK TEST ----------------
    studentBookTest: async (_, args, {token}) => {
      let studentBookTestAnswers = [];
      let studentBook = await StudentBook.findOne({studentId: args.studentId, bookId: args.bookId});
      let book = await Book.findOne({_id: args.bookId});
      let bookUnitSection = await BookSection.findOne({_id: args.bookUnitSectionId});
      let bookTest = await BookTest.findOne({_id: args.bookTestId});

      if (!!studentBook && !!book && !!bookUnitSection && !!bookTest) {
        // All answers in the selected bookTest
        let bookTestAnswers = await BookTestAnswer.find({bookTestId: args.bookTestId});
        console.log(bookTestAnswers.length);
        for (let i in bookTestAnswers) {
          let bookTestAnswer = bookTestAnswers[i];

          // Answer for user(student)'s review
          let studentBookTestAnswer = {};
          let studentBookTestAnswerPast = await StudentBookTestAnswer.findOne({bookTestAnswerId: bookTestAnswer._id});
          console.log(bookTestAnswer._id);
          console.log(!!studentBookTestAnswer);
          let bookCategory = await BookCategory.findById({_id: args.categoryId});
          
          studentBookTestAnswer.studentId = args.studentId;
          studentBookTestAnswer.questionBankName = bookCategory.category;
          studentBookTestAnswer.bookId = args.bookId;
          studentBookTestAnswer.bookUnitId = bookTest.bookUnitId;
          studentBookTestAnswer.bookUnitSectionId = bookUnitSection._id;
          studentBookTestAnswer.bookTestId = args.bookTestId;
          studentBookTestAnswer.bookTestAnswerId = bookTestAnswer._id;
          studentBookTestAnswer.questionNumber = bookTestAnswer.questionNumber;
          studentBookTestAnswer.isAnswered = false;
          studentBookTestAnswer.correctAnswer = bookTestAnswer.correctAnswer;
          studentBookTestAnswer.studentAnswer = "Unknown";
          studentBookTestAnswer.isCorrect = false;
          studentBookTestAnswer.date = "";
          studentBookTestAnswer.timeSpent = 0;
          studentBookTestAnswer.questionPhoto = "";
          studentBookTestAnswer.solutionPhoto = "";

          if (!!studentBookTestAnswerPast) {
            studentBookTestAnswer.isAnswered = true;
            studentBookTestAnswer.studentAnswer = studentBookTestAnswerPast.studentAnswer;
            studentBookTestAnswer.isCorrect = studentBookTestAnswerPast.isCorrect;
            studentBookTestAnswer.date = "";
            studentBookTestAnswer.timeSpent = studentBookTestAnswerPast.timeSpent;
            studentBookTestAnswer.questionPhoto = studentBookTestAnswerPast.questionPhoto;
            studentBookTestAnswer.solutionPhoto = studentBookTestAnswerPast.solutionPhoto;
          }

          studentBookTestAnswers.push(studentBookTestAnswer);
        }

        return {status: 'Success', message: 'Data has been fetched', content: studentBookTestAnswers};
      } else {
        return {status: 'Error', message: 'No Data has been fetched', content: {}};
      }
    },

    // BACKEND -> CHAPTER 5 
    studentBookUnits: async (_, args, {token}) => {
      let list = {};
      list.data = [];
      var d = new Date();

      let totalSuccessRate = 0;
      let totalSolvedQuestionCount = 0;
      let totalCorrectAnswerCount = 0;
      let totalIncorrectAnswerCount = 0;
      
      let studentBooks = await StudentBook.find({studentId: args.studentId});
      //console.log(studentBooks.length);
      for(let i in studentBooks){
        let studentBook = studentBooks[i];
        let books = await Book.find({_id: studentBook.bookId});
        for(let m in books){
          let book = books[m];
          let bookUnits = await BookUnit.find({bookId: book._id});
          for(let j in bookUnits){
            let bookUnitResponse = {};
            let bookUnit = bookUnits[j];
            let bookTests = await BookTest.find({bookUnitId: bookUnit._id});

            bookUnitResponse.bookId = book._id;
            bookUnitResponse.bookUnitId = bookUnit._id;
            bookUnitResponse.bookName = book.title;
            bookUnitResponse.lessonName = bookUnit.lesson;
            bookUnitResponse.courseSuccessRate = 0;

            let numberOfQuestions = 0;
            let solvedQuestionCount = 0;
            let correctAnswerCount = 0;
            let incorrectAnswerCount = 0;

            for(let k in bookTests){
              let bookTest = bookTests[k];

              let studenBookTest = await StudentBookTest.findOne({bookTestId: bookTest._id});
              let d_student = studenBookTest.date;
              let d_now = new Date();

              if (!studenBookTest){
                continue;
              }

              if (args.timeInterval == "Daily" && d_student.getTime() < d.getTime() - ( 24 * 60 * 60 * 1000)){
                continue;
              }

              if (args.timeInterval == "Weekly" && d_student.getTime() < d.getTime() - ( 7 * 24 * 60 * 60 * 1000)){
                continue;
              }

              if (args.timeInterval == "Monthly" && d_student.getTime() < d.getTime() - (30 * 24 * 60 * 60 * 1000)){
                continue;
              }

              let bookTestAnsers = await BookTestAnswer.find({bookTestId: bookTest._id});

              numberOfQuestions += bookTest.questionCount;
              

              for (let l in bookTestAnsers){
                let bookTestAnswer = bookTestAnsers[l];
                let studentBookTestAnswer = await StudentBookTestAnswer.find({bookTestAnswerId: bookTestAnswer._id});

                solvedQuestionCount += 1;
                if (studentBookTestAnswer.isCorrect){
                  correctAnswerCount += 1;
                } else {
                  incorrectAnswerCount += 1;
                }
              }
            }

            if(solvedQuestionCount != 0){
              bookUnitResponse.courseSuccessRate = Math.floor(correctAnswerCount / solvedQuestionCount * 100); 
            }

            bookUnitResponse.numberOfQuestions = numberOfQuestions;
            bookUnitResponse.solvedQuestionCount = solvedQuestionCount;
            bookUnitResponse.correctAnswerCount = correctAnswerCount;
            bookUnitResponse.incorrectAnswerCount = incorrectAnswerCount;
            list.data.push(bookUnitResponse);

            totalSolvedQuestionCount += solvedQuestionCount;
            totalCorrectAnswerCount += correctAnswerCount;
            totalIncorrectAnswerCount += incorrectAnswerCount;
          }
        }
        
      }

      list.totalSolvedQuestionCount = totalSolvedQuestionCount;
      list.totalCorrectAnswerCount = totalCorrectAnswerCount;
      list.totalIncorrectAnswerCount = totalIncorrectAnswerCount;
      list.topicSuccessRate = totalSuccessRate;
      if (totalSolvedQuestionCount != 0){
        list.totalSuccessRate = Math.floor(totalCorrectAnswerCount / totalSolvedQuestionCount * 100)
      }

      return {status: 'Success', message: 'Data has been fetched', content: list};
    },

    // ----------------- Incorrect Solved Questions in the selected course and topics. 5.1.1 (56p)
    studentAnswersInBookSectionUnit: async (_, args, {token}) => { 
      let list = [];
      let studentBooks = await StudentBook.find({studentId: args.studentId});
      for(let i in studentBooks){
        let studentBook = studentBooks[i];
        let books = await Book.find({_id: studentBook.bookId});
        for(let j in books){
          let book = books[j];
          let bookUnits = await BookUnit.find({bookId: book._id, lessonId: args.lessonId});
          for(let k in bookUnits){
            let bookUnit = bookUnits[k];
            let bookSections = await BookSection.find({unitId: bookUnit._id, topicId: args.topicId});
            for(let l in bookSections){
              let bookSection = bookSections[l];
              let bookTests = await BookTest.find({bookUnitSectionId: bookSection._id})
              for (let m in bookTests){
                let bookTest = bookTests[m];
                let studentBookTest = await StudentBookTest.findOne({bookTestId: bookTest._id});
                let student_d = studentBookTest.date;
                if(studentBookTest.date == null) {student_d = new Date();}
                let startTime = Date.parse(args.startTime);
                let endTime = Date.parse(args.endTime);
                if (student_d.getTime() > startTime && student_d.getTime() < endTime){
                  let studentBookTestAnswers = await StudentBookTestAnswer.find({studentBookTestId: studentBookTest._id});
                  for(let n in studentBookTestAnswers){
                    let studentAnswer = {};                    
                    let studentBookTestAnswer = studentBookTestAnswers[n];
                    if (!studentBookTestAnswer.isCorrect){
                      studentAnswer.questionPhoto = studentBookTestAnswer.questionPhoto;
                      studentAnswer.solutionPhoto = studentBookTestAnswer.solutionPhoto;
                      studentAnswer.timeSpent = studentBookTestAnswer.timeSpent;
                      studentAnswer.date = studentBookTestAnswer.date;
                    }
                    list.push(studentAnswer);
                  }                  
                }
              }
            }
          }
        }
      }

      return {status: 'Success', message: 'Data has been fetched', content: list};
    },

    //------------------ Tests in the Book Section Unit selected by Lesson and Topi. 5.1.2(59p)
    studentTestsInBookSectionUnit: async (_, args, {token}) => {
      let list = [];
      let studentBooks = await StudentBook.find({studentId: args.studentId});
      for(let i in studentBooks){
        let studentBook = studentBooks[i];
        let books = await Book.find({_id: studentBook.bookId});
        for(let j in books){
          let book = books[j];
          let bookUnits = await BookUnit.find({bookId: book._id, lessonId: args.lessonId});
          for(let k in bookUnits){
            let bookUnit = bookUnits[k];
            let bookSections = await BookSection.find({unitId: bookUnit._id, topicId: args.topicId});
            for(let l in bookSections){
              let bookSection = bookSections[l];
              let studentBookSection = {};
              studentBookSection.tests = [];
              let totalSuccessRate = 0;
              let totalSolvedQuestionCount = 0;
              let totalCorrectAnswerCount = 0;
              let totalIncorrectAnswerCount = 0;
              let totalQuestionCount = 0;
              let bookTests = await BookTest.find({bookUnitSectionId: bookSection._id})
              for (let m in bookTests){
                let bookTest = bookTests[m];

                let studentTest = {};
                studentTest.answers = [];
                let questionCount = 0;
                let solvedQuestionCount = 0;
                let correctAnswerCount = 0;
                let incorrectAnswerCount = 0;
                let blankAnswerCount = 0;

                questionCount = bookTest.questionCount;
                totalQuestionCount += bookTest.questionCount;
                let studentBookTest = await StudentBookTest.findOne({bookTestId: bookTest._id});            
                let studentBookTestAnswers = await StudentBookTestAnswer.find({studentBookTestId: studentBookTest._id});
                for(let n in studentBookTestAnswers){
                  let studentBookTestAnswer = studentBookTestAnswers[n];
                  solvedQuestionCount += 1;
                  totalSolvedQuestionCount += 1;
                  let studentAnswer = {};                          
                  if (studentBookTestAnswer.isCorrect){
                    correctAnswerCount += 1;
                    totalCorrectAnswerCount += 1;
                  }
                  studentAnswer.questionPhoto = studentBookTestAnswer.questionPhoto;
                  studentAnswer.solutionPhoto = studentBookTestAnswer.solutionPhoto;
                  studentAnswer.timeSpent = studentBookTestAnswer.timeSpent;
                  studentAnswer.date = studentBookTestAnswer.date;   
                  studentTest.answers.push(studentAnswer);
                }                  
                studentTest.questionCount = questionCount;
                studentTest.correctAnswerCount = correctAnswerCount;
                studentTest.incorrectAnswerCount = solvedQuestionCount - correctAnswerCount;
                studentTest.blankAnswerCount = questionCount - solvedQuestionCount;
                if (solvedQuestionCount == 0){
                  studentTest.successRate = 0;
                } else {
                  studentTest.successRate = Math.floor(correctAnswerCount / solvedQuestionCount * 100);
                }
                studentBookSection.tests.push(studentTest);
              }
              studentBookSection.questionCount = totalQuestionCount;
              studentBookSection.solvedQuestionCount = totalSolvedQuestionCount;
              studentBookSection.correctAnswerCount = totalSolvedQuestionCount;
              studentBookSection.incorrectAnswerCount = totalSolvedQuestionCount - totalSolvedQuestionCount;
              if (totalSolvedQuestionCount == 0){
                studentBookSection.successRate = 0;
              } else {
                studentBookSection.successRate = Math.floor(totalCorrectAnswerCount / totalSolvedQuestionCount * 100);
              }
              list.push(studentBookSection);
            }
          }
        }
      }

      return {status: 'Success', message: 'Data has been fetched', content: list};
    },
    
    // BACKEND -> CHAPTER6
    //-------------- HOMEWORK BOOKS IN QUESTION BANKBOOK----------
    questionBankHomework: async (_, args, {token}) => {
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
        let book = await Book.find({_id: homework.questionBankBook});
        studentHomework.image = book.image;
        let bookUnit = await BookUnit.find({_id: homework.bookUnit});
        studentHomework.lesson = bookUnit.lessonId;
        studentHomework.isAllTestesd = true;
        let bookSections = homework.sections; if(!homework.sections) {bookSections = [];}
        let questionCount = 0;
        for (let j in bookSections){
          let bookSection = bookSections[j];
          bookTests = await BookTest.find({bookUnitSectionId: bookSection._id});
          for (let k in bookTests){
            let bookTest = bookTests[k];
            if (!homework.tests.include(bookTest._id)) { continue; }
            questionCount += bookTest.questionCount;
            let studentBookTest = await StudentBookTest.find({bookTestId: bookTest._id});
            if(!studentBookTest) {studentHomework.isAllTestesd = false;}
          }
        }
        list.push(studentHomework);
      }
      return {status: 'Success', message: 'Data has been fetched', content: list};
    },

    // BACKEND -> CHAPTER 3
    // ------------- QUESTION BANK HOME ---------------------------
    questionBankHome: async (_, args, {token}) => {
      let list = {};
      let studentBookTests = [];
      let query = null;
      if(args.topicId == null || args.topicId == ""){
        studentBookTests = await StudentBookTest.find({studentId: args.studentId, lessonId: args.lessonId});
        query = { 
          "studentId": args.studentId,
          "examId": args.examId
        }
      } else {
        studentBookTests = await StudentBookTest.find({studentId: args.studentId, lessonId: args.lessonId, topicId: {$in: [args.topicId]}});
        query = { 
          "studentId": args.studentId,
          "examId": args.examId,
          "lessonId": args.lessonId
        }
      }
      //console.log(query);
      let questions = {}
      let questionCount = 0;
      let solvedQuestionCount = 0;
      let correctAnswerCount = 0;
      let incorrectAnswerCount = 0;
      for(let i in studentBookTests){
        let studentBookTest = studentBookTests[i];
        questionCount += studentBookTest.questionCount;
        solvedQuestionCount += studentBookTest.solvedQuestionCount;
        correctAnswerCount += studentBookTest.correctAnswerCount;
        incorrectAnswerCount += studentBookTest.incorrectAnswerCount;
      }
      questions.questionCount = questionCount;
      questions.solvedQuestionCount = solvedQuestionCount;
      questions.correctAnswerCount = correctAnswerCount;
      questions.incorrectAnswerCount = incorrectAnswerCount;
      
      if (solvedQuestionCount == 0){
        questions.successRate = 0;
      } else {
        questions.successRate = Math.floor(correctAnswerCount / solvedQuestionCount * 100);
      }
      list.studentQuestions = {};
      let returnedTarget = Object.assign(list.studentQuestions, questions);
      //console.log(questions);

      let topicTimeSpent = await StudentBookTest.aggregate([
        { 
          $match: query
        },
        {
          $group: { 
            _id: "$topicId",
            totalTimeSpent: { $sum: "timeSpent" }
           }
        },
        {
          $sort: { totalTimeSpent: 1 }
        }
      ]);
      let tenTopicTimeSpent = topicTimeSpent.slice(0, 10);
      list.tenTopicTimeSpent = [];
      list.tenTopicTimeSpent = tenTopicTimeSpent;
      //console.log(tenTopicTimeSpent);

      let topicIncorrectAnswer = await StudentBookTest.aggregate([
        {
          $match: query
        },
        {
          $group: {
            _id: "$topicId",
            totalIncorrectAnswerCount: { $sum: "incorrectAnswerCount" }
          }
        },
        {
          $sort: { totalIncorrectAnswerCount: -1 }
        }
      ]);
      let tenTopicIncorrectAnswer = topicIncorrectAnswer.slice(0, 10);
      list.tenTopicIncorrectAnswer = [];
      list.tenTopicIncorrectAnswer = tenTopicIncorrectAnswer;
      //console.log(tenTopicIncorrectAnswer);

      let topicCorrectAnswer = await StudentBookTest.aggregate([
        {
          $match: query
        },
        {
          $group: {
            _id: "$topicId",
            totalCorrectAnswerCount: { $sum: "correctAnswerCount" }
          }
        },
        {
          $sort: { totalCorrectAnswerCount: 1 }
        }
      ]);
      let fiveTopicCorrectAnswer = topicCorrectAnswer.slice(0, 10);
      list.fiveTopicCorrectAnswer = [];
      list.fiveTopicCorrectAnswer = fiveTopicCorrectAnswer;
      //console.log(fiveTopicCorrectAnswer);
          
      list.data = [];
      let dataAnalysis = [];
      if (args.timeInterval == "General"){
        dataAnalysis = await StudentBookTest.aggregate([          
          {
            $project: {
              _id: 1,
              studentId: 1,
              bookId: 1,
              bookUnitId: 1,
              bookUnitSectionId: 1,
              bookTestId: 1,
              lessonId: 1,
              topicId: 1,
              testName: 1,
              questionCount: 1,
              date: 1,  
              timeSpent: 1,
              solvedQuestionCount: 1,
              correctAnswerCount: 1,
              incorrectAnswerCount: 1,
              blankAnswerCount: 1,
              week: { $week: "$date"}
            }
          },
          {
            $match: query
          },
          {
            $group: {
              _id: "$week",
              totalCorrectAnswerCount: { $sum: "correctAnswerCount" },
              totalSolvedQuestionCount: { $sum: "solvedQuestionCount" }
            }
          },
          {
            $sort: { totalCorrectAnswerCount: 1 }
          }
        ]);
      } else if (args.timeInterval == "Today"){
        let dd = new Date();
        let y = dd.getFullYear(); let m = dd.getMonth(); let d = dd.getDate();
        let result = Object.assign(query, {year: y, month: m, day: d});
        //console.log(query);
        dataAnalysis = await StudentBookTest.aggregate([          
          {
            $project: {
              _id: 1,
              studentId: 1,
              bookId: 1,
              bookUnitId: 1,
              bookUnitSectionId: 1,
              bookTestId: 1,
              lessonId: 1,
              topicId: 1,
              testName: 1,
              questionCount: 1,
              date: 1,  
              timeSpent: 1,
              solvedQuestionCount: 1,
              correctAnswerCount: 1,
              incorrectAnswerCount: 1,
              blankAnswerCount: 1,
              year: { $year: "$date" },
              month: { $month: "$date" },
              day: { $dayOfMonth: "$date" },
              hour: { $hour: "$date" },
            }
          },
          {
            $match: query
          },
          {
            $group: {
              _id: "$hour",
              totalCorrectAnswerCount: { $sum: "correctAnswerCount" },
              totalSolvedQuestionCount: { $sum: "solvedQuestionCount" }
            }
          },
          {
            $sort: { totalCorrectAnswerCount: 1 }
          }
        ]);
      } else if (args.timeInterval == "Week"){
        // let curr = new Date; 
        // let first = curr.getDate() - curr.getDay();
        // let last = first + 6;

        // let firstday = new Date(curr.setDate(first)).toUTCString();
        // let lastday = new Date(curr.setDate(last)).toUTCString();

        let dd = new Date();
        var day = dd.getDay();
        let a = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate() - day );
        let b = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate() - day + 6);
        
        let result = Object.assign(query, {"date": {$gte: a, $lt: b }});
        //console.log(query);
        dataAnalysis = await StudentBookTest.aggregate([          
          {
            $project: {
              _id: 1,
              studentId: 1,
              bookId: 1,
              bookUnitId: 1,
              bookUnitSectionId: 1,
              bookTestId: 1,
              lessonId: 1,
              topicId: 1,
              testName: 1,
              questionCount: 1,
              date: 1,  
              timeSpent: 1,
              solvedQuestionCount: 1,
              correctAnswerCount: 1,
              incorrectAnswerCount: 1,
              blankAnswerCount: 1,
              year: { $year: "$date" },
              month: { $month: "$date" },
              dayOfWeek: { $dayOfWeek: "$date" }              
            }
          },
          {
            $match: query
          },
          {
            $group: {
              _id: "$dayOfWeek",
              totalCorrectAnswerCount: { $sum: "correctAnswerCount" },
              totalSolvedQuestionCount: { $sum: "solvedQuestionCount" }
            }
          },
          {
            $sort: { totalCorrectAnswerCount: 1 }
          }
        ]);
      }
      list.data = dataAnalysis;
      //console.log(dataAnalysis);

      return {status: 'Success', message: 'Data has been fetched', content: list};
    }



    
    
  },

  Mutation: {
    // -----   B O O K   -----
    addBook: async (_, args, { token }) => {
      const book = { 
        _id: new mongoose.mongo.ObjectId(),
        title: args.title,
        examId: args.examId || "",
        categoryId: args.categoryId || "",
        publisherId: args.publisherId || "",
        publishYear: args.publishYear || new Date().getFullYear(),
        isbn: args.isbn || "",
        level : args.level ? args.level : 1,
        showToUsers: args.showToUsers == true || args.showToUsers == false ?  args.showToUsers  : false,
        image: args.image || "",
      };

      const created = await Book.create(book);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created}; }
      else { return {status: 'Error', message: 'Failed to add data', content: {}}; }
    },
    updateBook: async (_, args, { token }) => {
      let updateData = await Book.findOne({_id: args._id});
      if (!updateData) {return {status: 'Error', message: 'No data found', content: {}};}
      // patch data to update
      const fields = ['examId', 'title', 'categoryId', 'publisherId', 'publishYear', 'isbn', 'level', 'showToUsers', 'image'];
      updateData = Utils.patchOriginFromRequest(updateData, args, fields);

      const updated = await Book.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteBook: async (_, args, { token }) => {
      try {
        const deleted = await Book.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data deleted successfully', content: deleted};
      } catch (e) {
        return {status: 'Error', message: 'Something went wrong', content: {}};
      }
    },
    addBookCategory: async (_,args, {token}) => {
      let cat = {
        title: args.title,
        exam: args.exam,
        category : args.category
      };
      const isDublicate = await BookCategory.findOne(cat);
      if (isDublicate) {
        return {status : 'Error', message: 'Entry cannot be added', content: {errorDetails: "Duplicated entry"}};
      } else {
        cat._id = new mongoose.mongo.ObjectId();
        const addedCategory = await BookCategory.create(cat);
        if (addedCategory) {
          return {status : 'Success', message: 'Entry has been added', content: addedCategory};
        }
        return {status : 'Error', message: 'Entry cannot be added', content: {errorDetails: "Unable to add the entry to the database"}};
      }
    },
    updateBookCategory: async (_,args, {token}) => {
      let cat = {};
      const existingCategory = await BookCategory.findById(args._id);
        cat._id = args._id
        cat.title= args.title ? args.title : existingCategory.title;
        cat.exam= args.exam ? args.exam : existingCategory.exam;
        cat.category = args.category ? args.category : existingCategory.category;
        const addedCategory = await BookCategory.findByIdAndUpdate(args._id ,{ $set : cat});
        if (addedCategory) {
          return {status : 'Success', message: 'Entry has been Updated', content: cat};
        }
        return {status : 'Error', message: 'Entry cannot be added', content: {errorDetails: "Unable to add the entry to the database"}};
    },

    deleteBookCategory: async (_,args, {token}) => {
      if (args._id) {
        const addedCategory = await BookCategory.findByIdAndDelete(args._id);
        if (addedCategory) {
          return {status : 'Success', message: 'Entry has been Deleted', content: {message: 'Entry has been Deleted'}};
        }
      }
      return {status : 'Error', message: 'Entry cannot be added', content: {errorDetails: "Unable to add the entry to the database"}};
    },

    // -----   B O O K   T E S T   -----
    addBookTest: async (_, args, { token }) => {
      const bookTest = {
        _id: new mongoose.mongo.ObjectId(),
        bookId: args.bookId,
        bookUnitId: args.bookUnitId,
        bookUnitSectionId: args.bookUnitSectionId,
        testName: args.testName,
        questionCount: args.questionCount
      };
      const created = await BookTest.create(bookTest);
      if (!!created) {return {status:'Success', message: 'Data has been created', content: created}}
      else {return {status:'Error', message: 'Failed to add data', content: {}};}
    },
    updateBookTest: async (_, args, { token }) => {
      let updateData = await BookTest.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}};}

      // patch data for update
      const fields = ['bookId','bookUnitId', 'bookUnitSectionId', 'testName', 'questionCount'];
      updateData = Utils.patchOriginFromRequest(updateData, args, fields);

      const updated = await BookTest.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteBookTest: async(_, args, {token}) => {
      try {
        const deleted = await BookTest.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted successfully', content: deleted}
      } catch (e) {return {status: 'Error', message: 'Something went wrong', content: {}}}
    },

    // -----   B O O K   T E S T   A N S W E R   -----
    addBookTestAnswer: async (_, args, { token }) => {
      const duplicated = await Utils.bookTestAnswer.checkDuplicated({bookTestId: args.bookTestId, subTopicId: args.subTopicId, questionNumber: args.questionNumber});
      if (!!duplicated) { return {status: 'Error', message: 'Duplicated data', content: {}};}

      const bookTestAnswer = {
        _id: new mongoose.mongo.ObjectId(),
        bookTestId: args.bookTestId,
        subTopicId: args.subTopicId,
        questionNumber: args.questionNumber,
        correctAnswer: args.correctAnswer || 'Unknown',
      };
      const created = await BookTestAnswer.create(bookTestAnswer);
      if (!!created) {return {status:'Success', message: 'Data has been created', content: created}}
      else {return {status:'Error', message: 'Failed to add data', content: {}};}
    },
    updateBookTestAnswer: async (_, args, { token }) => {
      let updateData = await BookTestAnswer.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}};}

      // check duplicated
      if (!!args.bookTestId || !!args.subTopicId || !!args.questionNumber) {
        const exists = await BookTestAnswer.findOne({
          bookTestId: args.bookTestId || updateData.bookTestId,
          subTopicId: args.subTopicId || updateData.subTopicId,
          questionNumber: args.questionNumber || updateData.questionNumber,
          _id: {$ne: args._id}});
        if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: {}};}
      }

      // patch data for update
      const fields = ['bookTestId', 'subTopicId', 'questionNumber', 'correctAnswer'];
      updateData = Utils.patchOriginFromRequest(updateData, args, fields);

      const updated = await BookTestAnswer.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteBookTestAnswer: async(_, args, {token}) => {
      try {
        const deleted = await BookTestAnswer.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted successfully', content: deleted}
      } catch (e) {return {status: 'Error', message: 'Something went wrong', content: {}}}
    },

    // -----   B O O K   U N I T   -----
    addBookUnit: async (_, args, { token }) => {
      const bookUnit = {
        _id: new mongoose.mongo.ObjectId(),
        title: args.title,
        bookId: args.bookId || "",
        lessonId: args.lessonId || "",
      };
      const created = await BookUnit.create(bookUnit);
      if (!!created) {return {status:'Success', message: 'Data has been created', content: created}}
      else {return {status:'Error', message: 'Failed to add data', content: {}};}
    },
    updateBookUnit: async (_, args, { token }) => {
      let updateData = await BookUnit.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}};}

      // patch data for update
      const fields = ['bookId', 'lessonId', 'title'];
      updateData = Utils.patchOriginFromRequest(updateData, args, fields);

      const updated = await BookUnit.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false });
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated};}
      else {return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteBookUnit: async(_, args, {token}) => {
      try {
        const deleted = await BookUnit.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted successfully', content: deleted}
      } catch (e) {return {status: 'Error', message: 'Something went wrong', content: {}}}
    },

    // -----   B O O K   U N I T    P A R T   -----
    addBookUnitPart: async (_, args, { token }) => {
      const bookUnitPart = {
        _id: new mongoose.mongo.ObjectId(),
        title: args.title,
        bookUnitId: args.bookUnitId || ""
      };
      const created = await BookUnitPart.create(bookUnitPart);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created}}
      else { return {status: 'Error', message: 'Failed to add data', content: {}};}
    },
    updateBookUnitPart: async (_, args, { token }) => {
      // check if data exists
      let updateData = await BookUnitPart.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}};}

      // check duplicated
      if (!!args.title) {
        const exists = await BookUnitPart.findOne({title: args.title, _id: {$ne: args._id}});
        if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: {}};}
      }

      const fields = ['bookUnitId', 'title'];
      updateData = Utils.patchOriginFromRequest(updateData, args, fields);
      const updated = await BookUnitPart.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false});
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated}}
      else { return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteBookUnitPart: async (_, args, { token }) => {
      try {
        const deleted = await BookUnitPart.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted', content: deleted};
      } catch (e) {return {status: 'Error', message: 'Failed to delete data', content: {}}}
    },

    // -----   B O O K   U N I T    S U B T O P I C   -----
    addBookUnitSubTopic: async (_, args, { token }) => {
      const duplicated = await Utils.bookUnitSubTopic.checkDuplicated({bookUnitPartId: args.bookUnitPartId, subTopicId: args.subTopicId});
      if (!!duplicated) { return {status: 'Error', message: 'Duplicated data', content: {}};}

      const bookUnitSubTopic = {
        _id: new mongoose.mongo.ObjectId(),
        subTopicId: args.subTopicId,
        bookUnitPartId: args.bookUnitPartId || ""
      };
      const created = await BookUnitSubTopic.create(bookUnitSubTopic);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created}}
      else { return {status: 'Error', message: 'Failed to add data', content: {}};}
    },
    updateBookUnitSubTopic: async (_, args, { token }) => {
      // check if data exists
      let updateData = await BookUnitSubTopic.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}};}

      // check duplicated
      if (!!args.bookUnitPartId || !!args.subTopicId) {
        const exists = await BookUnitSubTopic.findOne({subTopicId: args.subTopicId || updateData.subTopicId, bookUnitPartId: args.bookUnitPartId || updateData.bookUnitPartId , _id: {$ne: args._id}});
        if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: {}};}
      }

      const fields = ['bookUnitPartId', 'subTopicId'];
      updateData = Utils.patchOriginFromRequest(updateData, args, fields);
      const updated = await BookUnitSubTopic.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false});
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated}}
      else { return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteBookUnitSubTopic: async (_, args, { token }) => {
      try {
        const deleted = await BookUnitSubTopic.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted', content: deleted};
      } catch (e) {return {status: 'Error', message: 'Failed to delete data', content: {}}}
    },

    // -----   B O O K   U N I T    T O P I C   -----
    addBookUnitTopic: async (_, args, { token }) => {
      const duplicated = await Utils.bookUnitTopic.checkDuplicated({bookUnitPartId: args.bookUnitPartId, topicId: args.topicId});
      if (!!duplicated) { return {status: 'Error', message: 'Duplicated data', content: {}};}

      const bookUnitTopic = {
        _id: new mongoose.mongo.ObjectId(),
        topicId: args.topicId,
        bookUnitPartId: args.bookUnitPartId || ""
      };
      const created = await BookUnitTopic.create(bookUnitTopic);
      if (!!created) { return {status: 'Success', message: 'Data has been added successfully', content: created}}
      else { return {status: 'Error', message: 'Failed to add data', content: {}};}
    },
    updateBookUnitTopic: async (_, args, { token }) => {
      // check if data exists
      let updateData = await BookUnitTopic.findOne({_id: args._id});
      if (!updateData) { return {status: 'Error', message: 'No data found', content: {}};}

      // check duplicated
      if (!!args.bookUnitPartId || !!args.topicId) {
        const exists = await BookUnitTopic.findOne({topicId: args.topicId || updateData.topicId, bookUnitPartId: args.bookUnitPartId || updateData.bookUnitPartId , _id: {$ne: args._id}});
        if (!!exists) { return {status: 'Error', message: 'Duplicated data', content: {}};}
      }

      const fields = ['bookUnitPartId', 'topicId'];
      updateData = Utils.patchOriginFromRequest(updateData, args, fields);
      const updated = await BookUnitTopic.findOneAndUpdate({_id: args._id}, updateData, { returnOriginal: false});
      if (!!updated) {return {status: 'Success', message: 'Data has been updated successfully', content: updated}}
      else { return {status: 'Error', message: 'Failed to update data', content: {}};}
    },
    deleteBookUnitTopic: async (_, args, { token }) => {
      try {
        const deleted = await BookUnitTopic.deleteOne({_id: args._id});
        return {status: 'Success', message: 'Data has been deleted', content: deleted};
      } catch (e) {return {status: 'Error', message: 'Failed to delete data', content: {}}}
    },

    //-------- Q U E S T I O N ------------
    addQuestion: async (_, args, {token}) => {
      let question = {
        _id : new mongoose.mongo.ObjectId(),
        lesson: args.lesson,
        topic: args.topic,
        subtopic: args.subtopic,
        title: args.title,
        questionPhoto: args.questionPhoto,
        solutionPhoto: args.solutionPhoto
      }
      const questionCreated = await Question.create(question);
      if (questionCreated) {
        return {status: 'Success', message: 'Data has been added', content: questionCreated};
      } else {
        return {status: 'Success', message: 'Data cannot be added', content: {"errorDetails" : "create failed"}};
      }
    },

    updateQuestion : async (_, args, {token}) => {
      const question = await Question.findById(args._id);
      question.lesson = args.lesson ? args.lesson : question.lesson;
      question.topic = args.topic ? args.topic : question.topic;
      question.subtopic = args.subtopic ? args.subtopic : question.subtopic;
      question.title = args.title ? args.title : question.title;
      question.questionPhoto = args.questionPhoto? args.questionPhoto : question.questionPhoto;
      question.solutionPhoto = args.solutionPhoto? args.solutionPhoto : question.solutionPhoto;
      const isUpdated = Question.findByIdAndUpdate(args._id, {$set : question} , {returnOriginal : false});
      if (isUpdated) {
        return {status: 'Success', message: 'Data has been added', content: isUpdated};
      } else {
        return {status: 'Success', message: 'Data cannot be added', content: {"errorDetails" : "create failed"}};
      }
    },

    deleteQuestion : async (_, args, {token}) => {
      const isDeleted = await Question.findByIdAndDelete(args._id);
      if (isDeleted) {
        return {status: 'Success', message: 'Data has been added', content: isDeleted};
      } else {
        return {status: 'Success', message: 'Data cannot be added', content: {"errorDetails" : "create failed"}};
      }
    },

    //------- BOOK SECTION -------------
    addBookSection: async(_, args, {token}) => {
      let bookSection = {
        title: args.title,
        bookId: args.bookId,
        unitId: args.unitId,
        topicId: args.topicId
      }
      bookSection._id = new mongoose.mongo.ObjectId();
      const isCreated = await BookSection.create(bookSection);
      if (isCreated) {
        return {status: "Success", message: "The Data has been successfully added", content: isCreated};
      }
      return {status: "Error", message: "Could Not Create an Entry", content: {errorDetails: "failed to add Entry in the database"}};
    },

    updateBookSection: async(_, args, {token}) => {
      const booksection = await BookSection.findById(args._id);
      if (booksection) {
        booksection.title = args.title ? args.title : booksection.title;
        booksection.bookId = args.bookId ? args.bookId : booksection.bookId;
        booksection.unitId = args.unitId ? args.unitId : booksection.unitId;
        booksection.topicId = args.topicId ? args.topicId : booksection.topicId;
      }
      const isUpdated = await BookSection.findByIdAndUpdate(args._id, {$set : booksection}, {returnOriginal: false});
      if (isUpdated) {return  {status: "Success", message: "The Data has been Updated", content: isUpdated}}
      return  {status: "Error", message: "Something Went Wrong", content: {}} ;
    },
    deleteBookSection: async(_, args, {token}) => {
      if (args._id) {
        const isDeleted = await BookSection.findByIdAndDelete(args._id);
        if (isDeleted) {return  {status: "Success", message: "The Data has been Deleted", content: isDeleted}}
      return  {status: "Error", message: "Something Went Wrong", content: {}} ;
      }
    },

    // ----------- STUDENT BOOK ------------
    addStudentBook: async(_, args, {token}) => {
      let studentBook = {
        studentId: args.studentId,
        bookId: args.bookId
      }
      let isDublicate = await StudentBook.findOne(studentBook);
      if (!!isDublicate) {
        return {status: 'Error', message: 'Entry cannot be added', content: {Details: "Dupicate entry"}};
      } else {
        studentBook._id = new mongoose.mongo.ObjectId();
        const isCreated = await StudentBook.create(studentBook);
        if (isCreated) {
          return {status: "Success", message: "The Data has been successfully added", content: isCreated};
        } else {
          return {status: "Error", message: "Could Not Create an Entry", content: {errorDetails: "failed to add Entry in the database"}};
        }
      }
    },
    deleteStudentBook: async(_, args, {token}) => {
      if (args.studentId && args.bookId) {
        const isDeleted = await StudentBook.findOneAndDelete({studentId: args.studentId, bookId: args.bookId});
        if (isDeleted) {return  {status: "Success", message: "The Data has been Deleted", content: isDeleted}}
      return  {status: "Error", message: "Something Went Wrong", content: {}} ;
      }
    },

    // ----------- STUDENT BOOK TEST ------------
    // it is called when a student confirmed the end of his Question Bank Book Test
    addStudentBookTest: async(_, args, {token}) =>{
      let bookTest = await BookTest.findById(args.bookTestId);
      console.log("bookTest: " + !!bookTest);
      
      let studentBookTest = {
        studentId: args.studentId,
        bookId: args.bookId,
        bookUnitId: args.bookUnitId,
        bookUniSectionId: args.bookUnitSectionId,
        bookTestId: args.bookTestId,
        testName: bookTest.testName,
        questionCount: bookTest.questionCount,
        date: new Date(),
        timeSpent: args.timeSpent,
        examId: args.examId,
        lessonId: args.lessonId,
        topicId: args.topicId
      }
      console.log("bookTestId: " + args.bookTestId);

      let isDublicate = await StudentBookTest.findOne({bookTestId: args.bookTestId});
      if (!!isDublicate) {
        return {status: 'Error', message: 'Entry cannot be added', content: {Details: "Dupicate entry"}};
      } else {
        studentBookTest._id = new mongoose.mongo.ObjectId();
        const isCreated = await StudentBookTest.create(studentBookTest);
        console.log("studentBookTest isCreated: " + !!isCreated);
        if (isCreated) {
          let questionCount = bookTest.questionCount;
          console.log(questionCount);
          let solvedQuestionCount = 0;
          let correctAnswerCount = 0;
          let incorrectAnswerCount = 0;
          let blankAnswerCount = 0;

          for (let i = 0; i < questionCount; i++) {
            let where = {};
            where.studentId = args.studentId;
            where.bookTestId = args.bookTestId;
            where.studentBookTestId = studentBookTest._id;
            where.studentAnswer = args.studentAnswers[i];

            let bookTestAnswer = {};
            bookTestAnswer = await BookTestAnswer.findOne({bookTestId: args.bookTestId, questionNumber: i + 1})
            console.log("questionNumber: " + (i + 1));

            let isCorrect = false;
            if (args.studentAnswers[i] == "" || args.studentAnswers[i] == null){
              blankAnswerCount += 1;
            } else {
              solvedQuestionCount += 1;
              if (args.studentAnswers[i] == bookTestAnswer.correctAnswer) { 
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

            let isDublicate1 = await StudentBookTestAnswer.findOne(where);
            if (isDublicate1) {
              continue;
            } else {
              where._id = new mongoose.mongo.ObjectId();
              const isCreated1 = await StudentBookTestAnswer.create(where);
            }
          }
          let filter = {_id: isCreated._id};
          console.log(isCreated);
          console.log(filter);
          let update = {
            solvedQuestionCount: solvedQuestionCount,
            correctAnswerCount: correctAnswerCount,
            incorrectAnswerCount: incorrectAnswerCount,
            blankAnswerCount: blankAnswerCount
          }
          const isUpdated = await StudentBookTest.findOneAndUpdate(filter, update, {returnOriginal: false});
          console.log(isUpdated);

          return {status: "Success", message: "The Data has been successfully added", content: isCreated};
        } else {
          return {status: "Error", message: "Could Not Create an Entry", content: {errorDetails: "failed to add Entry in the database"}};
        }
      }
    },

    // ----------- ADD PHOTO OF QUESTION WHICH IS TESTED BY THE STUDENT BEFORE ---------
    addStudentBookTestAnswerQuestionPhoto: async(_, args, {token}) => {
      let studentBookTestAnswer = await StudentBookTestAnswer.findOne({studentId: args.studentId, bookTestAnswerId: args.bookTestAnswerId});
      if (!!studentBookTestAnswer) {
        studentBookTestAnswer.questionPhoto = args.data;
        const isUpdated = await StudentBookTestAnswer.findOneAndUpdate({bookTestAnswerId: args.bookTestAnswerId}, {$set : studentBookTestAnswer}, {returnOriginal: false});
        console.log(isUpdated);
        if (isUpdated) {return  {status: "Success", message: "The Data has been Updated", content: isUpdated}}
        return  {status: "Error", message: "Something Went Wrong", content: {}} ; 
      } else {
        return {status: "Failed", message: "The Data has not been successfully added", content: !!studentBookTestAnswer};
      }
    },

    // ----------- ADD PHOTO OF SOLUTION WHICH IS TESTED BY THE STUDENT BEFORE ---------
    addStudentBookTestAnswerSolutionPhoto: async(_, args, {token}) => {
      let studentBookTestAnswer = await StudentBookTestAnswer.findOne({studentId: args.studentId, bookTestAnswerId: args.bookTestAnswerId});
      if (!!studentBookTestAnswer) {
        studentBookTestAnswer.solutionPhoto = args.data;
        const isUpdated = await StudentBookTestAnswer.findOneAndUpdate({bookTestAnswerId: args.bookTestAnswerId}, {$set : studentBookTestAnswer}, {returnOriginal: false});
        console.log(isUpdated);
        if (isUpdated) {return  {status: "Success", message: "The Data has been Updated", content: isUpdated}}
        return  {status: "Error", message: "Something Went Wrong", content: {}} ; 
      } else {
        return {status: "Failed", message: "The Data has not been successfully added", content: !!studentBookTestAnswer};
      }
    },

    





  }
};
