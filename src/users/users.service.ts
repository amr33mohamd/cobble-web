import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const { email, password , firstName, lastName} = CreateUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });
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

    return this.userRepository.save(user);

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
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
