import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private UserModel: typeof User){}

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

  async findAll() {
    return await this.UserModel.findAll();
  }

  async findOne(id: number) {
    const data = await this.UserModel.findOne({where: {id}});
    if(!data) {
      throw new NotFoundException('User not found');
    }
    return data
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(+id);

    const updatedUser = await this.UserModel.update(updateUserDto, {
      where: { id },}
    );
    return updatedUser
  }

  async updateProfile(id: number, profilePhoto: string) {
    await this.findOne(+id);

   const updatedUser = await this.UserModel.update({ profile_photo: profilePhoto }, {
      where: { id },
    });
    return updatedUser
  }

  async remove(id: number) {
    await this.findOne(+id);
    return this.UserModel.destroy({
      where: { id },
    });
  }
}
