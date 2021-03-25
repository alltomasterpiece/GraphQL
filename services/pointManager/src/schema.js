const { gql } = require('apollo-server');
module.exports = gql`
    scalar JSON
    scalar Upload
    input Lessons {
        title : String
        
    }
    type PointManagerConstant {
        _id : String
        pointConstant: Float
    }
    type ObpManagerConstant {
        _id : String
        obpConstant: Float
    }
    type PointLesson {
        _id : String
        title: String
        numberOfQuestion: Int
        ScoreConstant: Float
    }
    type ExamField {
        _id : String
        title: String
        lessonId : [String]
        splintConstant: Float
    }
    input lesson {
        totalQuestion : Int
        correctAnswer : Int
        wrongAnswer : Int
        lessonId : String
        scoreConstant : Float
    }
    type Query {
        getObpConstant(_id: String) : obpManagerConstantResponse
        getObpConstants : obpManagerConstantResponse
        getPointConstant(_id: String) : PointManagerConstantResponse
        getPointConstants : PointManagerConstantResponse
        getPointLesson : PointLessonResponse
        getPointLessons : PointLessonsResponse
        getExamField : ExamFieldResponse
        getExamFields : ExamFieldResponses
        getPointResult (uniEnrolled : Boolean, lesson : [lesson], splintConstant: Float, graduationGrade: Float) : UserResponse
    }
    type Mutation {
        #-------------- P O I N T  C A L C U L A T I O N  M A N A G E R -----------
        pointCalculationManager(obpContant: String, pointConstant: String, lessonTitle: String, numberOfQuestion: String, scoreContant: String, examTitle: String, examLesson: [String], splintConstant: String, ScoreRankingFile: String) : UserResponse!

        #---------- A D M I N  S E C T I O N  O P E R A T I O N ------------------
        addObpConstant(obpConstant: Float) : obpManagerConstantResponse
        deleteObpPoint(_id: String) : UserResponse
        updateObpConst(_id: String ,obpConstant: Float) : obpManagerConstantResponse

        addPointConstant(pointConstant: Float) : PointManagerConstantResponse
        deletePointConstant(_id: String) : UserResponse
        updatePointConstant(_id: String ,pointConstant: Float) : PointManagerConstantResponse

        addPointLesson(title: String, numberOfQuestion: Int, ScoreConstant: Float) : PointLessonResponse
        updatePointLesson(_id: String, title: String, numberOfQuestion: Int, ScoreConstant: Float) : PointLessonResponse
        deletePointLesson(_id: String) : UserResponse

        addExamField(title: String, lessonId: [String], splintConstant: Float) : ExamFieldResponse
        updateExamField(_id: String, title: String, lessonId: [String], splintConstant: Float) : ExamFieldResponse
        deleteExamField(_id: String) : UserResponse

        addResultFile(file : Upload!) : UserResponse
        deleteResultFile : UserResponse
    }
    type UserResponse { status: String!,  message: String!, content: JSON }
    type PointManagerConstantResponse { status: String!,  message: String!, content: PointManagerConstant }
    type obpManagerConstantResponse { status: String!,  message: String!, content: ObpManagerConstant }
    type PointLessonResponse { status: String!,  message: String!, content: PointLesson}
    type PointLessonsResponse { status: String!,  message: String!, content: [PointLesson]}
    type ExamFieldResponse { status: String!,  message: String!, content: ExamField}
    type ExamFieldResponses { status: String!,  message: String!, content: [ExamField]}
`;