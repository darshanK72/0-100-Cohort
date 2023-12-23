/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {

  str = str.toLowerCase();
  str1 = "";
  str2 = "";

  for(let i = 0; i < str.length; i++){
    if(str[i] >= 'a' && str[i] <= 'z'){
      str1 += str[i];
    }
  }

  for(let i = str.length - 1; i >= 0; i--){
    if(str[i] >= 'a' && str[i] <= 'z'){
      str2 += str[i];
    }
  }

  console.log(str1 + " " + str2);
  if(str1 == str2){
    return true;
  }
  return false;
}

module.exports = isPalindrome;
