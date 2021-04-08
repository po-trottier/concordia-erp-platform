import { AuditsController } from '../../../src/api/audits/audits.controller';
import { AuditsService } from '../../../src/api/audits/audits.service';
import { AuditDocument, Audit } from '../../../src/api/audits/schemas/audits.schema';
import { Model } from 'mongoose';

describe('EventsController', () => {
  let auditsController: AuditsController;
  let auditsService: AuditsService;
  let auditDocument: Model<AuditDocument>;

  beforeEach(async () => {
    auditsService = new AuditsService(auditDocument);
    auditsController = new AuditsController(auditsService);
  });

  it('should be defined', () => {
    expect(auditsService).toBeDefined();
  });
});
