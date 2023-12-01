import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
        });  
    }
    
    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.authService.verifyPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
}