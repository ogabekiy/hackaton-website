import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Event } from "src/events/event.model";

@Table({tableName: 'medias'})
export class Media extends Model<Media> {
    @ForeignKey(() => Event)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    event_id: number

    @Column(({
        type: DataType.STRING,
        allowNull: false
    }))
    url: string

    @BelongsTo(() => Event)
    event: Event
}