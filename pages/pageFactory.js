import { AdminLoginPage } from './adminLoginPage.js';
import { ProductPage } from './productPage.js';
import { customersPage } from './customersPage.js';

export class PageFactory {
  constructor(page) {
    this.page = page;
  }

  getAdminLoginPage() {
    return new AdminLoginPage(this.page);
  }

  getProductPage() {
    return new ProductPage(this.page);
  }

  getCustomersPage() {
    return new customersPage(this.page);
  }
}
