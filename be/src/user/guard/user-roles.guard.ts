import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Roles } from '../decorator/role.decorator';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.getAllAndMerge<string[]>(Roles, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    const user = ctx.getContext().req.user;
    const { roles: userRoles } = user;
    const hasRole = userRoles.map((role) => {
      return roles.includes(role.name);
    });

    if (!roles) {
      return true;
    }

    return hasRole.includes(true);
  }
}
