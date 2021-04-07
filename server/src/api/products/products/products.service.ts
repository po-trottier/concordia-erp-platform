import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Product, ProductDocument } from './schemas/products.schema';
import {
  ProductStock,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductStockDocument,
} from './schemas/product-stock.schema';
import {
  ProductLog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ProductLogDocument,
} from '../products-logs/schemas/product-log.schema';
import { EventMap } from '../../../events/common';
import {JwtService} from "@nestjs/jwt";
import {UserToken} from "../../../shared/user-token.interface";

/**
 * Used by the ProductsController, handles product data storage and retrieval.
 */
@Injectable()
export class ProductsService {
  constructor(
    private jwtService: JwtService,
    private emitter: EventEmitter2,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(ProductLog.name)
    private productLogModel: Model<ProductLogDocument>,
    @InjectModel(ProductStock.name)
    private productStockModel: Model<ProductStockDocument>,
  ) {}

  /**
   * Creates product using mongoose productModel
   *
   * @param createProductDto dto used to create products
   * @param auth
   */
  async create(createProductDto: CreateProductDto, auth: string): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const product = await createdProduct.save();
    this.emitter.emit(EventMap.PRODUCT_CREATED.id, {product,token});
    return product;
  }

  /**
   * Retrieves all products using mongoose productModel
   */
  async findAll(): Promise<Product[]> {
    return this.productModel.find();
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
   * @param auth
   * @param updateProductDto dto used to update products
   */
  async update(
    id: string,
    auth: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: { ...updateProductDto } },
      { new: true },
    );

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const product = this.validateProductFound(updatedProduct, id);
    this.emitter.emit(EventMap.PRODUCT_MODIFIED.id, {product, token});
    return product;
  }

  /**
   * Deletes product by id using mongoose productModel
   *
   * @param id string of the product's objectId
   * @param auth
   */
  async remove(id: string, auth: string) {
    //delete all stock entries for the product
    const stocks = await this.productStockModel.find({ productId: id });
    for (const stock of stocks) {
      await stock.delete();
    }

    //Remove the logs for this part
    const logs = await this.productLogModel.find({ productId: id });
    for (const log of logs) {
      await log.delete();
    }

    const deletedProduct = await this.productModel.findByIdAndDelete(id);

    const decoded: any = this.jwtService.decode(auth.substr(7));
    const token : UserToken = decoded;

    const product = this.validateProductFound(deletedProduct, id);
    this.emitter.emit(EventMap.PRODUCT_DELETED.id, {product, token});
    return product;
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
