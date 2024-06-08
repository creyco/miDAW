import { CanActivate, ExecutionContext, Injectable, Module, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('Credenciales Invalidas !')
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      request.usuario = payload;

    } catch {
      throw new UnauthorizedException('Credenciales Invalidas !')
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
