let transactions = [
  {
    customerFirstName: "John",
    customerLastName: "Doe",
    restaurantName: "Dicks",
    orderId: "123456",
    itemsOrdered: [
      {
        name: "chicken",
        quantity: "3",
        dietType: "keto",
        price: 14
      },
      {
        name: "rice",
        quantity: "4",
        dietType: "keto",
        price: 12
      }
    ],

    price: 26
  },
  {
    customerFirstName: "Misha",
    customerLastName: "money",
    restaurantName: "Monday",
    orderId: "123456",
    itemsOrdered: [
      {
        name: "chicken",
        quantity: "3",
        dietType: "paleo",
        price: 14
      },
      {
        name: "rice",
        quantity: "4",
        dietType: "paleo",
        price: 12
      }
    ],

    price: 26
  },
  {
    customerFirstName: "Sierra",
    customerLastName: "Money",
    restaurantName: "Dandelion",
    orderId: "123456",
    itemsOrdered: [
      {
        name: "chicken",
        quantity: "3",
        dietType: "vegan",
        price: 14
      },
      {
        name: "rice",
        quantity: "4",
        dietType: "vegan",
        price: 12
      }
    ],

    price: 26
  }
];

export default transactions;
