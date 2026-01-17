import { test, expect } from '@playwright/test';
import { PageFactory } from '../../pages/pageFactory.js';
import { getExcelData } from '../../helpers/excelHelper.js';
import { ProductPage } from '../../pages/productPage.js';

const addDataSet = getExcelData('./data/productData.xlsx', 'AddProducts');
const updateDataSet = getExcelData('./data/productData.xlsx', 'UpdateProducts');
const deleteDataSet = getExcelData('./data/productData.xlsx', 'DeleteProduct');

 test.beforeEach(`Login App`, async({page})=> {
  const factory = new PageFactory(page);
  const loginPage = factory.getAdminLoginPage();
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
 });

 test.afterEach(`Logout App`, async({page})=>{
   const factory = new PageFactory(page);
   const productPage = factory.getProductPage();
   await productPage.logout();
   await page.close();
 })
addDataSet.forEach((data) => {
  test(`@regression @smoke @product Create product: ${data.name}`, async ({page}) => {
    const factory = new PageFactory(page);
    const productPage = factory.getProductPage();

    await productPage.navigateToProducts();
    await productPage.addProduct(data);
    await expect(productPage.successAlert).toBeVisible();
    await expect(productPage.successAlert).toContainText('Success: You have modified product');

  });
});
updateDataSet.forEach((data) => {
  test(`@regression Update product: ${data.UpdateName}`, async ({page}) => {
    const factory = new PageFactory(page);
    const productPage = factory.getProductPage();

    await productPage.navigateToProducts();
    await productPage.searchProductByName(data);
    await productPage.UpdateProduct(data);
    await expect(productPage.successAlert).toBeVisible();
    await expect(productPage.successAlert).toContainText('Success: You have modified product');

  });
});
deleteDataSet.forEach((data) => {
  test(`@regression Delete product: ${data.name}`, async ({page}) => {
    const factory = new PageFactory(page);
    const productPage = factory.getProductPage();

    await productPage.navigateToProducts();
    await productPage.searchProductByName(data);
    await productPage.deleteProduct(data.name);
    await expect(page.locator('.alert-success, .alert-dismissible.alert-success')).toContainText(/Success: You have modified product/i, { timeout: 8000 });


  });
});