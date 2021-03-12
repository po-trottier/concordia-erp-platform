import { MaterialOrdersService } from '../../../src/api/orders/material-orders.service';
import { MaterialOrderDocument } from '../../../src/api/orders/schemas/material-orders.schema';;
import { Model } from 'mongoose';

  describe('OrdersServices', () => {
    let materialOrdersService: MaterialOrdersService;
    let materialOrderDocument: Model<MaterialOrderDocument>;

    beforeEach(async () => {
      materialOrdersService = new MaterialOrdersService(materialOrderDocument);
    });

  it('should be defined', () => {
    expect(materialOrdersService).toBeDefined();
  });
});
