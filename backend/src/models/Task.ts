import { Table, Column, DataType, Model, ForeignKey, HasMany, BelongsTo, HasOne, Sequelize} from 'sequelize-typescript';

import User from './User';
import { Optional } from 'sequelize';
import { NonAttribute } from 'sequelize';

@Table({timestamps: true, modelName: 'Task', tableName: 'tasks'})
class Task extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING
    })
    declare header: string;

    @Column({
        type: DataType.STRING
    })
    declare description: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare expiresAt: Date;

    @Column({
        type: DataType.ENUM('высокий', 'средний', 'низкий'),
        allowNull: false,
    })
    declare priority: string;

    @Column({
        type: DataType.ENUM('К выполнению', 'выполняется', 'выполнена', 'отменена'),
        defaultValue: 'К выполнению',
        allowNull: false,
    })
    declare status: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare creatorId: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    declare responsibleId: string;
}

export default Task;
