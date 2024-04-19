import User from "../../models/User"

export class UserGetDTO {
    id: string
    firstName: string
    secondName: string
    thirdName: string | undefined
    login: string
    supervisor: UserGetDTO | undefined | string
    subordinates: UserGetDTO[] | undefined | string

    constructor(model: User) {
        this.id = model.id;
        this.firstName = model.firstName;
        this.secondName = model.secondName;
        this.thirdName = model.thirdName;
        this.login = model.login;
        this.supervisor = model.supervisor || undefined;
        this.subordinates = model.subordinates || undefined;
    }
}
