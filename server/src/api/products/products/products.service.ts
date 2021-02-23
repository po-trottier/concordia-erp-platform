import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductQuantityUpdatedEvent } from './events/product-quantity-updated.event';

/**
 * Used by the ProductsController, handles product data storage and retrieval.
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * Creates product using mongoose productModel
   *
   * @param createProductDto dto used to create products
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    createdProduct.save();

    const event: ProductQuantityUpdatedEvent = {
      productId: createdProduct.id,
      stock: createProductDto.quantity || 0,
      date: new Date(),
      built: 0,
      used: 0,
    };

    this.eventEmitter.emit('product.quantity.updated', event);

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
    return this.verifyProductFound(id, product);
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
    let builtAmount = 0;
    let usedAmount = 0;
    if (updateProductDto.quantity) {
      const oldQuantity = (await this.productModel.findById(id)).quantity;
      const netChange = updateProductDto.quantity - oldQuantity;
      builtAmount = netChange > 0 ? netChange : 0;
      usedAmount = netChange < 0 ? -netChange : 0;
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: { ...updateProductDto } },
      { new: true },
    );

    if (updatedProduct && updateProductDto.quantity) {
      const event: ProductQuantityUpdatedEvent = {
        productId: id,
        stock: updateProductDto.quantity,
        date: new Date(),
        built: builtAmount,
        used: usedAmount,
      };

      this.eventEmitter.emit('product.quantity.updated', event);
    }

    return this.verifyProductFound(id, updatedProduct);
  }

  /**
   * Deletes product by id using mongoose productModel
   *
   * @param id string of the product's objectId
   */
  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return this.verifyProductFound(id, deletedProduct);
  }

  /**
   * Returns NotFoundException if product is null, otherwise returns product
   *
   * @param productResult a retrieved product
   * @param id string of the product's objectId
   */
  verifyProductFound(id: string, product: any) {
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    } else {
      return product;
    }
  }
}