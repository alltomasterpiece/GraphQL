const { gql } = require('apollo-server');
module.exports = gql`
    
    scalar JSON
    enum CORRECT_ANSWER { Unknown A B C D E}
    enum CATEGORY { questionbank ExamSet }
    enum TIME_INTERVAL { General, Daily, Weekly, Monthly}
    enum TIME_INTERVAL_WEEK {Past, CurrentWeek, Upcoming}
    enum TIME_INTERVAL_3 { General, Today, Week }

    type Book @key(fields: "_id") {
        _id: String
        examId: [String]
        categoryId: String
        title: String
        publisherId: String
        publishYear: Int
        isbn: String
        level: Int
        showToUsers: Boolean
        image: String
        students: [String]
    }

    type BookCategory {
        _id: String,
        title: String
        exam: String
        category: String
    }

    type BookTest @key (fields: "_id") {
        _id: String
        bookId: String
        bookUnitId: String
        bookUnitSectionId: String
        testName: String
        questionCount: Int
    }

    type BookTestAnswer @key(fields: "_id") {
        _id: String
        bookTestId: String
        subTopicId: String
        questionNumber: Int
        correctAnswer: CORRECT_ANSWER
    }

    type BookUnit @key(fields: "_id") {
        _id: String
        bookId: String
        lessonId: String
        title: [String]
    }

    type BookUnitPart @key(fields: "_id") {
        _id: String
        bookUnitId: String,
        title: String,
    }

    type BookUnitSubTopic @key(fields: "_id") {
        _id: String
        bookUnitPartId: String,
        subTopicId: String,
    }

    type BookUnitTopic @key (fields: "_id") {
        _id: String
        bookUnitPartId: String
        topicId: String
    }

    type Question {
        _id: String
        lesson: String
        topic: [String]
        subtopic: [String]
        title: String
        questionPhoto: String
        solutionPhoto: String
    }

    type BookSection {
        _id: String,
        bookId: String,
        unitId: String,
        topicId: [String],
        title: [String]
    }

    #--------- Backend --------
    type studentBook {                                       #  Question Bank -> Book
        _id: String,
        studentId: String,
        questionBankName: String,
        bookId: String,
        title: String,
        image: String,
        testCount: Int,
        questionCount: Int,
        completionPercentage: Int,
        solvedQuestionCount: Int,
        correctAnswerCount: Int,
        incorrectAnswerCount: Int,
        bookSuccessRate: Int,
        isSelectedByStudent: Boolean
        practiceExamRanking: Int
        numOfStudent: Int
    }

    type studentBookSection {                               #  Question Bank -> Book -> Book Unit -> Book Section Unit
        _id: String,                                        #  one to one relationship with topic
        studentId: String,
        bookId: String,
        bookUnitId: String,
        bookName: String,
        topicName: String,
        testCount: Int,
        solvedTestCount: Int,
        solvedQuestionCount: Int,
        correctAnswerCount: Int,
        incorrectAnswerCount: Int,
        topicSuccessRate: Int,
        completionPercentage: Int
    }

    type studentBookTest {                                   # Question Bank -> Book -> Book Unit -> Book Section Unit -> Test
        _id: String,
        studentId: String,
        bookTestId: String,
        bookId: String,
        bookUnitId: String,
        bookUnitSectionId: String,
        testName: String,
        questionCount: Int,
        date: String,
        timeSpent: String
    }

    type studentBookTestAnswer {                            # A student's answer for a Qusestion(NOT A TEST) of Test of ... of Book
        _id: String,
        studentId: String,
        questionBankName: String,
        bookId: String,
        bookUnitId: String,
        bookUnitSectionId: String,
        bookTestId: String,
        bookTestAnswerId: String,
        questionNumber: Int,
        isAnswered: Boolean,
        correctAnswer: CORRECT_ANSWER,
        studentAnswer: CORRECT_ANSWER,
        isCorrect: Boolean,
        date: String,
        timeSpent: Int,
        questionPhoto: String,
        solutionPhoto: String
    }

    type publisher {
        _id: String,
        studentId: String,
        publisherId: String,
        publisherName: String,
        publisherLogo: String
    }

    # backend->chapter 5
    type studentBookUnitAnswer {                            # A student's answer for a Qusestion(NOT A TEST) of Test of ... of Book
        _id: String,                                        #  one to one relationship with topic
        studentId: String,
        bookId: String,
        bookUnitId: String,
        bookName: String,
        lessonName: String,
        numberOfQuestions: Int,
        solvedQuestionCount: Int,
        correctAnswerCount: Int,
        incorrectAnswerCount: Int,
        courseSuccessRate: Int,
        completionPercentage: Int
    }
   


    type Query {
        # -----   B O O K   -----
        book(_id: ID!): BookResponse
        books(examId: [String], categoryId: String, title: String, publisherId: String, publishYear: Int, isbn: String, level: Int, showToUsers: Boolean, offset: Int, limit: Int):BooksResponse
        getStudentOfBooks(_id: ID!): UserResponse

        # -----   B O O K    T E S T   -----
        bookTest(_id: ID!): BookTestResponse
        bookTests(bookId: String, bookUnitId: String, bookUnitSectionId: String, testName: String, questionCount: Int, offset: Int, limit: Int): BookTestsResponse

        # -----   B O O K    T E S T   A N S W E R   -----
        bookTestAnswer(_id: ID!): BookTestAnswerResponse
        bookTestAnswers(bookTestId: String, subTopicId: String, questionNumber: Int, correctAnswer: CORRECT_ANSWER, offset: Int, limit: Int): BookTestAnswersResponse

        # -----   B O O K   U N I T   -----
        bookUnit(_id: ID!): BookUnitResponse
        bookUnits(bookId: String, lessonId: String, title: String, offset: Int, limit: Int): BookUnitsResponse

        # -----   B O O K   U N I T   P A R T   -----
        bookUnitPart(_id: ID!): BookUnitPartResponse
        bookUnitParts(title: String, bookUnitId: String, offset: Int, limit: Int): BookUnitPartsResponse

        # -----   B O O K   U N I T   T O P I C   -----
        bookUnitTopic(_id: ID!): BookUnitTopicResponse
        bookUnitTopics(bookUnitPartId: String, topicId: String, offset: Int, limit: Int): BookUnitTopicsResponse

        # -----   B O O K   U N I T   S U B T O P I C   -----
        bookUnitSubTopic(_id: ID!): BookUnitSubTopicResponse
        bookUnitSubTopics(bookUnitPartId: String, subTopicId: String, offset: Int, limit: Int): BookUnitSubTopicsResponse

        # -------- Q U E S T I O N ---------------
        question(_id: String) : QuestionResponse
        questions : QuestionsResponse

        # ------- B O O K  S E C T I O N --------
        bookSection(_id: String) : BookSectionResponse
        booksections : BookSectionsResponse

        # ------- B O O K  C A T E G O R I E S --------
        bookCategory(_id : String) : BookCategoryResponse
        bookCategoris : BookCategorysResponse

        #-------------- STUDENT BOOK --------------------
        studentBooks(studentId: String, categoryId: String) : studentBooksResponse
        bookSearch(title: String): studentBooksResponse
        studentPublishers(studentId: String) : StudentPublishersResponse
        studentPublisherSearch(studentId: String) : StudentPublishersResponse
        studentPublisherBooks(studentId: String, publisherId: String, categoryId: String) : studentBooksResponse

        #-------------- STUDENT BOOK SECTION--------------------
        studentBookSections(studentId: String, categoryId: String, bookId: String): studentBookSectionsResponse


        #-------------- STUDENT BOOK TEST ---------------
        studentBookTests(studentId: String, categoryId: String, bookId: String, bookUnitSectionId: String): studentBookTestsResponse
        studentBookTest(studentId: String, categoryId: String, bookId: String, bookUnitSectionId: String, bookTestId: String): studentBookTestAnswersResponse

        #-- BACKEND CHAPTER 5
        studentBookUnits(studentId: String, timeInterval: [TIME_INTERVAL]): UserResponse
        studentAnswersInBookSectionUnit(studentId: String, startTime: String, endTime: String, lessonId: String, topicId: String): UserResponse             # Date Sample 2020-09-20T14:48:00
        studentTestsInBookSectionUnit(studentId: String, lessonId: String, topicId: String): UserResponse

        #----------- BACKEND FOR CHAPTER 6 ------------------
        questionBankHomework(studentId: String, timeInterval: [TIME_INTERVAL_WEEK]): UserResponse

        #----------- BACKEND FOR CHAPTER 3 -----------------
        questionBankHome(studentId: String, examId: String, lessonId: String, timeInterval: TIME_INTERVAL_3) : UserResponse

    }

    type Mutation {
        # -----   B O O K   -----
        addBook(title: String!, examId: [String], categoryId: String, publisherId: String, publishYear: Int, isbn: String, level: Int, showToUsers: Boolean, image: String): BookResponse!
        updateBook(_id: ID!, title: String, examId: [String], categoryId: String, publisherId: String, publishYear: Int, isbn: String, level: Int, showToUsers: Boolean, image: String): BookResponse!
        deleteBook(_id: ID!): UserResponse!

        # --------- B O O K  C A T E G O R Y ------------
        addBookCategory(title: String, exam: String, category: CATEGORY):BookCategoryResponse!
        updateBookCategory(_id: String, title: String, exam: String, category: CATEGORY):BookCategoryResponse!
        deleteBookCategory(_id: String):UserResponse!

        # -----   B O O K    T E S T   -----
        addBookTest(bookId: String!, bookUnitId: String, bookUnitSectionId: String, testName: String!, questionCount: Int): BookTestResponse!
        updateBookTest(_id: ID!, bookUnitId: String, bookUnitSectionId: String, testName: String, questionCount: Int): BookTestResponse!
        deleteBookTest(_id: ID!): UserResponse!

        # -----   B O O K    T E S T   A N S W E R   -----
        addBookTestAnswer(bookTestId: String!, subTopicId: String!, questionNumber: Int!, correctAnswer: CORRECT_ANSWER): BookTestAnswerResponse!
        updateBookTestAnswer(_id: ID!, bookTestId: String, subTopicId: String, questionNumber: Int, correctAnswer: CORRECT_ANSWER): BookTestAnswerResponse!
        deleteBookTestAnswer(_id: ID!): UserResponse!

        # -----   B O O K    U N I T   -----
        addBookUnit(title: [String]!, bookId: String, lessonId: String): BookUnitResponse!
        updateBookUnit(_id: ID!, title: [String], bookId: String, lessonId: String): BookUnitResponse!
        deleteBookUnit(_id: ID!): UserResponse!

        # -----   B O O K   U N I T   P A R T   -----
        addBookUnitPart(title: String!, bookUnitId: String): BookUnitPartResponse!
        updateBookUnitPart(_id: ID!, title: String, bookUnitId: String): BookUnitPartResponse!
        deleteBookUnitPart(_id: ID!): UserResponse!

        # -----   B O O K   U N I T   S U B T O P I C   -----
        addBookUnitSubTopic(bookUnitPartId: String!, subTopicId: String!): BookUnitSubTopicResponse
        updateBookUnitSubTopic(_id: ID!, bookUnitPartId: String, subTopicId: String): BookUnitSubTopicResponse!
        deleteBookUnitSubTopic(_id: ID!): UserResponse!

        # -----   B O O K   U N I T   T O P I C   -----
        addBookUnitTopic(bookUnitPartId: String!, topicId: String!): BookUnitTopicResponse
        updateBookUnitTopic(_id: ID!, bookUnitPartId: String, topicId: String): BookUnitTopicResponse!
        deleteBookUnitTopic(_id: ID!): UserResponse!

        # ----------- Q U E S T I O N -----------
        addQuestion(lesson: String!, topic: [String]!, subtopic: [String]!, title: String!, questionPhoto: String, solutionPhoto: String): QuestionResponse!
        updateQuestion(_id: String , lesson: String!, topic: [String]!, subtopic: [String]!, title: String!, questionPhoto: String, solutionPhoto: String): QuestionResponse!
        deleteQuestion(_id: String ): UserResponse!

        # ---------- B O O K S E C T I O N ------------
        addBookSection(bookId: String, unitId: String, topicId: [String], title: [String]): BookSectionResponse!
        updateBookSection(_id: String ,bookId: String, unitId: String, topicId: [String], title: [String]): BookSectionResponse!
        deleteBookSection(_id: String): UserResponse!

        #---------------- STUDENT BOOK ----------------
        addStudentBook(bookId: String, studentId: String): BookResponse
        deleteStudentBook(studentId: String, bookId: String): BookResponse

        #---------------- STUDENT BOOK TEST ----------------
        addStudentBookTest(studentId: String, bookId: String, bookUnitSectionId: String, bookTestId: String, date: String, timeSpent: Int, studentAnswers: [CORRECT_ANSWER], examId: String, lessonId: String, topicId: String): studentBookTestResponse
        addStudentBookTestAnswerQuestionPhoto(studentId: String, bookTestAnswerId: String, data: String) : UserResponse
        addStudentBookTestAnswerSolutionPhoto(studentId: String, bookTestAnswerId: String, data: String) : UserResponse
    }

    type BookResponse {status: String!, message: String!, content: Book}
    type BooksResponse {status: String!, message: String!, content: [Book]}
    type BookCategoryResponse {status: String!, message: String!, content: BookCategory}
    type BookCategorysResponse {status: String!, message: String!, content: [BookCategory]}
    type BookSectionResponse {status: String!, message: String!, content: BookSection}
    type BookSectionsResponse {status: String!, message: String!, content: [BookSection]}
    type BookTestResponse {status: String!, message: String!, content: BookTest}
    type BookTestsResponse {status: String!, message: String!, content: [BookTest]}
    type BookTestAnswerResponse {status: String!, message: String!, content: BookTestAnswer}
    type BookTestAnswersResponse {status: String!, message: String!, content: [BookTestAnswer]}
    type UserResponse {status: String!, message: String!, content: JSON}
    type BookUnitResponse {status: String!, message: String!, content: BookUnit}
    type BookUnitsResponse {status: String!, message: String!, content: [BookUnit]}
    type BookUnitPartResponse {status: String!, message: String!, content: BookUnitPart}
    type BookUnitPartsResponse {status: String!, message: String!, content: [BookUnitPart]}
    type BookUnitSubTopicResponse {status: String!, message: String!, content: BookUnitSubTopic}
    type BookUnitSubTopicsResponse {status: String!, message: String!, content: [BookUnitSubTopic]}
    type BookUnitTopicResponse {status: String!, message: String!, content: BookUnitTopic}
    type BookUnitTopicsResponse {status: String!, message: String!, content: [BookUnitTopic]}
    type QuestionResponse {status: String!, message: String!, content: Question}
    type QuestionsResponse {status: String!, message: String!, content: [Question]}
    type studentBooksResponse {status: String!, message: String!, content: [studentBook]}
    type studentBookSectionsResponse {status: String!, message: String!, content: [studentBookSection]}
    type studentBookTestsResponse {status: String!, message: String!, content: [studentBookTest]}
    type studentBookTestResponse {status: String!, message: String!, content: studentBookTest}
    type studentBookTestAnswersResponse {status: String!, message: String!, content: [studentBookTestAnswer]}
    type StudentPublishersResponse {status: String!, message: String!, content: [publisher]}

`;