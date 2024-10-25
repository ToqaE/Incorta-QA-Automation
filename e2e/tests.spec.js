const { test, expect } = require('@playwright/test');
const POManager = require('../pageobjects/POManager');

test.use({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

test('TC: invalid login', async ({ page }, testInfo) => {


  const poManager = new POManager(page);

  const URL = 'https://www.saucedemo.com/';
  const invalidUsername = 'Toqa1234';
  const password = 'secret_sauce';
  

  const LoginPage = poManager.getLoginPage(page);


  await page.goto(URL); // navigates to the website.
  await LoginPage.userLogin(invalidUsername, password); // logs in using invalid username and password values.
  await page.waitForTimeout(3000); // waits for the invalid login message to appear
  expect(await page.screenshot()).toMatchSnapshot('invalidLoginScreenshot.png'); // screenshots comparison for -ve scenario
  await LoginPage.verifyMessage(); //verify invalid login message
  

})
test('TC: valid E2E', async ({ page }, testInfo) => {


  const poManager = new POManager(page);

  const URL = 'https://www.saucedemo.com/';
  const validUsername = 'standard_user';
  const password = 'secret_sauce';
  const firstName = 'QA';
  const lastName = 'Test';
  const postalCode = '123456';
  

  const LoginPage = poManager.getLoginPage(page);
  const ProductPage = poManager.getProductPage(page);
  const CartPage = poManager.getCartPage(page);
  const CheckoutPage = poManager.getCheckoutPage(page);
 


  await page.goto(URL); // navigates to the website.
  await LoginPage.userLogin(validUsername, password); // logs in using valid username and password values.
  await LoginPage.verifyLogin(); //verifies navigation to products page
  await ProductPage.validateProductsCount(); //verifies all products are displayed
  await ProductPage.validateProductsDetails(); // verifies products name, price and description
  await ProductPage.sortByPrice(); //sorts items by price
  await ProductPage.validateSortedProductsByPrice(); // validates items are sorted by price
  await ProductPage.sortByName(); //sorts items by name
  await ProductPage.validateProductsDetails(); // validates items are sorted by name
  await ProductPage.addToCart(); //adds 2 items to cart
  await ProductPage.removeFromCart(); //removes 1 item from cart
  await ProductPage.navigateToCart(); //navigates to cart page
  await CartPage.VerifyProductInCart(); // verifies the product details in the cart
  await CartPage.Checkout(); //navigates to checkout page
  await CheckoutPage.fillCheckoutInfo(firstName, lastName, postalCode); //fills checkout data: first and last name and postal code
  await CheckoutPage.verifyOverview(); //reviews product, placing order and validates that order is placed
  await CheckoutPage.logout(); //user logs out and is redirected to login page
  
})

test('TC: Visual Regression Test for Valid Scenario', async ({ page }, testInfo) => {


  const poManager = new POManager(page);

  const URL = 'https://www.saucedemo.com/';
  const validUsername = 'standard_user';
  const password = 'secret_sauce';
  const firstName = 'QA';
  const lastName = 'Test';
  const postalCode = '123456';
  

  const LoginPage = poManager.getLoginPage(page);
  const ProductPage = poManager.getProductPage(page);
  const CartPage = poManager.getCartPage(page);
  const CheckoutPage = poManager.getCheckoutPage(page);
 


  await page.goto(URL); // navigates to the website.
  expect(await page.screenshot()).toMatchSnapshot('LoginPage.png');
  await LoginPage.userLogin(validUsername, password); // logs in using valid username and password values.
  await LoginPage.verifyLogin();
  await ProductPage.validateProductsCount();
  await ProductPage.validateProductsDetails();
  await ProductPage.sortByPrice();
  await ProductPage.validateSortedProductsByPrice();
  expect(await page.screenshot()).toMatchSnapshot('productsSortedPrice.png');//visual confirmation for the sort
  await ProductPage.sortByName();
  await ProductPage.validateProductsDetails();
  expect(await page.screenshot()).toMatchSnapshot('productsSortedAz.png'); //visual confirmation for the sort
  await ProductPage.addToCart();
  await ProductPage.removeFromCart();
  await ProductPage.navigateToCart();
  await CartPage.VerifyProductInCart();
  expect(await page.screenshot()).toMatchSnapshot('productsInCart.png'); //visual confirmation for the products in the cart
  await CartPage.Checkout();
  await CheckoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
  await CheckoutPage.verifyOverview();
  await CheckoutPage.logout();
})