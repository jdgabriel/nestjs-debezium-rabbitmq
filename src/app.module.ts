import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaModule } from './database/prisma.module'
import { RabbitModule } from './rabbitmq/rabbitmq.module'

@Module({
  imports: [PrismaModule, RabbitModule],
  controllers: [AppController],
})
export class AppModule {}
