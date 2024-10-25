const { expect } = require("playwright/test");
class CheckoutPage
{
    constructor(page)
    {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode =page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.itemName = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
    this.totalPrice = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.confirmation = page.locator('.complete-header');
    this.menu = page.locator('.bm-burger-button');
    this.logoutButton = page.locator('#logout_sidebar_link');
    }

    //to fill the firstname, lastname and postal code in the checkout process,
    //click the "continue" button and validate the oage is redirected to step two of the checkout process
async fillCheckoutInfo(firstName,lastName,postalCode)
{
     await  this.firstName.fill(firstName);
     await this.lastName.fill(lastName);
     await this.postalCode.fill(postalCode);
     await this.continueButton.click();  
     await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    
}

// in step two of the checkout, verifies the name of the item, the price and the total price after tax,
// clicks the finish button and validates the navigation to the confirmation page.
// validates the confirmation message appears.
async verifyOverview(){
    const name = await this.itemName.innerText();
    const price = await this.itemPrice.innerText();
    const totalPrice = await this.totalPrice.innerText();
  

        expect(name).toBe('Sauce Labs Bike Light');
        expect(price).toBe('$9.99');
        expect(totalPrice).toBe('Total: $10.79');
        
        await this.finishButton.click();

        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        const confirmationMessage = await this.confirmation.innerText();
        expect(confirmationMessage).toBe('Thank you for your order!');
}

// logs user out of the website and validates redirection to the login page.
async logout(){
    await this.menu.click();
    await this.logoutButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
}

}
module.exports = {CheckoutPage};
