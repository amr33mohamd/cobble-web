import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('sign-up')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

   

    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
