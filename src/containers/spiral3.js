// # def get_indices_of_item_wights(arr, limit)
// #   return [] if arr.length < 2
// #   # your code goes here
// #   pointer1 = 0
// #   pointer2 = arr.length/2

// #   while(arr[pointer1] + arr[pointer2] != limit)
// #     pointer1 += 1
// #     pointer2 += 1
// #     break if pointer2 == arr.length - 1 && pointer1 == arr.length - 1
// #   end

// #   sum = arr[pointer1] + arr[pointer2]

// #   if sum == limit
// #     [pointer2, pointer1]
// #   else
// #     []
// #   end

// # end

// # p get_indices_of_item_wights([4, 6, 10, 15, 16], 21)

// var isPalindrome = function(x) {
//   let reverse = "";
//   for (let i = x.length - 1; i > 0; i--) {
//     reverse += x.charAt(i);
//     (reverse);
//     if (x == +reverse) {
//       return true;
//     }
//   }

//   return false;
// };
// (isPalindrome(121));

// You are in charge of a display advertising program. Your ads are displayed on websites all over the internet. You have some CSV input data that counts how many times that users have clicked on an ad on each individual domain. Every line consists of a click count and a domain name, like this:
// counts = [ "900,google.com",
//      "60,mail.yahoo.com",
//      "10,mobile.sports.yahoo.com",
//      "40,sports.yahoo.com",
//      "300,yahoo.com",
//      "10,stackoverflow.com",
//      "20,overflow.com",
//      "2,en.wikipedia.org",
//      "1,m.wikipedia.org",
//      "1,mobile.sports",
//      "1,google.co.uk"]
// Write a function that takes this input as a parameter and returns a data structure containing the number of clicks that were recorded on each domain AND each subdomain under it. For example, a click on "mail.yahoo.com" counts toward the totals for "mail.yahoo.com", "yahoo.com", and "com". (Subdomains are added to the left of their parent domain. So "mail" and "mail.yahoo" are not valid domains. Note that "mobile.sports" appears as a separate domain near the bottom of the input.)
// Sample output (in any order/format):
// calculateClicksByDomain(counts) =>
//   com:                     1340
//   google.com:              900
//   stackoverflow.com:       10
//   overflow.com:            20
//   yahoo.com:               410
//   mail.yahoo.com:          60
//   mobile.sports.yahoo.com: 10
//   sports.yahoo.com:        50
//   org:                     3
//   wikipedia.org:           3
//   en.wikipedia.org:        2
//   m.wikipedia.org:         1
//   mobile.sports:           1
//   sports:                  1
//   uk:                      1
//   co.uk:                   1
//   google.co.uk:            1
// n: number of domains in the input
// (individual domains and subdomains have a constant upper length)
// */
const counts = [
  "900,google.com",
  "60,mail.yahoo.com",
  "10,mobile.sports.yahoo.com",
  "40,sports.yahoo.com",
  "300,yahoo.com",
  "10,stackoverflow.com",
  "20,overflow.com",
  "2,en.wikipedia.org",
  "1,m.wikipedia.org",
  "1,mobile.sports",
  "1,google.co.uk",
];
function domains(arr) {
  for (let index = 0; index < arr.length; index++) {
    let split = arr[i].split(",");
  }
}
domains(counts);
