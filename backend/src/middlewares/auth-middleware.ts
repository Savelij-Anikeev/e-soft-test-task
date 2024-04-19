import APIError from "../exceptions/api-error";
import {Request, Response, NextFunction} from "express-serve-static-core";
import SessionService from "../services/SessionService";

// import TokenService from "../services/token-service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = req.cookies["sessionId"];
        if(!session) {
            throw APIError.UnauthorizedError('you should be authorized');
        }

        const userData = await SessionService.verify(session);
        if(!userData) {
            throw APIError.UnauthorizedError('invalid session');
        }
        
        next();

    } catch (e) {
        console.log(e);
        
        return next(APIError.UnauthorizedError());
    }
}