import { getISOString, logger, schemaValidator } from '@shared';

import { upsert } from '@adapters/secondary/dynamodb-adapter';
import { config } from '@config';
import type { CreateOrder } from '@dto/create-order';
import type { Order } from '@dto/order';
import { schema } from '@schemas/order';
import { v4 as uuid } from 'uuid';

const tableName = config.get('tableName');

export async function createOrderUseCase(
  newOrder: CreateOrder,
): Promise<Order> {
  const createdDate = getISOString();

  const order: Order = {
    ...newOrder,
    id: uuid(),
    created: createdDate,
    updated: createdDate,
  };

  schemaValidator(schema, order);

  await upsert<Order>(order, tableName, order.id);

  logger.info(`order created with id ${order.id}`);

  return order;
}
