import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordIsValid = await user.validatePassword(password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User | null;

    try {
        user = await this.usersService.findOne(payload.sub);
    } catch (error) {
        throw new UnauthorizedException(
            `There isn't any user with id: ${payload.sub}`,
        );
    }

    if (!user) {
        throw new UnauthorizedException(
            `There isn't any user with id: ${payload.sub}`,
        );
    }

    return user;
}
}
