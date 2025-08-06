import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import { RespCodes } from "@enums/errors.enum";
import { LoginUser, RegisterUser } from "@interfaces/auth.interface";
import type { Request } from 'express';
import { User } from "@models/User.model";

const SECURITY_LEVEL = 10;
const MAX_TIME = '2h';
const JWT = process.env.JWT_PASS || 'default_secret_fallback';
const prisma = new PrismaClient();

export class AuthService {
  private request: Request;

  constructor(req: Request) { this.request = req; }
  
  public async register() {
    const user: RegisterUser = this.request.body;
    const isUserExists = await prisma.user.findUnique({ where: { email: user?.email } });

    if(isUserExists) throw RespCodes.CONFLICT;
    if(!user.email || !user.name || !user.pw) throw RespCodes.BAD_REQUEST;

    const hashedPassword = await bcrypt.hash(user.pw, SECURITY_LEVEL);
    await prisma.user.create({
      data: { name: user.name, email: user.email, password: hashedPassword }
    });
  }

  public async login() {
    const user: LoginUser = this.request.body;
    const findedUser = await prisma.user.findUnique({ where: { email: user.email } });
    if(!findedUser) throw RespCodes.NOT_FOUND;

    const userEty = new User(findedUser);
    if(!user.email || !user.pw) throw RespCodes.BAD_REQUEST;

    const isPwCorrect = await bcrypt.compare(user.pw, userEty.password);
    if(!isPwCorrect) throw RespCodes.UNAUTHORIZED;

    const token = jwt.sign(
      { id: userEty.id, email: userEty.email },
      JWT, { expiresIn: MAX_TIME }
    );

    return { token };
  }

  public recoverPw() {
    //TODO
  }
}