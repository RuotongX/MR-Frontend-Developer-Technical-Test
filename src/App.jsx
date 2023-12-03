import React, { useState } from "react";
import classes from "./AppStyle.module.css";
import Header from "./component/Header";
import MainPage from "./component/MainPage";

function App() {
  const [product, setProduct] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [cartBody,setCartBody] = useState(false);

  const addItemToCart = (id, size,title,price) => {
    if (cartList.length === 0) {
      setCartList([{ id: id, size: size,title:title,price:price, quantity: 1 }]);
      return;
    }

    var newList = [...cartList];
    for (var i = 0; i < newList.length; i++) {
      if (newList[i].id === id && newList[i].size === size) {
        newList[i].quantity += 1;
        setCartList(newList);

        console.log(cartList);
        return;
      }
    }

    setCartList([...newList, { id: id, size: size,title:title,price:price, quantity: 1 }]);
  };

  return (
    <div className={classes["main-container"]}>
      <Header
        product={product}
        showCart={showCart}
        cartList={cartList}
        cartBody={cartBody}
        onClick={() => {
            setShowCart(!showCart);
            if(cartList.length!==0){
              setCartBody(!cartBody);
            } else{
              setCartBody(false);
            }
        }}
      />
      <MainPage
        product={product}
        setProduct={setProduct}
        addItemToCart={addItemToCart}
      ></MainPage>
    </div>
  );
}

export default App;
