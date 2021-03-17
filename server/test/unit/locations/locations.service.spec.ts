import { LocationsService } from '../../../src/api/locations/locations.service';
import { Model } from 'mongoose';
import { LocationDocument } from '../../../src/api/locations/schemas/location.schema';

describe('UsersService', () => {
  let locationsService: LocationsService;
  let financeEntryDocument: Model<LocationDocument>;

  beforeEach(async () => {
    locationsService = new LocationsService(financeEntryDocument);
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });
});
