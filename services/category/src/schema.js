const { gql } = require('apollo-server');
module.exports = gql`
    
    scalar JSON
   
    enum ROLE_MODULE { Book BookTest BookTestAnswer BookUnit BookUnitPart BookUnitPartSubTopic BookUnitTopic City District Exam ExamSet ExamSetTest ExamSetTestAnswer Friend Homework HomeworkAnswer HomeworkContent Lesson Manager Publisher Role RoleAuthority School Student SubTopic Teacher Topic Category ExamSetBookie ExamSetTestLessons Supports }

    enum ROLE_CONSTANT { Select Insert Update Delete }
    enum EDITOR_CONSTANT { View Add Update Delete }

    type Category @key(fields: "_id") {
        _id: String
        categoryTitle: String
    }

    type AnswerKeyEditorPratice {
        _id: String
        admin: String
        role: [String]
        practiceExamSet: [String]
        bookletTest: [String]
    }

    type AnswerKeyEditorQuestion {
        _id: String
        admin: String
        book: String
        BookUnit: [String]
        BookUnitSection: [String]
        tests: [String]
        role: [String]
    }

    type City @key(fields: "_id cityId"){
        _id: String
        cityId: String
        cityName: String
    }
    input CityArray {
        _id: ID,
        cityId: Int,
        cityName: String
    }
    type District @key(fields: "_id") {
        _id: String
        cityId: String
        districtId: String
        districtName: String
    }
    input DistrictArray {
        _id: ID
        cityId: String
        districtId: String
        districtName: String
    }

    type Role @key(fields: "_id") {
        _id: String
        title: String
        description: String
    }

    type RoleAuthority @key(fields: "_id") {
        _id: ID
        roleId: String
        module: [ROLE_MODULE]
        roleConstant: [ROLE_CONSTANT]
    }

    type Class @key(fields: "_id") {
        _id: String
        title: String
        description: String
        isPrivate: Boolean
        isPublished: Boolean
        studentsId: [String]
        classCode: String
        teacherId: String
    }

    type GraduateField {
        _id: String
        title: String
    }

    type GraduateStatus {
        _id: String
        title: String
        exam: String
    }

    type School @key(fields: "_id") {
        _id: String
        cityId: String
        districtId: String
        name: String
    }

    input SchoolArray {
        _id: ID
        cityId: String
        districtId: String
        name: String
    }
    type StudentMemberType @key(fields: "_id") {
        _id: String
        typeTitle: String
        descriptions: String
        piece: Int
    }
    type University @key(fields: "_id") {
        _id: String
        title: String,
        department: String,
        departmentPoint: String,
        departmentScore: String
    }

    input UniversityArray {
        title: String
        department: String
        departmentPoint: String,
        departmentScore: String
    }

    # extend type Teacher @key(fields: "_id") {
    #     _id: String! @external
    #     role: Role
    #     school: School
    # }

    type Query {
        # -----   C A T E G O R Y   -----
        category(_id: ID!, forceUpdate: String): CategoryResponse
        categories(categoryTitle: String, offset: Int, limit: Int): CategorysResponse

        # -----   C I T Y   -----
        city(_id: ID, code: Int, forceUpdate: String): CityResponse
        cities(offset: Int, limit: Int, forceUpdate: String): CitysResponse

        # -----     D I S T R I C T     -----
        district(_id: ID!, forceUpdate: String): DistrictResponse
        districts(offset: Int, limit: Int, forceUpdate: String): DistrictsResponse

        # -----     R O L E     -----
        role(_id: ID!, forceUpdate: String): RoleResponse
        roles(offset: Int, limt: Int, forceUpdate: String): RolesResponse

        # -----     R O L E    A U T H O R I T Y     -----
        roleAuthority(_id: ID!, forceUpdate: String): RoleAuthorityResponse
        roleAuthorities(roleId: String, module: ROLE_MODULE, roleConstant: ROLE_CONSTANT, offset: Int, limit: Int, forceUpdate: String): RoleAuthoritysResponse

        # -----     S C H O O L     -----
        school(_id: ID!, forceUpdate: String): SchoolResponse
        schools(districtId: String, name: String, offset: Int, limit: Int, forceUpdate: String): SchoolsResponse

        # -----     STUDENT MEMBER TYPE     -----
        studentMemberType(_id: ID!, forceUpdate: String): StudentMemberTypeResponse
        studentMemberTypes(offset: Int, limit: Int, forceUpdate: String): StudentMemberTypesResponse

        # --------- UNIVERSITY ----------
        university ( _id : ID ) : UniversityResponse!
        universities : UniversitysResponse!

        # ----------- GRADUATE FIELDS --------
        graduateField (_id : String) : GraduateFieldResponse!
        graduateFields : GraduateFieldsResponse!

        # ---------- GRADUATE STATUS -----------
        AllGraduateStatus : GraduateStatussResponse!
        GraduateStatus (_id : String) : GraduateStatusResponse!

        # -------- C L A S S -------------
        class(_id: String) : ClassResponse
        classes (teacherId : String) : ClasssResponse

        # ----------- A N S W E R  K E Y  E D I T O R  Q U E S T I O N ----------------------
        getAnswerKeyEditorRoleQuestion(_id: String) : AnswerKeyQuestionResponse
        getAnswerKeyEditorRoleQuestions : AnswerKeyQuestionsResponse
        # ----------- A N S W E R  K E Y  E D I T O R  Q U E S T I O N ----------------------
        getAnswerKeyEditorRolePratice(_id: String) : AnswerKeyPraticeResponse
        getAnswerKeyEditorRolePratices : AnswerKeyPraticesResponse


        # ------------BACKEND FOR CHAPTER 6 ----------------------
        searchClass(studentId: String, className: String) : CategoryNormalResponse
    }

    type Mutation {
        # -----   C A T E G O R Y   -----
        addCategory(categoryTitle: String!): CategoryResponse!
        updateCategory(_id: ID!, categoryTitle: String!): CategoryResponse!
        deleteCategory(_id: ID!): CategoryNormalResponse!

        # -----   C I T Y   -----
        addCity(cityName: String!, cityId: String): CityResponse!
        updateCity(_id: ID!, cityId: String, cityName: String): CityResponse!
        deleteCity(_id: ID!): CategoryNormalResponse!

        # -----     D I S T R I C T     -----
        addDistrict(cityId: String, districtId : String!, districtName: String!): DistrictResponse!
        updateDistrict(_id: ID, cityId: String, districtName: String): DistrictResponse!
        deleteDistrict(_id: ID!): CategoryNormalResponse!

        # -----     R O L E     -----
        addRole(title: String!, description: String!): RoleResponse!
        updateRole(_id: ID!, title: String, description: String): RoleResponse!
        deleteRole(_id: ID!): CategoryNormalResponse!

        # -----     R O L E    A U T H O R I T Y     -----
        addRoleAuthority(roleId: String!, module: [ROLE_MODULE]!, roleConstant: [ROLE_CONSTANT]!): RoleAuthorityResponse!
        updateRoleAuthority(_id: ID!, roleId: String, module: [ROLE_MODULE], roleConstant: [ROLE_CONSTANT]): RoleAuthorityResponse!
        deleteRoleAuthority(_id: ID!): CategoryNormalResponse!

        # -----     S C H O O L     -----
        addSchool(districtId: String!, name: String!, cityId: String!): SchoolResponse!
        updateSchool(_id: ID!, districtId: String, name: String): SchoolResponse!
        deleteSchool(_id: ID!): CategoryNormalResponse!

        # -----     STUDENT MEMBER TYPE     -----
        addStudentMemberType(typeTitle: String!, descriptions: String, piece: Int): StudentMemberTypeResponse!
        updateStudentMemberType(_id: ID!, typeTitle: String, descriptions: String, piece: Int): StudentMemberTypeResponse!
        deleteStudentMemberType(_id: ID!): CategoryNormalResponse!

        # ------------ U N I V E R S I T Y ---------
        addUniversity(title: String!, department: String!, departmentPoint: String!, departmentScore: String!): UniversityResponse!
        updateUniversity(_id : String, title: String, department: String, departmentPoint: String, departmentScore: String): UniversityResponse!
        deleteUniversity(_id : String ) : CategoryNormalResponse!
        
        # ---------- Graduate Field ------------
        addGraduateField(title: String): GraduateFieldResponse!
        updateGraduateField(_id : String, title : String) : GraduateFieldResponse!
        deletedGraduateField(_id: String) : CategoryNormalResponse!

        #---------------- GRADUATE STATUS ------------
        addGraduateStatus(title : String, exam : String) : GraduateStatusResponse!
        updateGraduateStatus(_id : String, title : String, exam : String) : GraduateStatusResponse!
        deleteGraduateStatus(_id : String) : CategoryNormalResponse!

        # -------- C L A S S -------------------
        addClass(title: String, description: String, isPrivate: Boolean, isPublished: Boolean, studentsId: [String], teacherId: String, classCode: String) : ClassResponse!
        updateClass(_id: String, title: String, description: String, isPrivate: Boolean, isPublished: Boolean, studentsId: [String], teacherId: String, classCode: String) : ClassResponse!
        deleteClass(_id: String) : CategoryNormalResponse!
        addStudentToClass(classId: String, studentId: String) : CategoryNormalResponse!
        addStudentToClassByEmail(classId: String, email: String) : CategoryNormalResponse!
        getClassByTeacherId(_id: String): CategoryNormalResponse!
        
        # ---------- BULK ADITION --------------

            #------------- SCHOOL -------------------
            addSchoolsViaExcel(schools: [SchoolArray!]) : CategoryNormalResponse!
        
            #------------- CITY -------------------
            addCitiesViaExcel(cities: [CityArray!]) : CategoryNormalResponse!
        
            #------------- DISTRICT -------------------
            addDistrictViaExcel(districts: [DistrictArray!]) : CategoryNormalResponse!

            #------------- UNIVERSITY------------------
            addUniversityViaExcel(universities: [UniversityArray!]) : CategoryNormalResponse!

        # --------- ANSWER KEY EDITOR ROLE -------------
        addAnswerKeyEditorRoleForPracticeExam( admin: String, role: [EDITOR_CONSTANT], practiceExamSet: [String], bookletTest: [String]): AnswerKeyPraticeResponse!
        updateAnswerKeyEditorRoleForPracticeExam(_id : String, admin: String , role: [EDITOR_CONSTANT], practiceExamSet: [String], bookletTest: [String]): AnswerKeyPraticeResponse!
        deletedAnswerKeyEditorRoleForPracticeExam(_id : String) : CategoryNormalResponse!
        #------------------ Q U E S T I O N  B O O K
        addAnswerKeyEditorRoleForQuestionBook( admin: String, book: String, BookUnit: [String], BookUnitSection: [String], tests: [String], role: [EDITOR_CONSTANT]): AnswerKeyQuestionResponse!
        updateAnswerKeyEditorRoleForQuestionBook(_id : String, admin: String, book: String, BookUnit: [String], BookUnitSection: [String], tests: [String], role: [EDITOR_CONSTANT]): AnswerKeyQuestionResponse!
        deletedAnswerKeyEditorRoleForQuestionBook(_id : String) : CategoryNormalResponse!
    }

    type CategoryNormalResponse { status: String!, message: String!, content: JSON }

    type CategoryResponse { status: String!, message: String!, content: Category }
    type CategorysResponse { status: String!, message: String!, content: [Category] }

    type CityResponse { status: String!, message: String!, content: City }
    type CitysResponse { status: String!, message: String!, content: [City] }

    type DistrictResponse { status: String!, message: String!, content: District }
    type DistrictsResponse { status: String!, message: String!, content: [District] }

    type GraduateFieldResponse { status: String!, message: String!, content: GraduateField }
    type GraduateFieldsResponse { status: String!, message: String!, content: [GraduateField] }

    type GraduateStatusResponse { status: String!, message: String!, content: GraduateStatus }
    type GraduateStatussResponse { status: String!, message: String!, content: [GraduateStatus] }

    type RoleResponse { status: String!, message: String!, content: Role }
    type RolesResponse { status: String!, message: String!, content: [Role] }

    type RoleAuthorityResponse { status: String!, message: String!, content: RoleAuthority }
    type RoleAuthoritysResponse { status: String!, message: String!, content: [RoleAuthority] }
    
    type SchoolResponse { status: String!, message: String!, content: School }
    type SchoolsResponse { status: String!, message: String!, content: [School] }

    type StudentMemberTypeResponse { status: String!, message: String, content: StudentMemberType }
    type StudentMemberTypesResponse { status: String!, message: String, content: [StudentMemberType] }

    type ClassResponse { status: String!, message: String!, content: Class }
    type ClasssResponse { status: String!, message: String!, content: [Class] }

    type UniversityResponse { status: String!, message: String!, content: University }
    type UniversitysResponse { status: String!, message: String!, content: [University] }

    type AnswerKeyQuestionResponse { status: String!, message: String!, content: AnswerKeyEditorQuestion }
    type AnswerKeyQuestionsResponse { status: String!, message: String!, content: [AnswerKeyEditorQuestion] }

    type AnswerKeyPraticeResponse { status: String!, message: String!, content: AnswerKeyEditorPratice }
    type AnswerKeyPraticesResponse { status: String!, message: String!, content: [AnswerKeyEditorPratice] }
`;