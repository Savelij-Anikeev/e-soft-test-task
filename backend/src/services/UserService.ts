import { BaseUserType, UserCreateType,  } from "../types/models/userTypes";

import { isRecordExists } from "../utils/helpers";

import User from "../models/User";
import APIError from "../exceptions/api-error";
import { UserGetDTO } from "../dto/models/userDTO";


class UserService {
    async create(data: UserCreateType): Promise<UserGetDTO> {
        const user = await User.create(data);

        return new UserGetDTO(user);
    }
    async getById(id: string): Promise<User> {
        try {
            const user = await User.findOne({where: {id}})
            await isRecordExists(user, id);

            // return new UserGetDTO(user!);
            return user!;
        } catch {
            throw APIError.BadRequestError('invalid id')
        }

    }
    async getAll(): Promise<UserGetDTO[]> {
        const users = (await User.findAll()).map(e => new UserGetDTO(e));

        return users;
    }
    async getRawByLogin(login: string): Promise<User> {
        const user = await User.findOne({where: {login}});
        await isRecordExists(user, login);

        return user!;
    }
    async updateOne(id: string, data: Partial<UserGetDTO>): Promise<UserGetDTO> {
        await User.update({...data}, { where: { id } });
        const user = await this.getById(id);
        return user;
    }
}

export default new UserService();