import { Sequelize } from "sequelize-typescript";

import User from "../models/User";
import Task from "../models/Task";
import Session from "../models/Session";

const sequelize = new Sequelize(
    process.env.PG_DB!,
    process.env.PG_USER!,
    process.env.PG_PASS!,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
        models: [__dirname + '/models']
    }
)
sequelize.addModels([User, Task, Session])

export default sequelize;