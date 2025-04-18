import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ConfigService } from 'src/common/config/config.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthsService {
  constructor(@InjectModel(User) private UserModel: typeof User,
  @Inject() private configService:ConfigService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const dataUserbyPhone = await this.UserModel.findOne({where: {phone_number: createUserDto.phone_number}});
        const dataUserbyEmail = await this.UserModel.findOne({where: {email: createUserDto.email}});
    
        if(dataUserbyPhone || dataUserbyEmail) {
          throw new ForbiddenException('User with this phone number or email already exists');
        }
    
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        
        const newUser = await this.UserModel.create(createUserDto);
    
        return newUser;
  }

  async login(loginAuthDto: LoginAuthDto) {

    const user = await this.UserModel.findOne({where: {email: loginAuthDto.email}});
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const isPasswordMatching = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isPasswordMatching) {
      throw new ForbiddenException('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, this.configService.get('JWT_SECRET'), {
      expiresIn: '1h',
    });

    return {
      access_token: token,
      user
    };

  }
  
  
}
