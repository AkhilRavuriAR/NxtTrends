import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import SavedproductsContext from './Context/SavedproductsContext'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    ItemsinCart: [],
  }

  changeItemsinCart = Item => {
    const {ItemsinCart} = this.state

    const ItemPresentInCart = ItemsinCart.findIndex(
      eachItem => eachItem.id === Item.id,
    )

    if (ItemPresentInCart === -1) {
      const updatedCart = [...ItemsinCart, Item]
      this.setState({ItemsinCart: updatedCart})
    } else {
      const currentQuantity =
        ItemsinCart[ItemPresentInCart].quantity + Item.quantity
      ItemsinCart[ItemPresentInCart].quantity = currentQuantity
      this.setState({ItemsinCart})
    }
  }

  render() {
    const {ItemsinCart} = this.state
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/products" component={Products} />
        <SavedproductsContext.Provider
          value={{
            ItemsinCart,
            changeItemsinCart: this.changeItemsinCart,
          }}
        >
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </SavedproductsContext.Provider>
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    )
  }
}

export default App
