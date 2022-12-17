import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['capital-midge-8677-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'Y2FwaXRhbC1taWRnZS04Njc3JIg_KGcpuQsw3OP43Ufvc27NC3BIw3IYImqLnT8',
          password:
            '-jOsArYv03xIdnFzcAECNCdeU0rt2ikRmHTMEqSNGzP_0moXhRrvTDTWlBETnddqtdPRBQ==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
