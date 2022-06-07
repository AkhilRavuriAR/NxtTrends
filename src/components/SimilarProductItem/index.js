import './index.css'

const SimilarProductItem = props => {
  const {details} = props

  const {imageUrl, title, brand, rating, price, id} = details
  return (
    <li className="listItemSimilarProducts">
      <img
        className="similarproductImage"
        src={imageUrl}
        alt="similar product"
      />
      <h1>{title}</h1>
      <p>by {brand}</p>
      <div>
        <p className="product-price">Rs {price}/-</p>
        <div className="ratingcontainer">
          <p className="rating-text">{rating}</p>
          <img
            className="star-image"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="start"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
