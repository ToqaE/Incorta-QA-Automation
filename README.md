**E2E Test Assessment for QA Automation Engineer**

This project is an automated testing suite for the SauceDemo website, built using Playwright. The tests cover various scenarios, including login validation, product validation, cart functionality, and checkout flow.

**Prerequisites**

Node.js and npm: Ensure you have Node.js installed, which includes npm (Node Package Manager).
Check versions:

node -v
npm -v

**Setup**

1. Clone the Repository
Clone the repository to your local machine:  
git clone < repository-url >  
cd < repository-directory >  

2. Install Dependencies
Install the required Node packages, including Playwright:  
npm install  
This will install all dependencies listed in the package.json file.  

3. Install Playwright Browsers  
Playwright requires a set of browsers to be downloaded for testing:  
npx playwright install  


**Running the Tests**  

To execute all tests, use the following command:  
npx playwright test  


**Folder Structure**

-pageobjects: Contains page object files for each page tested, implementing methods to interact with page elements.

-e2e: Contains the test file that run various scenarios.

-playwright-report: Stores the HTML report 

-tests.spec.js-snapshots: Stores the screenshots
