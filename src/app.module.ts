import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaModule } from './database/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
