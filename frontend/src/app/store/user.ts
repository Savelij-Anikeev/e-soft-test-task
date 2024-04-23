import { makeAutoObservable } from "mobx";

import { UserType } from "../types/user";


class User {
    data: UserType | undefined = this.getInitData();
    subordinates: UserType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addShortName() {
        // creating shor name, e.g. `Ivanov I. I.` from `Ivanon Ivan Ivanovich`
        if(this.data) {
            this.data.shortName = this.data.firstName + ' ' + 
            this.data.secondName.at(0)+ '.';
            if (this.data.thirdName) this.data.shortName += this.data?.thirdName.at(0) + ' .'
        }
    }

    setData(data: UserType | undefined) {
        this.data = data;
        this.addShortName();
        localStorage.setItem('userData', JSON.stringify(data));
    }

    setSubordinates(data: UserType[]) {
        this.subordinates = [];
        this.subordinates = data;
    }

    getInitData() {
        const data = localStorage.getItem('userData');
        try {
            return JSON.parse(data!);
        }  catch {
            return undefined;
        } 
    }

}

export default new User();