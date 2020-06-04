// Write a program in pseudocode that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.

// for (let i = 1; i <= 100; i++) {
//   switch (true) {
//     case i % 5 === 0 && i % 3 === 0:
//       console.log("fizz buzz");

//       break;
//     case i % 5 === 0:
//       console.log("buzz");
//       break;
//     case i % 3 === 0:
//       console.log("fizz");
//       break;
//     default:
//       console.log(i);
//       break;
//   }
// }
// Write a function in pseudocode that will format a string. It will take in two parameters, a format string, and an array of string replacements. The format string will use placeholders of the form "{N}" where N is an integer. The method will replace such placeholders with the Nth item from the array of replacement strings. The function will return the resulting string.

// `My name is {N}. I am a very good looking {N}. I enjoy walking on the {N} and riding on {N}.`

// [‘Misha’, ‘man’, ‘beach’, ‘horses’]

function strReplacement(str, arr) {
  let newStr = "";

  for (let index = 0; index < str.length; index++) {
    console.log(index);
    if (str[index] === "{") {
      newStr += arr[0];
      arr.shift();
      index++;
      index++;
      index++;
    }

    newStr += str[index];
  }
  return console.log(newStr);
}
let tempstring = `My name is {N}. I am a very good looking {N}. I enjoy walking on the {N} and riding on {N}.`;
let temparray = ["misha", "man", "beach", "horses"];
strReplacement(tempstring, temparray);
