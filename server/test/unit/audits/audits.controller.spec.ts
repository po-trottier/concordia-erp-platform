import { AuditsController } from '../../../src/api/audits/audits.controller';
import { AuditsService } from '../../../src/api/audits/audits.service';
import { QueryAuditDto } from '../../../src/api/audits/dto/query-audit.dto';
import { AuditDocument, Audit } from '../../../src/api/audits/schemas/audits.schema';
import { Model } from 'mongoose';

describe('EventsController', () => {
  let auditsController: AuditsController;
  let auditsService: AuditsService;
  let auditDocument: Model<AuditDocument>;

  const dummyAudit : Audit = {
    module: 'Users',
    action: 'create',
    date: new Date(),
    target: 'Concordia',
    author: 'admin'
  }

  beforeEach(async () => {
    auditsService = new AuditsService(auditDocument);
    auditsController = new AuditsController(auditsService);
  });

  describe('findAll', () => {
    it('Should find all audits', async () => {
      const result : Audit[] = [dummyAudit];

      jest
        .spyOn(auditsService, 'findAll')
        .mockImplementation(async () => await result);

      expect(await auditsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('Should find an audit by its id', async () => {
      const result : Audit = dummyAudit;

      jest
        .spyOn(auditsService, 'findOne')
        .mockImplementation(async () => await result);

      expect(await auditsController.findOne('123')).toBe(result);
    });
  });

  describe('find', () => {
    it('Should find all events', async () => {
      const result : Audit[] = [dummyAudit];

      const queryAuditDto = new QueryAuditDto();
      queryAuditDto.action = dummyAudit.action;
      queryAuditDto.author = dummyAudit.author;
      queryAuditDto.module = dummyAudit.module;
      queryAuditDto.target = dummyAudit.target;
      queryAuditDto.before = dummyAudit.date;
      queryAuditDto.after = dummyAudit.date;

      jest
        .spyOn(auditsService, 'find')
        .mockImplementation(async () => await result);

      expect(await auditsController.find(queryAuditDto)).toBe(result);
    });
  });

  describe('findModules', () => {
    it('Should find all modules', async () => {
      const result : string[] = [dummyAudit.module];

      jest
        .spyOn(auditsService, 'findModules')
        .mockImplementation(async () => await result);

      expect(await auditsController.findModules()).toBe(result);
    });
  });

  describe('clear', () => {
    it('Should delete all audits', async () => {
      const result : Audit[] = [];

      jest
        .spyOn(auditsService, 'clear')
        .mockImplementation(async () => await result);

      expect(await auditsController.clear()).toBe(result);
    });
  });
});
