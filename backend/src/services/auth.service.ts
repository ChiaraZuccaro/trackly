import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { RespCodes } from "@enums/errors.enum";

const SECURITY_LEVEL = 10;
const prisma = new PrismaClient();

export class AuthService {
  private request: Request;

  constructor(req: any) { this.request = req; }
  
  public async register() {
    const user: any = this.request.body;
    const isUserExists = await prisma.user.findUnique({ where: { email: user?.email } });

    if(isUserExists) throw RespCodes.CONFLICT;
    if(!user.email || !user.name || !user.pw) throw RespCodes.BAD_REQUEST;

    const hashedPassword = await bcrypt.hash(user.pw, SECURITY_LEVEL);
    await prisma.user.create({
      data: { name: user.name, email: user.email, password: hashedPassword }
    });
  }

  public async login() {

    console.log('loggato!');
  }
}


