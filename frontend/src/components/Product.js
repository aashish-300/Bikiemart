import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded card-product">
            <Link to={`/product/${product._id}`}>
                <Card.Img className="product-image" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    {product.description.slice(0, 30)}...
                </Card.Text>
                <Card.Text as="h3">Rs {product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
