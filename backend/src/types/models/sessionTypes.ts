import User from "../../models/User"

export type BaseSessionType = {
    id: string
    owner: User

}