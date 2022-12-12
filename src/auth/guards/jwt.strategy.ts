import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // console.log(payload)
    // console.log(payload.validUser.email)
    // return { ...payload.validUser };

    return await this.userRepository
      .findOne({
        where: { email: payload.validUser.email },
      })
      .then((user: UserEntity) => {
        if (user) {
          console.log('Valid User', user);
          return { ...payload.validUser };
        }
        return 'Please create a fresh new account to access the feed services';
      });
  }
}
