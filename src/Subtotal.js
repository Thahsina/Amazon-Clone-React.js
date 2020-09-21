import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory(); //this gives the browse history
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
      <button onClick = {e => history.push ('/payment')}>Proceed to Checkout</button>
      {/* when the button Proceed to checkout is clicked push/add the payments page into the browser ,
       redirect the checkout page to payments page.
       Not using Limk here coz we dont dont want to lose the styling of the button, 
       if we use link the button will look like a link with blue text and underlined */}
    </div>
  );
}
export default Subtotal;
