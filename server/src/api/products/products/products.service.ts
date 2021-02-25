import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { format, parse } from 'date-fns';
import { ProductLogsService } from '../products-logs/product-logs.service';
import { UpdateProductLogDto } from '../products-logs/dto/update-product-log.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Product, ProductDocument } from './schemas/products.schema';

/**
 * Used by the ProductsController, handles product data storage and retrieval.
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly productLogsService: ProductLogsService,
  ) {}

  /**
   * Creates product using mongoose productModel
   *
   * @param createProductDto dto used to create products
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    createdProduct.save();

    const updateProductLogDto: UpdateProductLogDto = new UpdateProductLogDto();

    updateProductLogDto.productId = createdProduct.id;
    updateProductLogDto.stock = createdProduct.stock || 0;
    updateProductLogDto.date = parse(
      format(new Date(), 'd/M/y'),
      'dd/MM/yyyy',
      new Date(),
    );

    await this.productLogsService.update(updateProductLogDto);

    return createdProduct;
  }

  /**
   * Retrieves all products using mongoose productModel
   */
  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  /**
   * Retrieves a product by id using mongoose productModel
   *
   * @param id string of the product's objectId
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return this.validateProductFound(product, id);
  }

  /**
   * Updates product by id using mongoose productModel
   * If quantity is product of the update, emits the product.quantity.updated event
   *
   * @param id string of the product's objectId
   * @param updateProductDto dto used to update products
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: { ...updateProductDto } },
      { new: true },
    );
    return this.validateProductFound(updatedProduct, id);
  }

  /**
   * Updates product stock by id using mongoose productModel
   * Emits the product.quantity.updated event
   *
   * @param id string of the product's objectId
   * @param updateProductStockDto dto used to update product stock
   */
  async updateStock(
    id: string,
    updateProductStockDto: UpdateProductStockDto,
  ): Promise<Product> {
    const { stockBuilt, stockUsed } = updateProductStockDto;

    const netStockChange = stockBuilt - stockUsed;

    let updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $inc: { stock: netStockChange } },
      { new: true },
    );

    if (updatedProduct.stock < 0) {
      updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        { $set: { stock: 0 } },
        { new: true },
      );
    }

    if (updatedProduct) {
      const updateProductLogDto: UpdateProductLogDto = {
        productId: id,
        stock: updatedProduct.stock,
        stockBuilt,
        stockUsed,
        date: parse(format(new Date(), 'd/M/y'), 'dd/MM/yyyy', new Date()),
      };

      await this.productLogsService.update(updateProductLogDto);
    }

    return this.validateProductFound(updatedProduct, id);
  }

  /**
   * Deletes product by id using mongoose productModel
   *
   * @param id string of the product's objectId
   */
  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return this.validateProductFound(deletedProduct, id);
  }

  /**
   * Returns NotFoundException if product is null, otherwise returns product
   *
   * @param productResult a retrieved product
   * @param id string of the product's objectId
   */
  validateProductFound(productResult: any, id: string) {
    if (!productResult) {
      throw new NotFoundException(`Product with id ${id} not found`);
    } else {
      return productResult;
    }
  }
}
