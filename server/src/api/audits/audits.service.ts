import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuditDto } from './dto/create-audit.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Audit, AuditDocument } from './schemas/audits.schema';

/**
 * Used by the AuditsController, handles audit data storage and retrieval.
 */
@Injectable()
export class AuditsService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  /**
   * Creates audit using mongoose auditModel
   *
   * @param createAuditDto dto used to create audits
   */
  async create(createAuditDto: CreateAuditDto): Promise<Audit> {
    const createdAudit = new this.auditModel(createAuditDto);
    return await createdAudit.save();
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
   *
   * @param id string of the audit's objectId
   */
  async remove(id: string): Promise<Audit> {
    const deletedAudit = await this.auditModel.findByIdAndDelete(id);
    return this.validateAuditFound(deletedAudit, id);
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
