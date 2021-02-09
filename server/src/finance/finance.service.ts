import { Injectable } from '@nestjs/common';

export interface FinancialEntry {

}

@Injectable()
export class FinanceService {
  private readonly financial_entries : FinancialEntry[] = [];

  create(entry: FinancialEntry) {
    this.financial_entries.push(entry);
  }

  findAll(): FinancialEntry[] {
    return this.financial_entries;
  }
}
