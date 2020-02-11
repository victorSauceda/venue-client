import React from "react";
export default function Cart(props) {
  console.log(props.cartItems);
  return (
    <div>
      <h2>My Cart</h2>
      {props.cartItems.length > 0 ? (
        <div>
          {props.cartItems.map((item, key) => {
            //    <CartItem></CartItem>
            return (
              <div key={key}>
                <p>{item.name}</p>
                <p>{item.dietType}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Cart is Currently Empty</p>
      )}
    </div>
  );
}
