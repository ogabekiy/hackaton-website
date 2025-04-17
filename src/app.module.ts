import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './common/shared.module';

@Module({
  imports: [UsersModule,

    SharedModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: process.env.DB_NAME,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      autoLoadModels: true, 
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
