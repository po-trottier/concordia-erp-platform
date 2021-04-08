import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Audit, AuditDocument } from './schemas/audits.schema';
import { Modules } from './enums/modules.enum';
import { QueryAuditDto } from './dto/query-audit.dto';

/**
 * Used by the AuditsController, handles audit data storage and retrieval.
 */
@Injectable()
export class AuditsService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  /**
   * Retrieves all audits using mongoose auditModel
   */
  async find(query: QueryAuditDto): Promise<Audit[]> {
    const modules = [];
    const actions = [];
    const targets = [];
    const authors = [];
    const andList = [];
    if (query.module) {
      query.module.split(',').forEach((module) => {
        modules.push({ module: module });
      });
      andList.push({ $or: modules });
    }
    if (query.action) {
      query.action.split(',').forEach((action) => {
        actions.push({ action: action });
      });
      andList.push({ $or: actions });
    }
    if (query.target) {
      query.target.split(',').forEach((target) => {
        targets.push({ target: target });
      });
      andList.push({ $or: targets });
    }
    if (query.author) {
      query.author.split(',').forEach((author) => {
        authors.push({ author: author });
      });
      andList.push({ $or: authors });
    }
    if (query.before && query.after) {
      andList.push({
        date: { $gte: new Date(query.after), $lte: new Date(query.before) },
      });
      // andList.push({$lte: query.after})
    }

    if (andList.length > 0) {
      return this.auditModel.find().and(andList);
    } else {
      return this.auditModel.find();
    }
  }

  async findModules(): Promise<string[]> {
    console.log(Modules);
    return Modules;
  }

  /**
   * Retrieves all audits using mongoose auditModel
   */
  async findAll(): Promise<Audit[]> {
    return this.auditModel.find();
  }

  /**
   * Retrieves a audit by id using mongoose auditModel
   *
   * @param id string of the audit's objectId
   */
  async findOne(id: string): Promise<Audit> {
    const audit = await this.auditModel.findById(id);
    return this.validateAuditFound(audit, id);
  }

  /**
   * Deletes audit by id using mongoose auditModel
   */
  async clear(): Promise<Audit[]> {
    const deletedAudits = await this.auditModel.deleteMany({});
    return this.validateAuditFound(deletedAudits, 'many');
  }

  /**
   * Returns NotFoundException if audit is null, otherwise returns audit
   *
   * @param auditResult a retrieved audit
   * @param id string of the audit's objectId
   */
  validateAuditFound(auditResult: any, id: string) {
    if (!auditResult) {
      throw new NotFoundException(`audit with id ${id} not found`);
    } else {
      return auditResult;
    }
  }
}
