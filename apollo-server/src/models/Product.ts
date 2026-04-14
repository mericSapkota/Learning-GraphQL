import { pool } from "../db";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductInput {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export class ProductModel {
  static async getAllProducts(): Promise<Product[]> {
    const result = await pool.query("SELECT * FROM products ORDER BY id");
    return result.rows;
  }

  static async getProductById(id: number): Promise<Product | null> {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  static async createProduct(product: CreateProductInput): Promise<Product> {
    const { name, description, price, stock } = product;
    const result = await pool.query(
      "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, stock],
    );
    return result.rows[0];
  }

  static async updateProduct(product: UpdateProductInput): Promise<Product | null> {
    const { id, name, description, price, stock } = product;
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      values.push(price);
    }
    if (stock !== undefined) {
      updates.push(`stock = $${paramIndex++}`);
      values.push(stock);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    if (updates.length === 1) return null;

    const query = `
      UPDATE products 
      SET ${updates.join(", ")} 
      WHERE id = $${paramIndex} 
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async deleteProduct(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING id", [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
