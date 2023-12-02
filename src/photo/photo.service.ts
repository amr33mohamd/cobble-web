import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { S3Service } from '../s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(private readonly s3Service: S3Service,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
) {}

  create(createPhotoDto: CreatePhotoDto) {
    //upload multiple files to s3 bucket and get all the urls from s3
    

  }
  

  findAll() {
    return this.photoRepository.find({relations:['client']});
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
