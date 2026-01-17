// pages/basePage.js
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Accept string selector OR locator
  locator(target) {
    return typeof target === 'string' ? this.page.locator(target) : target;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForVisible(target, timeout = 10000) {
    await this.locator(target).waitFor({ state: 'visible', timeout });
  }

  async click(target, options = {}) {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'visible', timeout: options.timeout ?? 10000 });
    await loc.click(options);
  }

  async dblclick(target, options = {}) {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'visible', timeout: options.timeout ?? 10000 });
    await loc.dblclick(options);
  }

  async fill(target, value, options = {}) {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'visible', timeout: options.timeout ?? 10000 });
    await loc.fill(String(value ?? ''));
  }

  async check(target, options = {}) {
    const loc = this.locator(target);
    await loc.waitFor({ state: 'visible', timeout: options.timeout ?? 10000 });
    await loc.check(options);
  }

  async selectOption(target, value) {
    await this.locator(target).selectOption(value);
  }

  async uploadFile(target, filePath) {
    await this.locator(target).setInputFiles(filePath);
  }

  async getText(target) {
    return (await this.locator(target).textContent())?.trim() ?? '';
  }

  async isVisible(target) {
    return await this.locator(target).isVisible();
  }
}
