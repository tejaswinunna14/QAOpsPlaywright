Feature: Ecommerce validations
@Validation
Scenario: Place the order
    Given login to the Ecommerce2 application with "<username>" and "<password>"
    Then error message is displayed

    Examples:
        | username                  | password      | 
        | tejaswinunna31@gmail.com  | Tejaswi@14    |
        | hello@gmail.com           | Hello@12      |