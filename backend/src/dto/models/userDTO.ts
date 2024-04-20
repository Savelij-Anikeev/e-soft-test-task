import User from "../../models/User"

export class UserGetDTO {
    id: string
    firstName: string
    secondName: string
    thirdName: string | undefined
    login: string
    supervisor: UserGetDTO | undefined | string | null
    subordinates: UserGetDTO[] | undefined | string | null

    constructor(model: User) {
        this.id = model.id;
        this.firstName = model.firstName;
        this.secondName = model.secondName;
        this.thirdName = model.thirdName;
        this.login = model.login;
        this.supervisor = model.supervisor;
        this.subordinates = model.subordinates;
    }
}
