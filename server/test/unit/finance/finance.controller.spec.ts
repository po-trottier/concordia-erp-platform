import { FinanceController } from '../../../src/api/finance/finance.controller';
import { FinanceService } from '../../../src/api/finance/finance.service';
import { CreateFinanceEntryDto } from '../../../src/api/finance/dto/create-finance-entry.dto';
import { UpdateFinanceEntryDto } from '../../../src/api/finance/dto/update-finance-entry.dto';
import { Model } from 'mongoose';
import { FinanceEntry, FinanceEntryDocument } from '../../../src/api/finance/schemas/finance.schema';

describe('FinanceController', () => {
  let financeController: FinanceController;
  let financeService: FinanceService;
  let financeEntryDocument: Model<FinanceEntryDocument>;

  const dummyFinanceEntry: FinanceEntry = {
    dateEntered: new Date,
    dateDue: new Date,
    company_name: 'bank',
    amount: 10,
    paid: 1000,
  };

  beforeEach(() => {
    financeService = new FinanceService(financeEntryDocument);
    financeController = new FinanceController(financeService);
  });

  describe('findAll', () => {
    it('Should return a list of all finance entry', async () => {
      const result: FinanceEntry[] = [dummyFinanceEntry];
      jest
        .spyOn(financeService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await financeController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should return a finance entry by its id', async () => {
      const result: FinanceEntry = dummyFinanceEntry;

      jest
        .spyOn(financeService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await financeController.findOne('123')).toBe(result);
    });
  });

  describe('create', () => {
    it('Should create a fiance entry', async () => {
      const result: FinanceEntry = dummyFinanceEntry;

      const newFinanceEntry = new CreateFinanceEntryDto();
      newFinanceEntry.dateEntered = result.dateEntered;
      newFinanceEntry.dateDue = result.dateDue;
      newFinanceEntry.company_name = result.company_name;
      newFinanceEntry.amount = result.amount;
      newFinanceEntry.paid = result.paid;

      jest
        .spyOn(financeService, 'create')
        .mockImplementation(async () => await result);

      expect(await financeController.create(newFinanceEntry)).toBe(result);
    });
  });

  describe('remove', () => {
    it('Should delete a finance entry by its id', async () => {
      const result: FinanceEntry = dummyFinanceEntry;

      jest
        .spyOn(financeService, 'remove')
        .mockImplementation(async () => await result);

      expect(await financeController.remove('123')).toBe(result);
    });
  });

  describe('update', () => {
    it('Should update finance entry attribute values', async () => {
      const result: FinanceEntry = dummyFinanceEntry;

      const newFinanceEntry = new UpdateFinanceEntryDto();
      newFinanceEntry.dateDue = result.dateDue;
      newFinanceEntry.paid = result.paid;
      
      jest
        .spyOn(financeService, 'update')
        .mockImplementation(async () => await result);

      expect(await financeController.update('123', newFinanceEntry)).toBe(
        result,
      );
    });
  });
});
