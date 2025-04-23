import { Controller, Get, Post, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Query('event_id') eventId: number) {
    const media = await this.mediasService.uploadFile(file, eventId);
    return media;
  }

  @Get()
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }

  @Get('url/signed')
  async getSignedUrl(@Query('key') key: string) {
    const url = await this.mediasService.getSignedUrl(key);
    return { url };
  }
}
