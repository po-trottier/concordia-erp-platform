import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Location, LocationDocument } from './schemas/location.schema';
import { DEFAULT_LOCATION } from '../../shared/constants';

/**
 * Used by the LocationsController, handles location data storage and retrieval.
 */
@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.createDefaultUser();
  }

  async createDefaultUser(): Promise<void> {
    const locations = await this.locationModel.find().limit(1);
    if (!locations || locations.length < 1) {
      const location = new CreateLocationDto();
      location.name = DEFAULT_LOCATION;
      await this.create(location);
      console.log('Default location was created successfully.');
    } else {
      console.log('Default location already exits.');
    }
  }

  /**
   * Creates location using mongoose locationModel
   *
   * @param createLocationDto dto used to create locations
   */
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = new this.locationModel(createLocationDto);
    return await createdLocation.save();
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

    return this.validateLocationFound(updatedLocation, id);
  }

  /**
   * Deletes location by id using mongoose locationModel
   *
   * @param id string of the location's objectId
   */
  async remove(id: string): Promise<Location> {
    const deletedLocation = await this.locationModel.findByIdAndDelete(id);
    return this.validateLocationFound(deletedLocation, id);
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
