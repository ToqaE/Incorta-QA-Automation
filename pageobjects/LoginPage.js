const { expect } = require('@playwright/test');
class LoginPage {

constructor(page)
{
    this.page = page;
    this.signInbutton= page.locator("#login-button");
    this.userName = page.locator("#user-name");
    this.password = page.locator("#password");
    this.invalidLoginMsg = page.locator("//*[@id='login_button_container']/div/form/div[3]/h3");

}

//navigates to the url passed to it
async goTo(url)
{
    await this.page.goto(url);
}

//logs in using the credentials passed to it by typing the values to the  textboxes
//pressing the login button
async userLogin(username,password)
{
    await  this.userName.fill(username);
     await this.password.fill(password);
     await this.signInbutton.click();  
}
//to verify the message that appears when the login credentials are incorrect
async verifyMessage()
{

    const messageText = await this.invalidLoginMsg.innerText();

    // Assert the expected message
    if (messageText.includes('Epic sadface: Username and password do not match any user in this service')) {
        console.log('message verification successful');
    } else {
        console.log('message verification failed');
    }
}

//verify the successfull login by checking that the link of the page was directed to the products page
async verifyLogin()
{
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

}
module.exports = {LoginPage};