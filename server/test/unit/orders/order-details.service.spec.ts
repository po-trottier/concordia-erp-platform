import { OrderDetailsService } from '../../../src/api/orders/order-details.service';

  describe('OrdersServices', () => {

		let orderDetailsService: OrderDetailsService;

    beforeEach(async () => {
      orderDetailsService = new OrderDetailsService();
    });

  it('should be defined', () => {
    expect(orderDetailsService).toBeDefined();
  });
});
