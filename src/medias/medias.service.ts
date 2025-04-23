import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Media } from './media.model';

@Injectable()
export class MediasService {
  private s3: S3Client;
  private bucket = process.env.R2_BUCKET_NAME;

  constructor(
    @InjectModel(Media) private mediaModel: typeof Media,
  ) {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
  }
  
  async uploadFile(file: Express.Multer.File, eventId: number): Promise<Media> {

    console.log('hi');
    
    const key = `media/${Date.now()}-${file.originalname}`;
    console.log('key', key);
    console.log({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    
    await this.s3.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    console.log('hi2')
    const fileUrl = key;

    const media = await this.mediaModel.create({
      url: fileUrl,
      event_id: eventId,
    });

    return media;
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }

  async findAll() {
    const result = await this.s3.send(new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: '/', // optional: agar faqat `media/` papkasi ichidagilar kerak bo‘lsa
    }));
  
    // result.Contents — fayllar haqida ma'lumotlar massiv
    return result.Contents?.map((item) => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
    }));
  }

  findOne(id: number) {
    return this.mediaModel.findByPk(id);
  }

  async remove(id: number) {
    const media = await this.mediaModel.findByPk(id);
    if (media) {
      await media.destroy();
      return { message: 'Deleted successfully' };
    }
    return { message: 'Media not found' };
  }
}
