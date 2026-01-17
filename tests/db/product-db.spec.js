import { test, expect } from '@playwright/test';
import { executeQuery, deleteProductByName } from '../../helpers/dbHelper.js';

test.describe('DB - Products', () => {
  test('Validate product exists in DB', async () => {
    const name = 'Add Product 004';

    const rows = await executeQuery(
      `SELECT p.product_id, pd.name, p.model, p.price, p.quantity
       FROM oc_product p
       JOIN oc_product_description pd ON p.product_id = pd.product_id
       WHERE pd.name = ?`,
      [name]
    );

    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe(name);
  });

  test('Delete product by name (DB cleanup)', async () => {
    const name = 'Add Product 001';

    await deleteProductByName(name);

    const rows = await executeQuery(
      `SELECT product_id FROM oc_product_description WHERE name = ?`,
      [name]
    );

    expect(rows.length).toBe(0);
  });
});
