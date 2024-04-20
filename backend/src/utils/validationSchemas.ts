import { Schema } from "express-validator";

// User
export const UserCreateValidationSchema: Schema = {
    firstName: {
        notEmpty: {
            errorMessage: "firstName cannot be empty"
        },
        isString: {
            errorMessage: "firstName should be string"
        }
    },
    secondName: {
        notEmpty: {
            errorMessage: "secondName cannot be empty"
        },
        isString: {
            errorMessage: "secondName should be string"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isString: {
            errorMessage: "Password should be string"
        },
        // isLength: {
        //     options: {
        //         min: 8
        //     },
        //     errorMessage: "Password's length should be bigger that 8"
        // }
    }
}

export const UserLoginValidationSchema: Schema = {
    login: {
        notEmpty: {
            errorMessage: "firstName cannot be empty"
        },
        isString: {
            errorMessage: 'login should be string'
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isString: {
            errorMessage: 'password should be string'
        }
    },
}

export const IdValidationSchema: Schema = {
    id: {
        in: ['params'],
        notEmpty: {
            errorMessage: "id cannot be empty"
        },
        isString: {
            errorMessage: "id should be string"
        }
    }
}


// Task
export const TaskCreateValidationsSchema: Schema = {
    header: {
        isString: {
            errorMessage: "header should be string value"
        },
        notEmpty: {
            errorMessage: "header cannot be empty"
        }
    },
    description: {
        isString: {
            errorMessage: "description should be string value"
        },
        notEmpty: {
            errorMessage: "description cannot be empty"
        }
    },
    expiresAt: {
        notEmpty: {
            errorMessage: "expire date cannot be empty"
        }
    },
    priority: {
        isString: {
            errorMessage: "description should be string value"
        },
        notEmpty: {
            errorMessage: "expire date cannot be empty"
        }
    },
    // status: {
    //     isString: {
    //         errorMessage: "description should be string value"
    //     },
    //     notEmpty: {
    //         errorMessage: "expire date cannot be empty"
    //     }
    // },
    responsibleId: {
        isString: {
            errorMessage: "responsible id should be string value"
        },
        notEmpty: {
            errorMessage: "responsible id cannot be empty"
        }
    }

}