import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Photo } from '../../photo/dto/photo.dto';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'first Name must have atleast 2 characters.' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'last Name must have atleast 2 characters.' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
  })
  password: string;

//   @IsArray()
//   @ArrayMinSize(1, { message: 'At least 4 photos are required' })
//   @ValidateNested({ each: true })
//   @Type(() => Photo)
//   readonly photos: Photo[];
}
