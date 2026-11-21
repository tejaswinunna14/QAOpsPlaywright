const base = require('@playwright/test');

const customtest = base.test.extend({
    TestdataForOrder: [
        {
            username: "tejaswinunna31@gmail.com",
            password: process.env.TEST_PASSWORD,
            productName: "ZARA COAT 3"
        },
        {
            username: "tejaswinunna14@gmail.com",
            password: process.env.TEST_PASSWORD_2,
            productName: "ADIDAS ORIGINAL"
        }
    ]
});

module.exports = { customtest };