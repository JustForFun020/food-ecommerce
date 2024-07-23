import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

import { BaseGuard } from 'src/common/guard/base.guard';
import { Roles } from '../decorator/role.decorator';

@Injectable()
export class UserRolesGuard extends BaseGuard implements CanActivate {
  constructor(reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.getAllAndMerge<string[]>(Roles, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (this.isPublic(ctx)) {
      return true;
    }

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
