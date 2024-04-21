import { validationResult } from "express-validator";
import { Request } from "express-serve-static-core";

import * as bcryptjs from "bcryptjs";
import * as uuid from "uuid";

import APIError from "../exceptions/api-error";

import { Model } from "sequelize-typescript";


const hashSalt: number = 5;


export const checkValidationErrors = async (req: Request): Promise<undefined> => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        throw APIError.BadRequestError(result.array()[0].msg);
    }
}
export const isRecordExists = async(record: Model | null, id: string): Promise<undefined> => {
    if (!record) {
        throw APIError.NotFoundError(`Cannot find ${record} with ${id}`);
    }
}

export const hashPassword = async (password: string): Promise<string> => {
    return await bcryptjs.hash(password, hashSalt);
}

export const compareHashedPasswords = async (password: string, hashed: string): Promise<undefined> => {
    if(!await bcryptjs.compare(password, hashed)) {
        throw APIError.BadRequestError('invalid password');
    }
}

export const generateLogin = async (): Promise<string> => {
        return '@user-' + String(uuid.v4()).slice(0, 8);
}
