import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async registerAccount(user: User) {
    // console.log(bcrypt.hash(password, 12));
    // bcrypt.hash(password, 12).then((p) => console.log(p));
    //  return bcrypt.hash(password, 12);

    const { firstName, lastName, email, password } = user;
    // console.log(user);
    return await bcrypt.hash(password, 12).then((hashedPassword) => {
      user.password = hashedPassword;

      //   console.log(user);

      return this.userRepository
        .save({
          firstName,
          lastName,
          email,
          password: user.password,
        })
        .then((createdUser) => {
          // console.log(createdUser);
          delete createdUser.password;
          return createdUser
        })
        .catch(() => {
          // console.log('You already exist. Please login again');
          return 'Hey, It seems like You are already a part of our Family. Please login again'
        });
    });

    // delete user.password;
    // return user;
  }

  async validateUser(email_in: string, password_in: string) {
    // return this.userRepository.findOne({ where: {email} })
    // console.log('Hi Hello ' + email_in);
    return this.userRepository
      .findOne({
        where: { email: email_in },
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
      })
      .then((user: UserEntity) => {
        // console.log(user, user.id);
        // console.log(password_in, user.password);
        return bcrypt
          .compare(password_in, user.password)
          .then((isValidPassword) => {
            // console.log(isValidPassword);

            if (isValidPassword) {
              // console.log(user);
              delete user.password;
              return user;
            }
          });
      });
  }

  async login(user: User) {
    const { email, password } = user;
    return this.validateUser(email, password).then((validUser) => {
      // console.log(validUser),
      if (validUser) {
        // Create JWT - cred
        return this.jwtService.signAsync({ validUser });
      }
    });
  }
}
