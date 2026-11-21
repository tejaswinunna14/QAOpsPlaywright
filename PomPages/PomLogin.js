exports.PomLogin = class PomLogin{
    constructor(page){
        this.page= page;
        this.loginLink = "#login2";
        this.userName  = "#loginusername";
        this.passWord = "#loginpassword";
        this.loginButton = 'button[onclick="logIn()"]';
    }

    async gotoLoginUrl(){
        await this.page.goto("https://www.demoblaze.com/index.html");
    }

    async LoginPage(username, password){
        await this.page.locator(this.loginLink).click();
        await this.page.locator(this.userName).fill(username);
        await this.page.locator(this.passWord).fill(password);
        await this.page.locator(this.loginButton).click();
    }
}