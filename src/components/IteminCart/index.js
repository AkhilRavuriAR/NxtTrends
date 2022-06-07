import './index.css'

const IteminCart = props => {
  const {details} = props
  console.log(details)
  const {
    imageUrl,
    title,
    price,
    description,
    brand,
    totalReviews,
    rating,
    availability,
    quantity,
  } = details

  return (
    <li className="cartItem-container">
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

            <p className="descriptiontext">
              <strong>Available:</strong> {availability}
            </p>
            <p className="descriptiontext">
              <strong>Brand:</strong> {brand}
            </p>
            <p>Quantity :{quantity}</p>
            <hr className="line" />
          </div>
        </div>
      </div>
    </li>
  )
}
export default IteminCart
