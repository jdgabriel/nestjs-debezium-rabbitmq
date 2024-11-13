import { faker } from '@faker-js/faker'
import { Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { PrismaService } from './database/prisma.service'

@Controller('users')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async fetchUsers() {
    return await this.prisma.user.findMany()
  }

  @Post()
  async create() {
    return await this.prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
      },
    })
  }

  @Patch(':id')
  async path(@Param('id') id: number) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
      },
    })
  }
}
