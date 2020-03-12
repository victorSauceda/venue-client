let items = [
  {
    venueName: "Keto Diner",
    name: "Keto Burger",
    img:
      "https://i.dietdoctor.com/wp-content/uploads/2015/08/low_carb_bacon_cheeseburger_wraps_v.jpg?auto=compress%2Cformat&w=400&h=225&fit=crop",
    alt: "some",
    price: 15,
    calories: 1500,
    distance: 1.25,
    dietTypeIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST4i1kA-LTk2HGE-oplPgZoXGH2itgEHL-HCLRBJlM-uRtf3Cm",
    description:
      "Take your favorite fast food meal and make it low carb and healthy simply by wrapping it in lettuce. We used our favorite cheeseburger and turned it into a quick, easy low carb dinner recipe.",
    alt: "blah",
    dietType: "keto"
  },
  {
    venueName: "Paleo Diner",
    name: "Broccoli and Shrimp",
    img:
      "https://static.parade.com/wp-content/uploads/2018/11/dairy-free-meals-f.jpg",
    alt: "some",
    price: 14,
    calories: 1000,
    distance: 1.23,
    dietType: "paleo",
    description:
      "A healthy low carb paleo buffalo chicken casserole is perfect for sharing with friends and family on game days. It’s sure to score a win!",
    alt: "blah"
  },
  {
    venueName: "Paleo 4 U",
    name: "Chicken Bowl with Cucumber Riata",
    alt: "some",
    img:
      " https://www.cottercrunch.com/wp-content/uploads/2019/03/zaatar-chicken-bowls-with-cucumber-riata.jpg",
    price: 16,
    calories: 1600,
    distance: 34.6,
    dietType: "paleo",
    description:
      "This Za’atar Chicken Bowl with Tomato and Cucumber Raita makes a paleo dinner that’s packed with flavor and anti-inflammatory benefits! It’s easy to make and so delicious",
    alt: "blah"
  }
];
export default items;

let body = {
  restId: String,
  custId: String,
  orderId: String,
  timeStamp: { type: Date, default: Date.now },
  restName: String,
  custName: String,
  name: String,
  distance: Number,
  dietType: String,
  salesTax: Number,
  total: Number,
  cartItems: Array,
  qty: Number
};
