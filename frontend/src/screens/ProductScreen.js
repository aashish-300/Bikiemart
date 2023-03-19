import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <div>
            <Link to='/' className='btn btn-success my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        

                                        <ListGroup.Item>
                                            Price: Rs {product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>RS {product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                            <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                    {product.countInStock > 0 ? 
                                                    (product.countInStock <= 5 ? 
                                                        `Only ${product.countInStock} left` : 
                                                        'In Stock') : 
                                                        <span style={{color: "red", fontWeight: "bold"}}>Out of Stock</span> 
  }
                                                         </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                            <ListGroup.Item><Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Button variant="danger" style={{ padding: "5px 10px" }} onClick={() => setQty(Math.max(qty - 1, 1))}>-</Button>
                                                    <span className="mx-3">{qty}</span>
                                                    <Button variant="success" style={{ padding: "5px 10px" }} onClick={() => setQty(Math.min(qty + 1, Math.min(5, product.countInStock)))}>+</Button>
                                                    </Col></Row></ListGroup.Item>
                                                    )}
                                                    <ListGroup.Item>
                                                <Button variant="info"
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock == 0}
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            
                        </div>
                    )

            }


        </div >
    )
}

export default ProductScreen
