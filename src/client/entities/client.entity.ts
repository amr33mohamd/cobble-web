import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Photo } from '../../photo/entities/photo.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='})
  avatar: string;


  @OneToMany(type => Photo, photo => photo.client)
  photos: Photo[];

  
    User: any;
}