import { test, expect } from '@playwright/test';
import { PageFactory } from '../../pages/pageFactory.js';
import { getExcelData } from '../../helpers/excelHelper.js';
import { ProductPage } from '../../pages/productPage.js';
import { customersPage } from '../../pages/customersPage.js';

const addCustomers = getExcelData('./data/customersData.xlsx', 'AddCustomers');
const updateCustomers = getExcelData('./data/customersData.xlsx', 'UpdateCustomers');
const deleteCustomers = getExcelData('./data/customersData.xlsx', 'DeleteCustomers');

test.beforeEach(`Login customers`, async ({page})=>{
    const factory = new PageFactory(page);
    const loginPage = factory.getAdminLoginPage();
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
})
test.afterEach(`Logout Customer`, async ({page})=>{
    const factory = new PageFactory(page);
    const customersPage = factory.getCustomersPage();
    await customersPage.logout();
    await page.close();
})

addCustomers.forEach((data) => {
  test(`Add Customers: ${data.FirstName}`, async ({ page }) => {
    const factory = new PageFactory(page);
    const customersPage = factory.getCustomersPage();
    await customersPage.navigateToCustomers();
    await customersPage.addCustomer(data);
    await expect(customersPage.successAlert).toBeVisible();
    await expect(customersPage.successAlert).toContainText('Success: You have modified customers!');
    await customersPage.addAdressDetails(data);
    await expect(customersPage.successAlert).toBeVisible();
    await expect(customersPage.successAlert).toContainText('Success: You have modified customers!');
  });
});

updateCustomers.forEach((data) => {
  test(`Update Customers: ${data.FirstName}`, async ({ page }) => {
    const factory = new PageFactory(page);;
    const customersPage = factory.getCustomersPage();
    await customersPage.navigateToCustomers();
    await customersPage.searchCustomerByEmail(data);
    await customersPage.UpdateCustomersDetails(data);
    await expect(customersPage.successAlert).toBeVisible();
    await expect(customersPage.successAlert).toContainText('Success: You have modified customers');

  });
});

deleteCustomers.forEach((data, index) => {
  test(`Delete Customers [${index + 1}]: ${data.Email}`, async ({ page }) => {
    const factory = new PageFactory(page);
    const customersPage = factory.getCustomersPage();
    await customersPage.navigateToCustomers();
    await customersPage.searchCustomerByEmail(data);
    await customersPage.deleteCustomer();
    await expect(customersPage.successAlert).toBeVisible();
    await expect(customersPage.successAlert).toContainText(/Success: You have modified customers/i);
  });
});

