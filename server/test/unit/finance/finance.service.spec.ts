import { FinanceService } from '../../../src/api/finance/finance.service';
import { Model } from 'mongoose';
import { FinanceEntryDocument } from '../../../src/api/finance/schemas/finance.schema';

describe('UsersService', () => {
	let financeService: FinanceService;
	let financeEntryDocument: Model<FinanceEntryDocument>;

  beforeEach(async () => {
    financeService = new FinanceService(financeEntryDocument);
  });

  it('should be defined', () => {
    expect(financeService).toBeDefined();
  });
});
