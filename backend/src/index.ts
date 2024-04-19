import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

import { Express } from "express"
import createApp from "./createApp";

import sequelize from "./utils/database";

const app: Express = createApp();
const PORT: number = 5000;

// listening
sequelize.sync()
.then(() => 
    app.listen(PORT, (): void => {
        console.log(`just started at ${PORT}`);
    })
).catch(err => console.log(err))
