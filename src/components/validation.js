    //Validation methods 
    export function validateAlphabetic (str) {
        var validateRegex = new RegExp(/[^A-Za-z]/gi,"g");
    
        if(!validateRegex.test(str))
          return null
        else
          return "Value should only contain alphabetic characters"
      }
    
      export function validateAlphaNumeric(str) {
        var validateRegex = new RegExp(/[^A-Za-z0-9]/gi,"g");
        if(!validateRegex.test(str))
          return null
        else
          return "Value should only contain alphabetic or numeric characters"
      }
    
      export function validateNumeric(str) {
        var validateRegex = new RegExp(/[^0-9]/gi,"g");
        if(!validateRegex.test(str))
          return null
        else
          return "Value should only contain numeric characters"
      }
    
      export function validatePostal(str) {
        var validateRegex = new RegExp(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[A-Za-z]{2}$/i,"g");
        if(validateRegex.test(str))
          return null
        else
          return "Value is not a valid postal code"
      }
