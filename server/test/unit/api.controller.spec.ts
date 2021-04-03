import { ApiService } from '../../src/api/api.service';
import { ApiController } from '../../src/api/api.controller';

describe('ApiController', () => {
  let apiController: ApiController;
  let apiService: ApiService;

  beforeEach(async () => {
    apiService = new ApiService();
    apiController = new ApiController(apiService);
  });

  describe('getStatus', () => {
    it("Should return an object with a single attribute name 'status' and a value of 'Running'", async () => {
      const result: any = { status: 'Running' };

      jest.spyOn(apiService, 'getStatus').mockImplementation(() => result);

      expect(await apiController.getStatus()).toBe(result);
    });
  });
});
