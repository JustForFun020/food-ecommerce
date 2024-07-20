import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Roles } from './decorator/role.decorator';
import { UserRolesGuard } from './guard/user-roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(UserRolesGuard)
@Roles(['ADMIN'])
@Resolver()
export class UserResolver {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}

  @Roles(['USER'])
  @Query(() => User)
  async getUserByUsername(@Args('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['USER'])
  @Mutation(() => User)
  async updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @UseGuards(UserRolesGuard)
  @Roles(['ADMIN'])
  @Query(() => [User])
  async getAllUser() {
    return this.userService.getAllUser();
  }
}
