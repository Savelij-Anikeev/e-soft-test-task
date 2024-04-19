export type BaseUserType = {
    id: string
    firstName: string
    secondName: string
    thirdName: string | undefined
    login: string
    password: string
    supervisor: BaseUserType | undefined
    subordinates: BaseUserType[] | undefined
}

export type UserCreateType = Omit<BaseUserType, "id">

export type UserGetType = Omit<BaseUserType, "password">
