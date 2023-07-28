import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes["header-container"]}>
      <button
        className={`${classes["cart-button"]} ${
          props.showCart && classes["cart-button-active"]
        }`}
        onClick={props.onClick}
      >
        My Cart ({props.cartList.reduce((acc, cur) => acc + cur.quantity, 0)})
      </button>
      <div
        className={classes["cart-body"]}
        style={!props.showCart ? { display: "none" } : {}}
      >
        {props.cartList.map((e) => (
          <div key={e.id + e.size} className={classes["cart-content"]}>
            <img
              src={props.product.imageURL}
              alt="product"
              className={classes["product-image"]}
            />
            <div>
              <p className={classes["product-info"]}>{props.product.title}</p>
              <div className={classes["cart-content"]}>
                <p className={classes["product-info"]}>{e.quantity}x</p>
                <p className={classes["product-price"]}>
                  ${props.product.price.toFixed(2)}
                </p>
              </div>
              <p className={classes["product-info"]}>
                Size:
                {
                  props.product.sizeOptions.filter(
                    (ele) => ele.id === e.size
                  )[0].label
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
