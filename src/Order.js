import React from 'react';
import moment from "moment";
import './Order.css'
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
    return (
        <div className = 'order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mna")}</p>
            <p className = "order__id">
              <small>{order.id}</small>
            </p>
            {order.data.basket?.map(order => (
                 <CheckoutProduct
                   id={order.id}
                   title={order.title}
                   image={order.image}
                   price={order.price}
                   rating={order.rating}
                   hideButton
               />  

            ))}
             <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={order.data.amount / 100}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
             />
        </div>
    )
}

export default Order ;
