import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Public } from '@thallesp/nestjs-better-auth';
import { ZodResponse } from 'nestjs-zod';
import { UserEntity } from './dto/user.dto';

@Public()
@Controller('users')
export class UserController {

  @Get()
  @ZodResponse({
    type: [UserEntity]
  })
  async getUsers() {
    return [

    ];
  }

  @Post()
  async createUser() {
    return { message: 'User created' };
  }

  @Get(':id')
  async getUserById() {
    return { id: 1, name: 'John Doe' };
  }

  @Put(':id')
  async updateUser() {
    return { message: 'User updated' };
  }

  @Delete(':id')
  async deleteUser() {
    return { message: 'User deleted' };
  }
}
