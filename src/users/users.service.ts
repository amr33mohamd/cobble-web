import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../photo/entities/photo.entity';
import { PhotoService } from '../photo/photo.service';
import * as bcrypt from 'bcrypt';
import { S3Service } from '../s3/s3.service';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly s3Service: S3Service,
    private readonly photoService: PhotoService,
  ) {}
  async uploadPhoto(
    file: Express.Multer.File,
    userId: number,
  ): Promise<string> {
    const folderName = `user-${userId}`;
    return this.s3Service.uploadFile(file, folderName);
  }
  async create(
    photos: Express.Multer.File[],
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const { email, password, firstName, lastName } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const client = this.clientRepository.create({
      avatar: 'https://picsum.photos/200/300',
    });

    user.client = client;

    // Create an array to store the created photo entities
    const photosModule = [];

    // Iterate through each photo and create Photo entities
    for (let i = 0; i < photos.length; i++) {
      const image = photos[i];
      const url = await this.uploadPhoto(image, i + 2);

      // Create a new Photo entity
      const photo = this.photoRepository.create({ url, name: `Photo${i + 2}` });

      // Associate the photo with the client
      photo.client = client;

      // Push the created photo entity to the array
      photosModule.push(photo);
    }

    // Associate the photos with the client
    await this.userRepository.save(user);
    await this.photoRepository.save(photosModule);

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(
    id: number,
    relations = ['client', 'client.photos'],
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations,
    });
    return user || null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
