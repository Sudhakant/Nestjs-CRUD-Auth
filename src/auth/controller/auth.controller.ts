import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: User) {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  login(@Body() user: User) {
    return this.authService.login(user).then((jwt: string) => {
      return { token: jwt };
    });
  }

  // @Post('test')
  // validate(@Body() cred_obj: { email: string; password: string }) {
  //   // console.log(cred_obj);
  //   return this.authService.validateUser(cred_obj.email, cred_obj.password);
  // }
}
