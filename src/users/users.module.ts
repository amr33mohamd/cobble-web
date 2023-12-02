import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from 'src/photo/photo.service';
import { Photo } from 'src/photo/entities/photo.entity';
import { S3Service } from 'src/s3/s3.service';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Photo,Client])],
  controllers: [UsersController],
  providers: [UsersService,PhotoService,S3Service],
  exports: [UsersService],
})
export class UsersModule {}
