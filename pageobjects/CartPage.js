const {test, expect} = require('@playwright/test');
class CartPage
{
    
constructor(page)
{
    this.page = page;
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
    this.CheckoutButton =  page.locator('#checkout');

}

//reviews the product in the cart by validating the name and the price.
async VerifyProductInCart()
{
    const name = await this.cartItemName.innerText();
    const price = await this.cartItemPrice.innerText();

        expect(name).toBe('Sauce Labs Bike Light');
        expect(price).toBe('$9.99');
}

//clicks on the checkout button and validates redirection to the first step of the checkout process
async Checkout()
{
    await this.CheckoutButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
}


}
module.exports = {CartPage};