export type UserType = {
    id: string;
    firstName: string;
    secondName: string;
    thirdName: string;
    shortName?: string | undefined;
    login: string;
    password?: string;
    supervisor: string | null;
}