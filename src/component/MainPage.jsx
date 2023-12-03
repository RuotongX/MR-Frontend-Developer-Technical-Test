import React, { useEffect, useState } from "react";
import classes from "./MainPage.module.css";
import axios from "axios";

const MainPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productSize, setProductSize] = useState(0);
 

  const getData = async () => {
    const { data } = await axios.get(
      `https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product`
    );
    props.setProduct(data);//Because of props passing the value, forcing the function to run again with the new values.
    console.log(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // getData();
    axios.get(
      `https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product`
    ).then((data) => {
    props.setProduct(data?.data);
    console.log(data);
    setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !isLoading ? (
    <div className={classes["main-page-container"]}>
      
      <img
        src={props.product.imageURL}
        alt="product"
        className={classes["product-image"]}
      />
      <div className={classes["product"]}>
        <h3 className={classes["product_title"]}>{props.product.title}</h3>
        <h4 className={classes["product_price"]}>
          ${parseFloat(props.product.price).toFixed(2)}
        </h4>
        <p className={classes["product_details"]}>
          {props.product.description}
        </p>
        <div className={classes["product_in_row"]}>
          <p className={classes["product_size"]}>SIZE</p>
          <p className={classes["product_essential"]}>*</p>
        </div>
        <div className={classes["product_in_row"]}>
          {props.product.sizeOptions.map((e) => (
            <button
              key={"Product-Size-Option" + e.id}
              className={
                productSize === e.id
                  ? classes["product_size_button_selected"]
                  : classes["product_size_button_unselected"]
              }
              onClick={() => {
                setProductSize(e.id);
              }}
            >
              {e.label}
            </button>
          ))}
        </div>
        <button
          className={classes["product_confirm_button"]}
          onClick={() => {
            if(productSize!==0){
              props.addItemToCart(props.product.id, productSize,props.product.title,props.product.price);
            }
            
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  ) : (
    <h1>Loading!!</h1>
  );
};

export default MainPage;
