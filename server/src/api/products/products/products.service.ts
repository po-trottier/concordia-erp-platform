import {   
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Product, ProductDocument } from './schemas/products.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProductOrder, ProductOrderDocument } from '../../orders/schemas/product-orders.schema';
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

/**
 * Used by the ProductsController, handles product data storage and retrieval.
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductOrder.name)
    private productOrderModel: Model<ProductOrderDocument>,
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
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.save();

    return createdProduct;
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
   * Deletes product by id using mongoose productModel
   *
   * @param id string of the product's objectId
   */
  async remove(id: string) {
    const dependentProductOrders = await this.productOrderModel.find({
      productId: id,
    });

    if (dependentProductOrders.length > 0)
    {
      throw new ForbiddenException(
        'One or more orders (' + 
        dependentProductOrders.map((p: ProductOrder) => p.dateOrdered).join(', ') +
        ') use the product you are trying to delete',
      );
    }

    //delete all stock entries for the product 
    
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
