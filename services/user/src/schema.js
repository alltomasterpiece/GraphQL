const { gql } = require('apollo-server');
module.exports = gql`
    
    scalar JSON
    scalar Upload
    enum REACHED_TIME { Today, Tomorrow, Special }
    enum MONTH_OR_WEEK {MONTH, WEEK}

    type Friend @key (fields: "_id") {
        _id: String
        studentId: String
        teacherId: String
        isAccepted: Boolean
        isSenderAsStudent: Boolean
    }

    type Discount {
        _id: String,
        code: String,
        value: String
    }

    type Manager @key(fields: "_id"){
        _id: String
        roleId: String
        districtId: String
        isSystemAdministrator: Boolean
        name: String
        surname: String
        dateOfBirth: String
        password: String
        gsm: String
        email: String
        city: String
        district: String
        confirmationKey: Int
        isConfirmed: Boolean
        registrationDate: String
        facebook: String
        twitter: String
        instagram: String
        image: String
        token: String
    }

    type Publisher @key (fields: "_id") {
        _id: String,
        logo: String,
        name: String,
        email: String,
        phone: String,
        address: String,
    }

    type Privacy {
        _id: ID!,
        statement: String!
    }

    type Student @key(fields: "_id") {
        _id: String
        schoolId: String
        studentMemberTypeId: String,
        membershipStartDate : String,
        name: String
        gender : String
        surname: String
        dateOfBirth: String
        password: String
        gsm: String
        email: String
        username: String
        trIdentityno: String
        graduatefield: String 
        exam: String 
        examfield: String
        city: String 
        district: String 
        school: String 
        secondarySchool: String
        confirmationKey: Int
        isConfirmed: Boolean
        registrationDate: String
        facebook: String
        instagram: String
        twitter: String
        image: String
        token: String
        guideTeacher : [String]
        universityPreferenceList: [Preferences]
        classes : [String]
    }

    type Teacher @key(fields: "_id") {
        _id: String
        schoolId: String
        roleId: String
        name: String
        surname: String
        dateOfBirth: String
        password: String
        gsm: String
        school: String
        schoolBranch: [String]
        city: String
        district: String
        email: String
        confirmationKey: Int
        isConfirmed: Boolean
        registrationDate: String
        facebook: String
        instagram: String
        youtube : String
        twitter: String
        image: String
        token: String
        friends: [String]
        friendRequests: [String]
        students: [String]
    }

    type UploadedFileResponse {
        filename: String
        mimetype: String
        encoding: String
        url: String
    }

    type Admin {
        _id: String
        name: String
        surname: String
        email: String
        city: String
        district: String
        phone: String
        role: String
    }

    type UserPrivacy {
        _id: String
        statement: String
        identifier: Int 
    }

    type SocialMedia {
        _id: String
        title: String
        link: String
    }

    type PageStatus {
        _id: String
        title: String
        isDown: String
    }

    type Notification {
        _id: String
        title: String
        content: String
    }

    type Membership {
        _id: String
        title: String
        description: String
        price: String
        date: String
        paymenttitle: String
        productLink: String
        availableModule: [String]
    }

    type UniversityPreference {
        _id: String
        number: Int,
        title: String,
        department: String,
        departmentPoint: String,
        departmentScore: String
    }


    type Query {
        # -----   F R I E N D   -----
        friend(_id: ID!, forceUpdate: String): UserResponse
        friends(studentId: String, teacherId: String, isAccepted: Boolean, isSenderAsStudent: String, offset: Int, limit: Int): UserResponse

        # -----   M A N A G E R   -----
        manager(_id: ID!, forceUpdate: String): ManagerResponse
        managers(roleId: String, districtId: String, isConfirmed: Boolean, offset: Int, limit: Int, forceUpdate: String): ManagersResponse

        # -----   P U B L I S H E R   -----
        publisher(_id: ID!, forceUpdate: String): publisherResponse
        publishers(email: String, phone: String, name: String, address: String, offset: Int, limit: Int): publishersResponse

        # -----   S T U D E N T   -----
        student(_id: ID!, forceUpdate: String): StudentResponse
        students(schoolId: String, studentMemberTypeId: String, isConfirmed: Boolean, offset: Int, limit: Int, forceUpdate: String): StudentsResponse

        # -----   T E A C H E R   -----
        teacher(_id: ID!, forceUpdate: String): TeacherResponse!
        teachers(schoolId: String, roleId: String, isConfirmed: Boolean, offset: Int, limit: Int, forceUpdate: String): TeachersResponse!

        #------- P R I V A C Y  S T A T E M E N T -------
        getUserPrivacy: UserPrivacyResponse!

        #----- G E T  P A G E  S T A T U S ------------
        getPageStatus : PageStatusResponse!

        # ---- M E M B E R S H I P --------------
        getMembership(_id: String): MembershipResponse!
        getMemberships : MembershipsResponse!

        # ------ A D M I N ----------------
        getAdmin(_id : String) : AdminResponse!
        getAdmins : AdminsResponse!

        # ----- N O T I F I C A T I O N ----------
        getNotification(_id : String) : NotificationResponse!
        getNotifications : NotificationsResponse!

        #------ S O C I A L  M E D I A ---------
        getAllSocialMedia: SocialMediasResponse
        getSocialMedia: SocialMediaResponse

        #----------- G E T  S T U D E N T  U N I V E R S I T Y  P R E F E R E N C E   L I S T-----------
        getUniversityPreferenceList(studentId : String) :  UniversityPreferenceListResponse!

        #------- D I S C O U N T ------------
        getDiscountCode (_id: String) : DiscountResponse
        getDiscountCodes : DiscountsResponse

        #---------- BACKEND FOR ----------------
        #---------- GET TARGETS 7.0.1(77p) ----------------
        getTargets(studentId: String, day: String) : UserResponse
        #---------- 7.0.2 (78p)
        getTargetsAnalysisData(studentId: String, type: [MONTH_OR_WEEK]): UserResponse
        #---------- DAILY REPORT 7.0.3 (79p) --------------
        getDailyReportForTargets(studentId: String): UserResponse
        #-----------GET BEST OF THE DAY (7.1 80p)-------------------
        getBestOfDay(studentId: String): UserResponse
        #----------- GET TARGET (7.3 82P) -----------------
        getTarget(studentId: String, targetId: String): UserResponse
    }

    input Preference {
        number : Int,
        UniversityId : String
    }

    type Preferences {
        number : Int,
        UniversityId : String
    }

    type Mutation {

        # -----   F R I E N D   -----
        addFriend(studentId: String!, teacherId: String!, isAccepted: Boolean, isSenderAsStudent: Boolean!): UserResponse!
        updateFriend(_id: ID!, isAccepted: Boolean, isSenderAsStudent: Boolean): UserResponse!
        deleteFriend(_id: ID!): UserResponse!

        # -----   M A N A G E R   -----
        addManager( name: String!, surname: String!, email: String!, gsm: String!, city: String!, district: String!, password: String!): ManagerResponse!
        updateManager(  _id: ID!, roleId: String, districtId: String, isSystemAdministrator: Boolean, name: String, surname: String, dateOfBirth: String, gsm: String, facebook: String, twitter: String, instagram: String, image: String ): ManagerResponse!
        deleteManager( _id: ID! ): UserResponse!
        confirmManager( _id: ID!, confirmationKey: Int! ): UserResponse!
        getToken( email: String!, password: String!, clientType: String! ): UserResponse!
        verifyToken( token: String! ): UserResponse!
        
        # -----   P U B L I S H E R   -----
        addPublisher(logo: String!, name: String!, email: String!, phone: String!, address: String!): publisherResponse!
        updatePublisher(_id: ID!, name: String, phone: String, address: String): publisherResponse!
        deletePublisher(_id: ID!): UserResponse!

        # -----   S T U D E N T   -----
        addStudent(image: String, username: String, name: String, surname: String, dateOfBirth: String, gender: String, trIdentityno: String, graduatefield: String, exam: String!, examfield: String, password: String, gsm: String, email: String, city: String, district: String, school: String, secondarySchool: String, twitter: String, instagram: String): StudentResponse!
        updateStudent(_id: ID!, image: String, username: String, name: String, surname: String, dateOfBirth: String, gender: String, trIdentityno: String, graduatefield: String, exam: String, examfield: String, gsm: String, email: String, city: String, district: String, school: String, secondarySchool: String, twitter: String, instagram: String): StudentResponse!
        deleteStudent(_id: ID!): UserResponse!
        confirmStudent(_id: ID!, confirmationKey: Int!): UserResponse!

        # -----   T E A C H E R   -----
        addTeacher(name: String!, surname: String!, password: String!, gsm: String!, email: String!, city: String!, district: String!, school: String!, schoolBranch: [String]!, youtube : String, instagram : String, twitter: String, image: String ): TeacherResponse!
        updateTeacher(_id: String!, name: String, surname: String, gsm: String, city: String, district: String, school: String, schoolBranch: [String], youtube : String, instagram : String, twitter: String, image: String): TeacherResponse!
        deleteTeacher(_id: ID!): UserResponse!
        confirmTeacher(_id: ID!, confirmationKey: Int!): UserResponse!
        sendFriendRequest(studentId: String, teacherId: String): UserResponse!
        acceptFriendRequest(studentId: String, teacherId: String): UserResponse!
        getTeacherStudent(_id: String): TeacherResponse

        # ---------- V E R I F I C A T I O N -----------
        sendMobileVerification(gsm: String!) : UserResponse!
        verifiyMobileCode(id: String!, secret: String!) : UserResponse!
        verifyUserEmail(token: String!, type: String!): UserResponse!
        sendPasswordResetLink(email: String!, type: String!) : UserResponse!
        resetUserPassword(userId: String!, password: String!, type: String!) : UserResponse!

        # ------------  A D M I N O P S --------------------
        addUserPrivacy(statement:String!): UserPrivacyResponse!
        updatedUserPrivacy(_id:ID, statement: String!): UserPrivacyResponse!
        deleteUserPrivacy(_id: ID!): UserPrivacyResponse!

        #-------------- M E M B E R S H I P ----------------
        addMembership(title: String, description: String, price: String, date: String, paymenttitle: String, productLink: String, availableModule: [String]) : MembershipResponse
        updateMembership(_id : String, title: String, description: String, price: String, date: String, paymenttitle: String, productLink: String, availableModule: [String]) : MembershipResponse
        deleteMembership(_id : String) : UserResponse!
        getNumberOfStudentInAMembership(_id : String) : UserResponse!

        #-------------- U S E R  M A N A G E M E N T --------
        addAdmin(name: String, surname: String, email: String, city: String, district: String, phone: String, role: String): AdminResponse!
        updateAdmin(_id : String , name: String, surname: String, email: String, city: String, district: String, phone: String, role: String): AdminResponse!
        deleteAdmin(_id: String) : UserResponse!

        updatePageStatus(title: String, isDown: Boolean): PageStatusResponse!

        #-------------- N O T I F I C A T I O N -------------
        addNotification(title: String, content: String): NotificationResponse!
        updateNotification(_id : String, title: String, content: String): NotificationResponse!
        deleteNotification(_id: String) : UserResponse!

        #---------- U P L O A D  A P I ------------------
        uploadFile(file: Upload!): UploadedFileResponse!

        #------------ A D D I T I O N A L----------------
        getStudentsInGraduateField(_id: String, name: String) : UserResponse
        addSocialMedia(title: String, link: String) : SocialMediaResponse
        updateSocialMedia(_id: String, title: String, link: String) : SocialMediaResponse
        deleteSocialMedia(_id: String) : UserResponse!

        #------------ F O R   D E V M O D E ----------------------
        clearUserBase: UserResponse!
        verifyUser(_id: String, type : String) : UserResponse!

        #----------- A D D  S T U D E N T  U N I V E R S I T Y  P R E F E R E N C E   L I S T-----------
        addUniversitytoPreferenceList(studentId : String, universityId : [Preference]) :  StudentResponse
        deleteUniversityFromPreferenceList(studentId : String, universityId : Preference) : UserResponse

        #------------ D I S C O U N T  C O D E --------------------
        addDiscountCode(code : String, value: String) : DiscountResponse
        updateDiscountCode(_id: String, code : String, value: String) : DiscountResponse
        deleteDiscountCode (_id: String) : UserResponse

        getNumberOfStudentInAMembershipInAPeriod(_id: String, startDate: String, endDate: String) : UserResponse

        #------------ BACKEND FOR CHAPTER 7 -------------------------
        #------------- ADD TARGET -----------------------------------
        addTarget(studentId: String, name: String, targetedTime: Int, startTime: String, reachedTime: REACHED_TIME, reachedStartTime: String, reachedEndTime: String, studyDay: [Int], color: String) : UserResponse
    }

    type UserResponse { status: String!,  message: String!, content: JSON }
    type AdminResponse {status: String!, message: String, content: Admin}
    type AdminsResponse {status: String!, message: String, content: [Admin]}
    type UserPrivacyResponse {status: String!, message: String, content: [UserPrivacy]}
    type StudentResponse { status: String!, message: String!, content: Student }
    type StudentsResponse { status: String!, message: String!, content: [Student] }
    type TeacherResponse { status: String!, message: String!, content: Teacher }
    type TeachersResponse { status: String!, message: String!, content: [Teacher] }
    type ManagerResponse { status: String!, message: String!, content: Manager }
    type ManagersResponse { status: String!, message: String!, content: [Manager] }
    type SocialMediaResponse { status: String!, message: String!, content:SocialMedia}
    type SocialMediasResponse { status: String!, message: String!, content:[SocialMedia]}
    type publisherResponse { status: String!, message: String!, content: Publisher} 
    type publishersResponse { status: String!, message: String!, content:[Publisher]}
    type PageStatusResponse { status: String!, message: String!, content: PageStatus}
    type NotificationResponse { status: String!, message: String!, content: Notification}
    type NotificationsResponse { status: String!, message: String!, content: [Notification]}
    type MembershipResponse { status: String!, message: String!, content: Membership}
    type MembershipsResponse { status: String!, message: String!, content: [Membership]}
    type UniversityPreferenceListResponse {status: String!, message: String!, content: [UniversityPreference]}
    type DiscountResponse {status: String!, message: String!, content: Discount}
    type DiscountsResponse {status: String!, message: String!, content: [Discount]}
`;