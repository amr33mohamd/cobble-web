import { Body, Controller, Post, Get, UploadedFiles,UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('sign-up')
    @UseInterceptors(FilesInterceptor('photos'))
    async signUp(@UploadedFiles() photos: Array<Express.Multer.File>,@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(photos,createUserDto);
    }

   

    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
