import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['capital-midge-8677-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'Y2FwaXRhbC1taWRnZS04Njc3JIg_KGcpuQsw3OP43Ufvc27NC3BIw3IYImqLnT8',
      password:
        '-jOsArYv03xIdnFzcAECNCdeU0rt2ikRmHTMEqSNGzP_0moXhRrvTDTWlBETnddqtdPRBQ==',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
