import {
  Injectable,
  Logger,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { DEFAULT_LOCATION } from '../../shared/constants';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Location, LocationDocument } from './schemas/location.schema';
import {
  MaterialStock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialStockDocument,
} from '../materials/materials/schemas/material-stock.schema';
import {
  PartStock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartStockDocument,
} from '../parts/parts/schemas/part-stock.schema';
import {
  ProductStock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductStockDocument,
} from '../products/products/schemas/product-stock.schema';
import {
  MaterialLog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MaterialLogDocument,
} from '../materials/materials-logs/schemas/material-log.schema';
import {
  PartLog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PartLogDocument,
} from '../parts/parts-logs/schemas/part-log.schema';
import {
  ProductLog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductLogDocument,
} from '../products/products-logs/schemas/product-log.schema';
import { EventMap } from '../../events/common';

/**
 * Used by the LocationsController, handles location data storage and retrieval.
 */
@Injectable()
export class LocationsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(LocationsService.name);

  constructor(
    private emitter: EventEmitter2,
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
    @InjectModel(MaterialStock.name)
    private materialStockModel: Model<MaterialStockDocument>,
    @InjectModel(PartStock.name)
    private partStockModel: Model<PartStockDocument>,
    @InjectModel(ProductStock.name)
    private productStockModel: Model<ProductStockDocument>,
    @InjectModel(MaterialLog.name)
    private materialLogModel: Model<MaterialLogDocument>,
    @InjectModel(PartLog.name)
    private partLogModel: Model<PartLogDocument>,
    @InjectModel(ProductLog.name)
    private productLogModel: Model<ProductLogDocument>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.createDefaultLocation();
  }

  async createDefaultLocation(): Promise<void> {
    const locations = await this.locationModel.find().limit(1);
    if (!locations || locations.length < 1) {
      const location = new CreateLocationDto();
      location.name = DEFAULT_LOCATION;
      await this.create(location);
      this.logger.log('Default location was created successfully');
    } else {
      this.logger.warn('Default location already exits');
    }
  }

  /**
   * Creates location using mongoose locationModel
   *
   * @param createLocationDto dto used to create locations
   */
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = new this.locationModel(createLocationDto);

    const location = await createdLocation.save();
    this.emitter.emit(EventMap.LOCATION_CREATED.id, location);
    return location;
  }

  /**
   * Retrieves all locations using mongoose locationModel
   */
  async findAll(): Promise<Location[]> {
    return this.locationModel.find();
  }

  /**
   * Retrieves a location by id using mongoose locationModel
   *
   * @param id string of the location's objectId
   */
  async findOne(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id);
    return this.validateLocationFound(location, id);
  }

  /**
   * Updates location by id using mongoose locationModel
   *
   * @param id string of the location's objectId
   * @param updateLocationDto dto used to update locations
   */
  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      id,
      { $set: { ...updateLocationDto } },
      { new: true },
    );

    const result = this.validateLocationFound(updatedLocation, id);
    this.emitter.emit(EventMap.LOCATION_MODIFIED.id, result);
    return result;
  }

  /**
   * Deletes location by id using mongoose locationModel
   *
   * @param id string of the location's objectId
   */
  async remove(id: string): Promise<Location> {
    // Remove all stock entries for that location
    const materialStock = await this.materialStockModel.find({
      locationId: id,
    });
    for (const stock of materialStock) await stock.delete();

    const partStock = await this.partStockModel.find({
      locationId: id,
    });
    for (const stock of partStock) await stock.delete();

    const productStock = await this.productStockModel.find({
      locationId: id,
    });
    for (const stock of productStock) await stock.delete();

    // Remove all log entries for that location
    const materialLog = await this.materialLogModel.find({
      locationId: id,
    });
    for (const log of materialLog) await log.delete();

    const partLog = await this.partLogModel.find({
      locationId: id,
    });
    for (const log of partLog) await log.delete();

    const productLog = await this.productLogModel.find({
      locationId: id,
    });
    for (const log of productLog) await log.delete();

    // Delete the actual location
    const deletedLocation = await this.locationModel.findByIdAndDelete(id);
    const result = this.validateLocationFound(deletedLocation, id);
    this.emitter.emit(EventMap.LOCATION_DELETED.id, result);
    return result;
  }

  /**
   * Returns NotFoundException if location is null, otherwise returns location
   *
   * @param locationResult a retrieved location
   * @param id string of the location's objectId
   */
  validateLocationFound(locationResult: any, id: string) {
    if (!locationResult) {
      throw new NotFoundException(`Location with id ${id} not found`);
    } else {
      return locationResult;
    }
  }
}
