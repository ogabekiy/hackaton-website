import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
