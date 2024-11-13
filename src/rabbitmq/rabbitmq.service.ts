import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import amqplib from 'amqplib'

@Injectable()
export class RabbitMQService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish(
    exchange: string,
    routingKey: string,
    message: any,
    options?: amqplib.Options.Publish,
  ) {
    return this.amqpConnection.publish(exchange, routingKey, message, options)
  }
}
