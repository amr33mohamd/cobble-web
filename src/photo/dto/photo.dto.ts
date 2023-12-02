import { IsString, IsUrl,IsIn } from 'class-validator';

export class Photo {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsString({ message: 'File type must be either "jpg" or "png"' })
  @IsIn(['jpg', 'png'], { message: 'File type must be either "jpg" or "png"' })
  fileType: string;

    @IsString()
    size: string;    

}