import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Media } from "src/medias/media.model";

@Table({tableName: 'events'})
export class Event extends Model<Event>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    location: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true
    })
    season_number: number

    @Column({
        type: DataType.DATE,
        allowNull: true
    })  
    event_date: Date

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    timer_end : Date

    @HasMany(() => Media)
    medias: Media[]
}