import { Controller, Post, Body } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authsService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    console.log('xa');
    
    return this.authsService.login(loginAuthDto);
  }
}
