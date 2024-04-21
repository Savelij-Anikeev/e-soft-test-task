import User from "../models/User";
import Session from "../models/Session";
import APIError from "../exceptions/api-error";
import { UserGetType } from "../types/models/userTypes";
import { BaseSessionType } from "../types/models/sessionTypes";


class SessionService {
    async create(user: User): Promise<BaseSessionType> {
        // creating session
        const session = await Session.create({owner: user.id });
        
        return session;
    }

    async verify(sessionId: string): Promise<UserGetType> {
        // return User object if ok, otherwise throws unauthorized error
        const session = await Session.findOne({ where: {id: sessionId}});
        if (!session) {
            throw APIError.UnauthorizedError('invalid session');
        }

        return session.owner;
    }

    async getAll() {
        return await Session.findAll();
    }
}

export default new SessionService();