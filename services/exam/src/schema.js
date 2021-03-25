const { gql } = require('apollo-server');
module.exports = gql`
    
    scalar JSON
    enum CORRECT_ANSWER { Unknown A B C D E}
    enum STARLEVEL { level1 level2 level3 level4 level5 level6 level7 level8 level9 level10}
    enum TIME_INTERVAL_WEEK {Past, CurrentWeek, Upcoming}
    enum TIME_INTERVAL_4 { General, Last, Last5 }

    type Exam @key(fields: "_id") {
        _id: String
        title: String,
        date: String,
    }

    type ExamAnswer @key(fields: "_id") {
        _id: String,
        examSetTestId: String, # exam test id
        subTopicId: String,
        questionNumber: Int,
        correctAnswer: CORRECT_ANSWER
        subtopic: Subtopic
        examTest: ExamTest
    }

    type ExamSet @key(fields: "_id") {
        _id: String
        examId: String
        categoryId: String
        title: String
        publisherId: String
        publishYear: Int
        isbn: String
        level: Int
        showToUsers: Boolean
        image: String
    }

    type ExamSetBookie @key(fields: "_id") {
        _id: String
        examSetId: String
        bookieTitle: String
    }

    type ExamTest @key(fields: "_id") {
        _id: String
        examSetBookieId: String
        title: String
        sequence: Int
        questionCount: Int
    }


    type Lesson @key(fields: "_id") {
        _id: String
        title: String
        exam: [String]
    }

    type Subtopic @key(fields: "_id") {
        _id: String
        topicId: String
        lessonId: String
        title: [String]
    }

    type Topic @key(fields: "_id") {
        _id: String
        lessonId: [String]
        title: [String]
    }

    type BookletTest {
        _id: String
        examSet: String
        booklet: String
        title: String
        lesson: [String]
        questions: Int
        sortOrder: String
    }

    type BookletTestAnswer {
        _id: String
        topic : String
        subtopic : String
        bookletTestId: String
        answer: [String]
    }

    type HomeworkFromQuestionBank {
        _id: String
        title: String
        deadline: String
        description: String
        teacherId: String
        questionBankBook: String
        bookUnit: String
        sections: [String]
        tests:[String]
    }

    type HomeworkFromPraticeExam {
        _id: String
        title: String
        teacherId: String
        deadline: String
        description: String
        examSet: String
        examBooklet: String
        bookletTests: [String]
    }

    type PraticeExam {
        _id: String
        photoId: String
        title: String
        category: String
        exam: String
        publisher: String
        isbn: String
        releaseYear: String
        level: Int
        showToUser: Boolean
    }

    type PracticeExamBooklet {
        _id: String
        examSet: String
        title: String
    }

    type StudentExamSet {
        studentId: String
        QuestionBankName: String
        examId: String
        categoryId: String
        title: String
        publisherId: String
        publishYear: Int
        isbn: String
        level: Int
        showToUsers: Boolean
        image: String
        testCount: Int
        questionCount: Int
        BookCompletionPercentage: Int
        solvedQuestionCount: Int
        correctAnswerCount: Int
        incorrectAnswerCount: Int
        bookSuccessRate: Int
        isSelectedByStudent: Boolean
        numberOfStudents: Int
        ranking: Int
    }

    type StudentExamSetBookie {                               #  Question Bank -> Book -> Book Unit -> Book Section Unit
        _id: String,                                        #  one to one relationship with topic
        studentId: String,
        examSetId: String,
        examSetBookieId: String,
        examSetBookieName: String,
        testCount: Int,
        solvedTestCount: Int,
        solvedQuestionCount: Int,
        correctAnswerCount: Int,
        incorrectAnswerCount: Int,
        completionPercentage: Int,
        successRate: Int,
        ranking: Int,
        numberOfStudents: Int,
        totalNumberOfCorrectAnswers: Int,
    }

    type StudentExamTest {
        _id: String
        studentId: String
        examSetId: String
        examSetName: String
        examSetImage: String
        examSetBookieId: String
        examTestId: String
        testName: String
        isSolved: Boolean
        solvedQuestionCount: Int
        correctAnswerCount: Int
        inCorrectAnswerCount: Int
        blankAnswerCount: Int
        sorting: Int
        testSuccessRate: Int
        completionPercentage: Int
        numberOfStudents: Int
        date: String
        timeSpent: String
    }

    type StudentExamAnswer {                            
        _id: String
        studentId: String
        examSetId: String
        examSetName: String
        examSetBookieId: String
        examTestId: String
        examAnswerId: String
        questionNumber: Int
        isAnswered: Boolean
        correctAnswer: CORRECT_ANSWER
        studentAnswer: CORRECT_ANSWER
        isCorrect: Boolean
        date: String
        timeSpent: Int
        questionPhoto: String
        solutionPhoto: String
    }

    type ExamSetPublisher {
        _id: String
        studentId: String
        publisherId: String
        publisherName: String
        publisherLogo: String
    }

    type Query {
        # -----   E X A M   -----
        exam(_id: ID!, forceUpdate: String): ExamResponse!
        exams(title: String, offset: Int, limit: Int): ExamsResponse!
        
        # -----   E X A M    A N S W E R   -----
        examAnswer(_id: ID!, forceUpdate: String): ExamAnswerResponse
        examAnswers(examSetTestId: String, subTopicId: String, questionNumber: Int, correctAnswer: CORRECT_ANSWER, offset: Int, limit: Int): ExamAnswersResponse!

        # -----   E X A M S E T   -----
        examSet(_id: ID!, forceUpdate: String ): ExamSetResponse
        examSets(examId: String, categoryId: String, publisherId: String, publishYear: Int, level: Int, showToUsers: Boolean, offset: Int, limit: Int): ExamSetsResponse!

        # -----   Exam Set Bookie   -----
        examSetBookie(_id: ID!, forceUpdate: String): ExamSetBookieResponse
        examSetBookies(examSetId: ID, bookieTitle: String, offset: Int, limit: Int): ExamSetBookiesResponse!

        # -----   EXAM TEST   -----
        examTest(_id: ID!, forceUpdate: String): ExamTestResponse
        examTests(examSetBookieId: String, title: String, sequence: Int, questionCount: Int, offset: Int, limit: Int): ExamTestsResponse

        # -----   L E S S O N   -----
        lesson(_id: ID!, forceUpdate: String): LessonResponse
        lessons(title: String, offset: Int, limit: Int): LessonsResponse

        # -----   S U B T O P I C   -----
        subtopic(_id: ID!, forceUpdate: String): SubtopicResponse
        subtopics(topicId: ID, title: String, offset: Int, limit: Int):SubtopicsResponse

        # -----   T O P I C   -----
        topic(_id: ID!, forceUpdate: String): TopicResponse
        topics(lessonId: String, title: String, offset: Int, limit: Int):TopicsResponse

        # ------ P R A T I C E  E X A M -------------
        PraticeExam(_id: String) : PraticeExamResponse
        PraticeExams : PraticeExamsResponse

        #--------- P R A C T I C E  E X A M  B O O K L E T ----------
        PracticeExamBooklet(_id: String) : PracticeExamBookletResponse
        PracticeExamBooklets : PracticeExamBookletsResponse

        #--------- B O O K L E T  T E S T ----------
        BookletTest(_id: String) : BookletTestResponse
        BookletTests: BookletTestsResponse

        #--------- B O O K L E T  T E S T  A N S W E R ----------
        BookletTestAnswer(_id: String) : BookletTestAnswerResponse
        BookletTestAnswers: BookletTestAnswersResponse

        #--------- H O M E W O R K ----------
        GetHomeWorkfromQuestionBank(_id: String) : HomeworkResponseQuestion
        GetHomeWorksfromQuestionBanks : HomeworksResponseQuestion

        GetHomeWorkfromPraticeExam(_id: String) : HomeworkResponsePratice
        GetHomeWorksfromPraticeExam : HomeworkResponsePratice

        #----------- B A C K E N D ---------------
        #------------ STUDENT EXAMSET ---------------
        studentExamSets(studentId: String, categoryId: String) : StudentExamSetsResponse
        examSetSearch(title: String): StudentExamSetsResponse
        examSetPublishers(studentId: String) : ExamSetPublishersResponse
        examSetPublisherSearch(studentId: String) : ExamSetPublishersResponse
        studentPublisherExamSets(studentId: String, publisherId: String, categoryId: String) : StudentExamSetsResponse

        #------------ STUDENT EXAMSET BOOKIE ---------------
        studentExamSetBookies(studentId: String, categoryId: String, examSetId: String) : StudentExamSetBookiesResponse

        #------------ STUDENT EXAM TEST ---------------
        studentExamTests(studentId: String, categoryId: String, examSetId: String, examSetBookieId: String) : StudentExamTestsResponse
        studentExamTest(studentId: String, categoryId: String, examSetId: String, examSetBookieId: String, examTestId: String) : StudentExamAnswersResponse

        #---------------- INCORRECT STUDENT'S ANSWERS IN SELECT COURSE AND TOPIC DURING SELECTED DURATION (5.2.1. 64P)
        studentAnswersInExamSetBookie(studentId: String, lessonId: String, topicId: String, startTime: String, endTime:String) : ExamNormalResponse
        #---------------- A STUDENT'S INDIVIDUAL SUBTOPIC SCREEN (5.2.2. 67P)
        studentAnswersInExamSetBookieBySubTopic(studentId: String, lessonId: String, subTopicId: String) : ExamNormalResponse

        #----------- BACKEND FOR CHAPTER 6 ------------------
        practiceExamHomework(studentId: String, timeInterval: [TIME_INTERVAL_WEEK]): ExamNormalResponse

        #----------- BACKEND FOR CHAPTER 3 -----------------
        PracticeExamHome(studentId: String, lessonId: String, topicId: String, timeInterval: TIME_INTERVAL_4) : ExamNormalResponse
        
    }

    type Mutation {
        # -----   E X A M   -----
        addExam(title: String!, date: String!):ExamResponse
        updateExam(_id: String!, title: String, date: String): ExamResponse
        deleteExam(_id: String!): ExamNormalResponse
        
        # -----   E X A M    A N S W E R   -----
        addExamAnswer(examSetTestId: String!, subTopicId: String!, questionNumber: Int!, correctAnswer: CORRECT_ANSWER): ExamAnswerResponse!
        updateExamAnswer(_id: String!, examSetTestId: String, subTopicId: String, questionNumber: Int, correctAnswer: CORRECT_ANSWER): ExamAnswerResponse!
        deleteExamAnswer(_id: String!): ExamNormalResponse!

        # -----   E X A M S E T   -----
        addExamSet(examId: String!, categoryId: String!, title: String!, publisherId: String!, publishYear: Int!, isbn: String, level: Int, showToUsers: Boolean, image: String): ExamSetResponse!
        updateExamSet(_id: String!, examId: String, categoryId: String, title: String, publisherId: String, publishYear: Int, isbn: String, level: Int, showToUsers: Boolean, image: String): ExamSetResponse!
        deleteExamSet(_id: String!): ExamNormalResponse!

        # -----   Exam Set Bookie   -----
        addExamSetBookie(examSetId: String!, bookieTitle: String!): ExamSetBookieResponse!
        updateExamSetBookie(_id: String!, examSetId: String, bookieTitle: String): ExamSetBookieResponse!
        deleteExamSetBookie(_id: String!): ExamNormalResponse!

        # -----   EXAM TEST   -----
        addExamTest(examSetBookieId: String!, title: String!, sequence: Int, questionCount: Int): ExamTestResponse!
        updateExamTest(_id: String!, examSetBookieId: String, title: String, sequence: Int, questionCount: Int): ExamTestResponse!
        deleteExamTest(_id: String!): ExamNormalResponse!

        # -----   L E S S O N   -----
        addLesson(title: String!, exam: [String]!): LessonResponse!
        updateLesson(_id: String!, title: String!, exam: [String]): LessonResponse!
        deleteLesson(_id: String!): ExamNormalResponse!

        # -----   S U B T O P I C   -----
        addSubtopic(topicId: String!, lessonId: String title: [String]!): SubtopicResponse!
        updateSubtopic(_id: String!, topicId: String, lessonId: String, title: [String]): SubtopicResponse!
        deleteSubtopic(_id: String!): ExamNormalResponse!

        # -----   T O P I C   -----
        addTopic(lessonId: [String]!, title: [String]!): TopicResponse!
        updateTopic(_id: String!, lessonId: [String], title: [String]): TopicResponse!
        deleteTopic(_id: String!): ExamNormalResponse!

        # ---------- P R A C T I C E    E X A M -----------------
        addPracticeExam(photoId: String, title: String, category: String, exam: String, publisher: String, isbn: String, releaseYear: String, level: Int, showToUser: Boolean): PraticeExamResponse!
        updatePracticeExam(_id: String, photoId: String, title: String, category: String, exam: String, publisher: String, isbn: String, releaseYear: String, level: Int, showToUser: Boolean): PraticeExamResponse!
        deletedPracticeExam(_id: String) : ExamNormalResponse!

        #----------- P R A C T I C E   E X A M B O O K L E T T E S T --------------
        addPracticeExamBooklet(examSet: String, title: String): PracticeExamBookletResponse!
        updatePracticeExamBooklet(_id: String, examSet: String, title: String): PracticeExamBookletResponse!
        deletedPracticeExamBooklet(_id: String): ExamNormalResponse!

        #-------- B O O K L E T  T E S T -----------------
        addBookletTest(examSet: String, booklet: String, title: String, lesson: [String], sortOrder: String, questions: Int) : BookletTestResponse!
        updateBookletTest(_id: String, examSet: String, booklet: String, title: String, lesson: [String], sortOrder: String, questions: Int) : BookletTestResponse!
        deleteBookletTest(_id: String) : ExamNormalResponse!

        #-------- B O O K L E T  T E S T  ANSWER -----------------
        addBookletTestAnswer(topic: String, subtopic: String, bookletTestId: String, answer: [String]) : BookletTestAnswerResponse!
        updateBookletTestAnswer(_id: String, topic: String, subtopic: String, bookletTestId: String, answer: [String]) : BookletTestAnswerResponse!
        deletedBookletTestAnswer(_id: String) : ExamNormalResponse!

        #----------- A D D  H O M E W O R K ---------------------
        addHomeWorkFromQuestionBank(title: String, teacherId: String, deadline: String, description: String, questionBankBook: String, bookUnit: String, sections: [String], tests:[String]) : HomeworkResponseQuestion!
        updateHomeWorkFromQuestionBank(_id : String, title: String, deadline: String, description: String, questionBankBook: String, bookUnit: String, sections: [String]) : HomeworkResponseQuestion!
        deleteHomeWorkFromQuestionBank(_id : String) : ExamNormalResponse!

        addHomeWorkFromPraticeExam( title: String,teacherId: String, deadline: String, description: String, examSet: String, examBooklet: String, bookletTests: [String]) : HomeworkResponsePratice!
        updateHomeWorkFromPraticeExam(_id : String, title: String, deadline: String, description: String, examSet: String, examBooklet: String, bookletTests: [String]) : HomeworkResponsePratice!
        deleteHomeWorkFromPraticeExam(_id : String) : ExamNormalResponse!

        #--------------BACKEND--------------------
        #-----------------------STUDENT EXAMSET----------------------
        addStudentExamSet(studentId: String, examSetId: String) : ExamNormalResponse

        #---------------- STUDENT BOOK TEST ----------------
        addStudentExamTest(studentId: String, examSetId: String, examSetBookieId: String, examTestId: String, date: String, timeSpent: Int, studentAnswers: [CORRECT_ANSWER]): ExamNormalResponse
    }

    type ExamNormalResponse { status: String!, message: String!, content: JSON }

    type ExamResponse { status: String!, message: String!, content: Exam }
    type ExamsResponse { status: String!, message: String!, content: [Exam] }

    type ExamAnswerResponse { status: String!, message: String!, content: ExamAnswer }
    type ExamAnswersResponse { status: String!, message: String!, content: [ExamAnswer] }

    type ExamSetResponse { status: String!, message: String!, content: ExamSet }
    type ExamSetsResponse { status: String!, message: String!, content: [ExamSet] }

    type ExamSetBookieResponse { status: String!, message: String!, content: ExamSetBookie }
    type ExamSetBookiesResponse { status: String!, message: String!, content: [ExamSetBookie] }

    type ExamTestResponse { status: String!, message: String!, content: ExamTest }
    type ExamTestsResponse { status: String!, message: String!, content: [ExamTest] }

    type HomeworkResponseQuestion { status: String!, message: String!, content: HomeworkFromQuestionBank }
    type HomeworksResponseQuestion { status: String!, message: String!, content: [HomeworkFromQuestionBank] }

    type HomeworkResponsePratice { status: String!, message: String!, content: HomeworkFromPraticeExam }
    type HomeworksResponsePratice { status: String!, message: String!, content: [HomeworkFromPraticeExam] }

    type LessonResponse { status: String!, message: String!, content: Lesson }
    type LessonsResponse { status: String!, message: String!, content: [Lesson] }

    type PraticeExamResponse { status: String!, message: String!, content: PraticeExam }
    type PraticeExamsResponse { status: String!, message: String!, content: [PraticeExam] }

    type PracticeExamBookletResponse { status: String!, message: String!, content: PracticeExamBooklet }
    type PracticeExamBookletsResponse { status: String!, message: String!, content: [PracticeExamBooklet] }

    type TopicResponse { status: String!, message: String!, content: Topic }
    type TopicsResponse { status: String!, message: String!, content: [Topic] }

    type SubtopicResponse { status: String!, message: String!, content: Subtopic }
    type SubtopicsResponse { status: String!, message: String!, content: [Subtopic] }

    type BookletTestResponse { status: String!, message: String!, content: BookletTest }
    type BookletTestsResponse { status: String!, message: String!, content: [BookletTest] }

    type BookletTestAnswerResponse { status: String!, message: String!, content: BookletTestAnswer }
    type BookletTestAnswersResponse { status: String!, message: String!, content: [BookletTestAnswer] }

    type StudentExamSetsResponse { status: String!, message: String!, content: [StudentExamSet] }
    type StudentExamSetBookiesResponse { status: String!, message: String!, content: [StudentExamSetBookie] }
    type ExamSetPublishersResponse { status: String!, message: String!, content: [ExamSetPublisher] }

    type StudentExamTestsResponse { status: String!, message: String!, content: [StudentExamTest] }
    type StudentExamTestResponse { status: String!, message: String!, content: StudentExamTest }
    type StudentExamAnswersResponse { status: String!, message: String!, content: [StudentExamAnswer] }

`;