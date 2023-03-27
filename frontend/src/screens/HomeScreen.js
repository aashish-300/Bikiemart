import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { AiOutlineDown } from "react-icons/ai";
import { listProducts } from "../actions/productActions";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const productCategory = useSelector((state) => state.productCategory);
  const { error, loading, products, page, pages } = productCategory.clicked
    ? productCategory
    : productList;

  let keyword = history.location.search;


  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);



  return (
    <div style={{}}>
      <div style={{ display: "flex", "align-items": "center" }}>
        
        <h1>Latest Products</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row xs={1} sm={2} md={3} lg={4} xl={4} className='g-4'>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={4} lg={3} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
