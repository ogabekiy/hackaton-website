import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from './event.model';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event) private eventModel: typeof Event) {}

  
  async create(createEventDto: CreateEventDto) {
    return await this.eventModel.create(createEventDto);
  }

  async findAll() {
    return await this.eventModel.findAll();
  }

  async findOne(id: number) {
    return await this.eventModel.findOne({ where: { id } });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    await this.findOne(id);
    const updatedEvent = await this.eventModel.update(updateEventDto, {
      where: { id },
    });
    return updatedEvent;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.eventModel.destroy({
      where: { id },
    });
  }
}
