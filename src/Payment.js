import React, { useState, useEffect } from "react";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios ";
import { db } from "./firebase"

function Payment() {
  const [{ basket, user }, disptach] = useStateValue();

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements(); //these elements will be used in CardElement component

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);


  useEffect (() => {
    //generate the special stripe secret  which allows us to charge a customer
    //but whenever the basket changes we need to tell stripe that we need a new secret, like when another item is added to basket 
    //the price will be increased. Hence this useEffect has [basket].
    
    //async funstion inside a useEffect
    const getClientSecret = async () => {
        const response = await axios({
            method: 'post',
            //stripe takes in the total in a currencies subunits i.e for $ it takes in as cents
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`  //this is an API call
        });
        setClientSecret(response.data.clientSecret) 
        //whenever basket changes this getClientSecret will update the special stripe secret which allows us to charge the coustomer the right amount.
        //this is a very important function!!!!!!.
        //This will go hand in hand with backend


    }
    getClientSecret();

    //async funstion inside a useEffect

    
  }, [basket])

  console.log('THE SECRET IS >>>', clientSecret)

  const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: elements.getElement(CardElement) //this card element is from the CardElement component below in payment__details
          }
      }).then(({paymentIntent}) => {
          //paymentIntent = payment confirmation

          db
           .collection('users')
           .doc(user?.uid)
           .collection('orders')
           .doc(paymentIntent.id)
           .set({
               basket: basket,
               amount: paymentIntent.amount,
               created: paymentIntent.created


           })

          setSucceeded(true);
          setError(null);
          setProcessing(false); //beginning of this function we had setprocessing to true now we need to say false.

          disptach({
              type: 'EMPTY_BASKET'
          })

          history.replace('/orders') // not history.push() coz 

      } ) //.then coz this is a promise, something will come back of promise i.e response.The response is (payment) but
      //we will need to destructure it with curly braces.paymentIntent is something which stripe gives us which causes payment conformation.
  };

  const handleChange = (e) => {
    // we here listen for the changes in CardElement and display any errors as the customer types their card data
    setDisabled(e.empty); //if the event is empty then disable the button
    setError(e.error ? e.error.message : ""); //if theres any errror show the error : show nothing
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
          {/* Checkout title will have a link to checkout page with number items  */}
        </h1>
        {/* payment section for delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* Payment section for reviewing the items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item) => {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>
        {/* payment section for payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe login in here */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__pricecontainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                </button>
              </div>
                 {/* Errors .Anything wrong with Card like card number it will pop up  */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
