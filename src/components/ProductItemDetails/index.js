import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import SavedproductsContext from '../../Context/SavedproductsContext'

import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const ApiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {
    quantity: 1,
    ApiStatus: ApiStatusConstants.failure,
    productData: [],
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({ApiStatus: ApiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props

    const {params} = match
    const {id} = params
    console.log(id)
    const APIUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(APIUrl, options)
    const data = await response.json()

    if (response.ok) {
      const formattedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      }

      formattedData.similarProducts = formattedData.similarProducts.map(
        eachItem => ({
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          title: eachItem.title,
          style: eachItem.style,
          price: eachItem.price,
          description: eachItem.description,
          brand: eachItem.brand,
          totalReviews: eachItem.total_reviews,
          rating: eachItem.rating,
          availability: eachItem.availability,
        }),
      )
      console.log(formattedData)
      this.setState({
        productData: formattedData,
        ApiStatus: ApiStatusConstants.success,
      })
    } else {
      console.log(data.error_msg)
      this.setState({ApiStatus: ApiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        className="products-not-found-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <Link to="/products">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  )

  increaseQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  renderSuccessView = () => {
    const {productData, quantity} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productData

    productData.quantity = quantity

    return (
      <SavedproductsContext.Consumer>
        {value => {
          const {changeItemsinCart} = value
          const addItemstoCart = () => {
            changeItemsinCart(productData)
          }

          return (
            <div className="productDetails-container">
              <div className="aboutproduct">
                <img className="product-image" src={imageUrl} alt="product" />
                <div className="productDetails">
                  <h1 className="product-title">{title}</h1>
                  <p className="product-price">Rs {price}/-</p>
                  <div className="ratingandreview">
                    <div className="ratingcontainer">
                      <p className="rating-text">{rating}</p>
                      <img
                        className="star-image"
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="start"
                      />
                    </div>
                    <p>{totalReviews} Reviews</p>
                  </div>
                  <p className="descriptiontext">{description}</p>
                  <p className="descriptiontext">
                    <strong>Available:</strong> {availability}
                  </p>
                  <p className="descriptiontext">
                    <strong>Brand:</strong> {brand}
                  </p>
                  <hr className="line" />
                  <div className="quantity-container">
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={this.decreaseQuantity}
                      testid="minus"
                    >
                      <BsDashSquare />
                    </button>
                    <p className="quantitynumber">{quantity}</p>
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={this.increaseQuantity}
                      testid="plus"
                    >
                      <BsPlusSquare />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="addtocartButton"
                    onClick={addItemstoCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div>
                <h1>Similar Products</h1>
                <ul>
                  {similarProducts.map(eachProduct => (
                    <SimilarProductItem
                      details={eachProduct}
                      key={eachProduct.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </SavedproductsContext.Consumer>
    )
  }

  renderthepage = () => {
    const {ApiStatus} = this.state
    switch (ApiStatus) {
      case ApiStatusConstants.loading:
        return this.renderLoadingView()
      case ApiStatusConstants.failure:
        return this.renderFailureView()
      case ApiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderthepage()}
      </>
    )
  }
}

export default ProductItemDetails
