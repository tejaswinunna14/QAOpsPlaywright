Feature: Ecommerce validations
@Regression
Scenario: Place the order
    Given login to the Ecommerce application with "tejaswinunna31@gmail.com" and "Tejaswi@14"
    When add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and Place the order
    Then verify th order is displayed in the order history
     