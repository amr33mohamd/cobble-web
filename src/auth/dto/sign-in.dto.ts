import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  

  
  export class SignInDto {
    
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format.' })    
    email: string;
  
    @IsNotEmpty()
    password: string;
  }