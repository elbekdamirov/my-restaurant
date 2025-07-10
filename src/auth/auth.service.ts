import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { User } from "../users/model/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/signin-user.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
    // private readonly adminService: AdminService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      role: user.roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newUser = await this.usersService.create(createUserDto);

    // sendMail;
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return {
      message:
        "Ro'yxatdan o'tdingiz. Accountni faollashtirish uchun emailni tasdiqlang!",
    };
  }

  async activate(activation_link: string) {
    return this.usersService.activateUser(activation_link);
  }

  async signin(signinUserDto: SigninUserDto, res: Response) {
    const user = await this.usersService.getUserByEmail(signinUserDto.email);

    if (!user) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const refresh_token = await bcrypt.hash(refreshToken, 7);

    await this.usersService.updateRefreshToken(user.id, refresh_token);

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: user.id, accessToken };
  }

  async signout(refreshToken: string, res: Response) {
    let userData: any;
    try {
      userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!userData) {
      throw new ForbiddenException("User not verified");
    }

    await this.usersService.updateRefreshToken(userData.id, "");

    res.clearCookie("refreshToken");
    return {
      message: "User logged out successfully",
    };
  }

  async refreshToken(
    userId: number,
    refreshTokenFromCookie: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }

    const user = await this.usersService.findOne(userId);

    if (!user || !user.refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      user.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.usersService.updateRefreshToken(user.id, refresh_token);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      accessToken: accessToken,
    };
    return response;
  }
}
