import { MulterModule } from '@nestjs/platform-express';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { Media } from './media.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SequelizeModule.forFeature([Media]),
    MulterModule.register(), // <-- SHU SHART
  ],
  controllers: [MediasController],
  providers: [MediasService],
  exports: [MediasService],
})
export class MediasModule {}
