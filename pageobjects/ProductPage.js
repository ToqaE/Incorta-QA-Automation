const { expect } = require("playwright/test");

class ProductPage {
    constructor(page) {
        this.page = page;
        this.productsInList = page.locator('.inventory_item');
        this.sortDdl = page.locator('.product_sort_container'); 
        this.addProductBag = page.locator('#add-to-cart-sauce-labs-backpack');
        this.removeProductBag = page.locator('#remove-sauce-labs-backpack');
        this.addProductLight = page.locator('#add-to-cart-sauce-labs-bike-light');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCart = page.locator('.shopping_cart_link');
    } 
    
    // in products page, validates the total number of displayed products is 6,
    // so all products in the website appeared successfully
    async validateProductsCount() {
        const count = await this.productsInList.count();
        expect(count).toEqual(6);
    }

// helper function to be used in validateProductDetails, to compare the actual and expected name, price and
// description of a product.
    async validateProduct(product, expected) {
        const name = await product.locator('.inventory_item_name').innerText();
        const description = await product.locator('.inventory_item_desc').innerText();
        const price = await product.locator('.inventory_item_price').innerText();

        expect(name).toBe(expected.name);
        expect(description).toBe(expected.description); 
        expect(price).toBe(expected.price);
    }

// validates products in the correct order sorted by name from a to z
    async validateProductsDetails() {
        const expectedProducts = [
            { name: 'Sauce Labs Backpack', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', price: '$29.99' },
            { name: 'Sauce Labs Bike Light', description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", price: '$9.99' },
            { name: 'Sauce Labs Bolt T-Shirt', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', price: '$15.99' },
            { name: 'Sauce Labs Fleece Jacket', description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", price: '$49.99' },
            { name: 'Sauce Labs Onesie', description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", price: '$7.99' },
            { name: 'Test.allTheThings() T-Shirt (Red)', description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.', price: '$15.99' },
        ];

        for (let i = 0; i < expectedProducts.length; i++) {
            const product = this.productsInList.nth(i);
            await this.validateProduct(product, expectedProducts[i]);
        }
    }

    // validates products are in order after sorting by price from low to high
    async validateSortedProductsByPrice() {
        const expectedProducts = [
           {name: 'Sauce Labs Onesie', description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", price: '$7.99' },
           { name: 'Sauce Labs Bike Light', description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", price: '$9.99' }, 
            { name: 'Sauce Labs Bolt T-Shirt', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', price: '$15.99' },
            { name: 'Test.allTheThings() T-Shirt (Red)', description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.', price: '$15.99' },
            { name: 'Sauce Labs Backpack', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', price: '$29.99' },
            { name: 'Sauce Labs Fleece Jacket', description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", price: '$49.99' },
        ];

        for (let i = 0; i < expectedProducts.length; i++) {
            const product = this.productsInList.nth(i);
            await this.validateProduct(product, expectedProducts[i]);
        }
    }

    //sorts the products by price.
    async sortByPrice(){
        await this.sortDdl.click();
        await this.page.selectOption('.product_sort_container', 'lohi');
    }

    //sorts products by name from a to z
    async sortByName(){
        await this.sortDdl.click();
        //await this.sortDdl.nth(2).click();
        await this.page.selectOption('.product_sort_container', 'az');
    }

    //adds 2 products to the cart and validates the count of these items to be equal 2
    async addToCart(){
       
        await this.addProductBag.click();
        await this.addProductLight.click();
        const itemsInCart = await this.shoppingCartBadge.innerText();
        const itemCount = parseInt(itemsInCart, 10);
        expect(itemCount).toBe(2);
    }

    //removes a product from the cart and validates the count in the cart to be 1
    async removeFromCart(){
        await this.removeProductBag.click();
        const itemsInCart = await this.shoppingCartBadge.innerText();
        const itemCount = parseInt(itemsInCart, 10);
        expect(itemCount).toBe(1);;
    }

    //clicks on the cart icon in the upper right corner to navigate from products page to cart page
    async navigateToCart(){
        await this.shoppingCart.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }
   
    
}

module.exports = { ProductPage };
