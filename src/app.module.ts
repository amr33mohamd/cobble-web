import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      password: 'Amr4321',
      username: 'amrmohamed',
      entities: ["dist/**/*.entity.js"],
      database: 'test',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    ClientModule,
    PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
