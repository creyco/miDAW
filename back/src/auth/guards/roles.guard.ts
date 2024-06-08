import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext,): boolean {
    const roles: string[] = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
    if (!roles) {
      return true;
    }
    const { usuario } = context.switchToHttp().getRequest()

    if (!roles.some((role) => usuario.rol?.includes(role))) { // verifica que el rol del usuario este dentro de los valores del array
      throw new UnauthorizedException("Este Usuario no Posee Permisos !")
    }

    return true;
  }
}
