import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'
import { RabbitMQService } from './rabbitmq.service'

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => {
        return {
          exchanges: [{ name: 'debezium.exchange', type: 'direct' }],
          uri: 'amqp://admin:admin@localhost:5672/vhost',
          prefetchCount: 1,
          connectionInitOptions: { wait: true },
          enableControllerDiscovery: true,
        }
      },
    }),
  ],
  exports: [RabbitMQService],
  providers: [RabbitMQService],
})
export class RabbitModule {}
