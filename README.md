# NestJS - RabbitMQ - Debezium

## Run project

### Run services in Docker
#### First run RabbitMQ service
```bash
docker compose rabbitmq up -d
```
#### Configure your RabbitMQ connection and exchange
```ts
// src/rabbitmq/rabbitmq.module.ts
// Line 10~11
exchanges: [{ name: 'debezium.exchange', type: 'direct' }],
uri: 'amqp://admin:admin@localhost:5672/vhost',
```

#### Configure your RabbitMQ queue and routingKey
```ts
// src/app.controller.ts
// Line 37~41
@RabbitSubscribe({
  exchange: 'debezium.exchange',
  routingKey: 'mydb.public.users',
  queue: 'debezium.queue',
})
```

#### Run NestJS service for create a exchanges, queue and routingKey
##### Install dependencies
```bash
pnpm install
```
##### Prisma generate
```bash
pnpm prisma generate
pnpm prisma migrate deploy
```

##### Run project
```bash
pnpm start:dev
```

#### Run PostgreSQL service
```bash
docker compose postgres up -d
```

#### After postgres is running, run the code below to enable the full identity
```sql
ALTER TABLE public.users REPLICA IDENTITY FULL;
```

## Configuration Debezium
All settings are in the file `docker/debezium/application.properties`

```bash
# Sink
debezium.sink.type=rabbitmq
debezium.sink.rabbitmq.connection.host=rabbitmq
debezium.sink.rabbitmq.connection.port=5672
debezium.sink.rabbitmq.connection.username=admin
debezium.sink.rabbitmq.connection.password=admin
debezium.sink.rabbitmq.connection.virtual.host=vhost
debezium.sink.rabbitmq.connection.port=5672
debezium.sink.rabbitmq.exchange=debezium.exchange
debezium.sink.rabbitmq.routingKey=mydb.public.users

# Source
debezium.source.connector.class=io.debezium.connector.postgresql.PostgresConnector
debezium.source.offset.storage.file.filename=data/offsets.dat
debezium.source.offset.flush.interval.ms=0
debezium.source.database.hostname=postgres
debezium.source.database.port=5432
debezium.source.database.user=docker
debezium.source.database.password=docker
debezium.source.database.dbname=mydb
debezium.source.topic.prefix=poc
debezium.source.table.include.list=public.users
debezium.source.plugin.name=pgoutput
debezium.source.tombstones.on.delete=false
debezium.source.include.schema.changes=true
debezium.source.include.transaction.details=true

```
