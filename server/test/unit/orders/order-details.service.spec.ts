import { OrderDetailsService } from '../../../src/api/orders/order-details.service';

describe('OrderDetailsService', () => {
  let orderDetailsService: OrderDetailsService;

  beforeEach(async () => {
    orderDetailsService = new OrderDetailsService();
  });

  it('should be defined', () => {
    expect(orderDetailsService).toBeDefined();
  });
});
