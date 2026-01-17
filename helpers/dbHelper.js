
// helpers/dbHelper.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export async function executeQuery(query, params = []) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [rows] = await connection.execute(query, params);
    return rows;
  } finally {
    await connection.end();
  }
}

//  Delete product by name (OpenCart structure)
export async function deleteProductByName(productName) {
  // 1) Find product_id
  const rows = await executeQuery(
    `SELECT product_id FROM oc_product_description WHERE name = ?`,
    [productName]
  );

  if (rows.length === 0) return 0;

  const productId = rows[0].product_id;

  // 2) Delete from child tables first (basic safe cleanup)
  await executeQuery(`DELETE FROM oc_product_to_category WHERE product_id = ?`, [productId]);
  await executeQuery(`DELETE FROM oc_product_description WHERE product_id = ?`, [productId]);
  await executeQuery(`DELETE FROM oc_product WHERE product_id = ?`, [productId]);

  return productId;
}
