import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'users'})
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    surname: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: [9, 9]
        }
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })      
    birthday: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    profile_photo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isIn: [['user', 'admin']],
        },
        defaultValue: 'user'
    })
    role: string;
    
}