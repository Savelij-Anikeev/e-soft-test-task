import { Table, Column, DataType, Model, ForeignKey, HasMany, BeforeCreate, BelongsToMany, BelongsTo, HasOne } from 'sequelize-typescript';

import * as uuid from 'uuid';

import Session from './Session';
import Task from './Task';


@Table({timestamps: true, modelName: 'User', tableName: 'users'})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare secondName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare thirdName: string;

    @Column({
        primaryKey: true,
        type: DataType.STRING,
    })
    declare login: string;

    @Column({
        type: DataType.STRING,
    })
    declare password: string;

    @ForeignKey(() => User)
    @Column({type: DataType.UUID})
    declare supervisor: User;

    @HasMany(() => User)
    declare subordinates: User[]; 

    @HasMany(() => Session)
    declare sessions: Session[];
}

export default User;
