import { Table, Column, DataType, Model, ForeignKey } from 'sequelize-typescript';

import User from './User';

@Table({timestamps: true, modelName: 'Session', tableName: 'userSessions'})
class Session extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @ForeignKey(() => User)
    declare owner: User;
}

export default Session;