import Header from '../Header'

import IteminCart from '../IteminCart'

import SavedproductsContext from '../../Context/SavedproductsContext'

import './index.css'

const Cart = () => (
  <SavedproductsContext.Consumer>
    {value => {
      const {ItemsinCart} = value

      if (ItemsinCart.length === 0) {
        return (
          <>
            <Header />
            <div className="cart-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
                alt="cart"
                className="cart-img"
              />
            </div>
          </>
        )
      }
      return (
        <>
          <Header />
          <ul className="cartItems-container">
            {ItemsinCart.map(eachItem => (
              <IteminCart details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </>
      )
    }}
  </SavedproductsContext.Consumer>
)

export default Cart
