# Assignment

Create a web component based on LitHTML to enter a Dutch address. Display the web component on an HTML page.
Use the provided (open-wc) project scaffolding as the basis. The project should include the specified unit tests.

## Additional resources

+ [LitElement documentation](https://lit-element.polymer-project.org/guide)
+ [Open Web Components testing helpers](https://open-wc.org/docs/testing/testing-package/#testing-helpers)  
  (Note: setup for testing is already done)

## Run the project

To run the project:
- Install NodeJS >= v15
- Run `npm install` on the project root folder
- Run `npm start` to start the dev server
- Run tests `npm run test`

## Form

Fields on the form are

- street name
- house number
- house number addition
- postal code
- city
- additional information

The form also has a submit button. When the button is clicked a messagebox is displayed in which the address is shown in the format:

```
<additional information>
<street name> <house number> <house number addition>
<postal code>  <city>
```

## Validations

Implement the following field validations:

### Street name

+ mandatory input
+ only numeric and alphanumeric characters
+ max input length 30 characters

### house number

+ mandatory input
+ only numeric values
+ max input length 5

### house number addition

+ only alphanumeric characters
+ max input length 5 characters

### postal code

+ mandatory input
+ valid input is NNNN AA or NNNNAA where  
  N = numeric character
  A = alphanumeric character
+ when entered as NNNNAA it should be reformated as NNNN AA

### city

+ mandatory input
+ numeric and alphanumeric characters allowed
+ max input length 30 characters

### additional information

+ numeric and alphanumeric characters allowed
+ max input length 50 characters

## Invalid input

For every field that doesn't pass the field validations an error line is displayed on the form.
The submit button should not display the messagebox if one or more field validations fail.

## Unit tests

Create unit tests to check:

1. the field validation business rules
2. the display of a proper error message in case an invalid postal code is entered on the form
