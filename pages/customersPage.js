import { BasePage } from './basePage.js';

export class customersPage extends BasePage {

    constructor(page) {
    super(page);
        this.customersTab = "//a[@class='parent collapsed'][normalize-space()='Customers']";
        this.customersSub = "//ul[@id='collapse-6']//a[contains(text(),'Customers')]"
        this.addCustomerBtn  = "//a[@title='Add New']";
        this.CustomersText= "//h1[normalize-space()='Customers']"
        this.firstName    = '#input-firstname';
        this.lastName     = '#input-lastname';
        this.email        = '#input-email';
        this.phone        = '#input-telephone';
        this.password     = '#input-password';
        this.confirmPassword = '#input-confirm';
        this.newsLetter   = '#input-newsletter';
        this.commenter    = '#input-commenter';
        this.saveBtn      = '#button-save';
        this.successAlertSelector  = '//*[@id="alert"]/div';
        this.addressTab= "//a[normalize-space()='Addresses']"
        this.addAddressBtn="//button[@title='Add Address']"
        this.addressFName= '#input-address-firstname'
        this.addressLName= '#input-address-lastname'
        this.companyName= '#input-address-company'
        this.customerddress1= '#input-address-address-1'
        this.customerddress2= '#input-address-address-2'
        this.city= '#input-address-city'
        this.postalCode= '#input-address-postcode'
        this.country= '#input-address-country'
        this.state= '#input-address-zone'
        this.AddressSaveBtn= "//button[normalize-space()='Save']"
        this.closeEditAddress = "//button[@class='btn-close']"
        this.filterNameInput = '//*[@id="input-name"]';
        this.filterButton ='//*[@id="button-filter"]';
        this.productCheckbox = name => `//td[contains(text(),"${name}")]/preceding-sibling::td/input`;
        this.productCheckboxNew = "//input[@name='selected[]']"
        this.customerRows = 'table tbody tr';
        this.editBtnInRow = (name) => `//tr[td[contains(normalize-space(), "${name}")]]//a[@aria-label="Edit"]`;
        this.checkboxInRow = (name) => `//tr[td[contains(normalize-space(), "${name}")]]//input[@name="selected[]"]`;
        this.deleteToolbarBtn = '#content > div.page-header div.pull-right button.btn-danger'; 
        // if this selector fails, we’ll adjust to your exact delete button
        this.deleteButton = '//*[@id="content"]/div[1]/div/div/button[2]';
        this.logoutBtn="//span[text()='Logout']"
        this.customerRows = 'table tbody tr';
        this.customerCheckboxFirstRow = 'table tbody tr input[name="selected[]"]';
        this.deleteToolbarBtn = '//*[@id="content"]/div[1]/div/div/button[2]';
        this.successAlertSelector = 'xpath=//*[@id="alert"]/div';

  }

  async navigateToCustomers(){
    await this.click(this.customersTab);
    await this.click(this.customersSub);
  }

  async addCustomer(data){
    await this.click(this.addCustomerBtn);
    await this.getText(this.CustomersText);
    await this.fill(this.firstName, String(data.FirstName));
    await this.fill(this.lastName, String (data.LastName));
    await this.fill(this.email, String(data.Email));
    await this.fill(this.phone, String(data.Phone));
    await this.fill(this.password, String(data.Password));
    await this.fill(this.confirmPassword, String(data.RePassword));
    await this.check(this.newsLetter);
    await this.check(this.commenter);
    await this.click(this.saveBtn);

  }

   get successAlert() {
   return this.page.locator(this.successAlertSelector);
}
async addAdressDetails(data){
    await this.click(this.addressTab);
    await this.click(this.addAddressBtn);
    await this.fill(this.addressFName, String(data.AdressFName));
    await this.fill(this.addressLName, String(data.AdressLName));
    await this.fill(this.companyName, String(data.Company));
    await this.page.waitForTimeout(3000);
    await this.fill(this.customerddress1, String(data.Address1));
    await this.fill(this.customerddress2, String(data.Address2));
    await this.fill(this.city, String(data.City));
    await this.fill(this.postalCode, String(data.PostalCode));
    await this.selectOption(this.country, String(data.CountryName));
    await this.page.waitForTimeout(3000);
    await this.selectOption(this.state, String(data.State));
    await this.click(this.AddressSaveBtn);
    await this.click(this.closeEditAddress);

}

async UpdateCustomersDetails(data) {
  // assume searchCustomerByEmail(data) already ran
  const firstRow = this.page.locator('table tbody tr').first();
  await firstRow.locator('a[aria-label="Edit"], a[title="Edit"]').click();
  await this.click(this.addressTab);
  await this.click(this.addAddressBtn);
  await this.fill(this.addressFName, String(data.AdressFName));
  await this.fill(this.addressLName, String(data.AdressLName));
  await this.fill(this.companyName, String(data.Company));
  await this.fill(this.customerddress1, String(data.Address1));
  await this.fill(this.customerddress2, String(data.Address2));
  await this.fill(this.city, String(data.City));
  await this.fill(this.postalCode, String(data.PostalCode));
  await this.selectOption(this.country, String(data.CountryName));
  await this.selectOption(this.state, String(data.State));
  await this.click(this.AddressSaveBtn);
  await this.click(this.closeEditAddress);
}

async searchCustomerByEmail(data) {
  const filterEmail = 'input[name="filter_email"], #input-email';
  await this.fill(filterEmail, String(data.Email));
  await this.click(this.filterButton);
  await this.page.waitForSelector('table tbody tr');
}

async deleteCustomer() {
  // wait for rows
  await this.page.locator('table tbody tr').first().waitFor();
  // select checkbox in first row
  await this.page.locator('table tbody tr input[name="selected[]"]').first().check();
  // accept confirm dialog
  this.page.once('dialog', (d) => d.accept());
  // click delete button (your existing xpath)
  await this.page.locator('xpath=' + this.deleteButton).click();
}

  async logout(){
    await this.click(this.logoutBtn);
  }

}