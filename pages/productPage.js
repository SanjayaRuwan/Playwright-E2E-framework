import { BasePage } from './basePage.js';

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.catalogMenu = '#menu-catalog';
    this.productsLink = 'a[href*="route=catalog/product"]';
    this.addNewButton = "a[title='Add New']";
    this.productNameInput = '#input-name-1';
    this.metaTagInput = '#input-meta-title-1';
    this.dataTab = ".nav-link[href='#tab-data']";
    this.modelInput = '#input-model';
    this.priceInput = '#input-price';
    this.quantityInput = '#input-quantity';
    this.seoTab=".nav-link[href='#tab-seo']";
    this.seoInput='#input-keyword-0-1';
    this.saveButton = "button[title='Save']";
    this.successAlertSelector  = '//*[@id="alert"]/div';
    this.editBtnByName = (name) =>`//td[contains(normalize-space(), "${name}")]/following-sibling::td//a[@title="Edit"]`;
    this.filterNameInput = '#input-name';
    this.filterButton ='#button-filter';
    this.productCheckbox = name => `//td[contains(text(),"${name}")]/preceding-sibling::td/input`;
    this.productCheckboxNew = '//input[@name="selected[]"]';
    this.productRowSelector = 'table tbody tr';
    this.imageTab= "//a[normalize-space()='Image']";
    this.editImageBtn="//button[normalize-space()='Edit']";
    this.uploadBtn="//i[@class='fa-solid fa-upload']";
    this.deleteButton='button[formaction*="catalog/product.delete"]';
    this.logoutBtn="//span[text()='Logout']";
  }

  async navigateToProducts() {
    await this.click(this.catalogMenu);
    await this.click(this.productsLink);
  }

 async addProduct(data) {
  console.log('Adding product with data:', data);
  await this.click(this.addNewButton);
  await this.fill(this.productNameInput, String(data.name));
  await this.fill(this.metaTagInput, String(data.metaTitle));
  await this.click(this.dataTab);
  await this.fill(this.modelInput, String(data.model));
  await this.fill(this.priceInput,String(data.price));
  await this.fill(this.quantityInput,String(data.quantity));
  await this.click(this.seoTab);
  await this.fill(this.seoInput,String(data.seo));
  await this.click(this.saveButton);

}
  async searchProductByName(data) {
    await this.fill(this.filterNameInput, String(data.name));
    await this.click(this.filterButton);
    await this.page.waitForSelector('table tbody tr td'); 
  }

 async UpdateProduct(data) {
  console.log('Update product with data:', data);
  await this.click(this.editBtnByName(data.name));
  await this.fill(this.productNameInput, String(data.UpdateName));
  await this.click(this.dataTab);
  await this.fill(this.priceInput,String(data.price));
  await this.fill(this.quantityInput,String(data.quantity));
  await this.page.waitForTimeout(3000);
  await this.click(this.saveButton);
}

 get successAlert() {
  return this.page.locator(this.successAlertSelector);
}

 async deleteProduct(productName) {
  // Select checkbox for the product row (more accurate than selecting first checkbox)
  const row = this.page.locator('tr', { hasText: productName });
  await row.locator('input[name="selected[]"]').check();
  const delBtn = this.page.locator('button[formaction*="catalog/product.delete"]');
  this.page.once('dialog', d => d.accept());
  await Promise.all([this.page.waitForLoadState('networkidle'),delBtn.click()
  ]);
 }

  async logout(){
    await this.click(this.logoutBtn);
  }

}