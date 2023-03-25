import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { AiOutlineDown } from "react-icons/ai";

import { listProducts, listProductsCategory } from "../actions/productActions";

function HomeScreen({ history }) {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const productCategory = useSelector((state) => state.productCategory);
  const list = useSelector((state) => state);
  console.log('here is jsdfljsalkdf')
  console.log(productCategory);
  const { error, loading, products, page, pages } = productCategory.clicked
    ? productCategory
    : productList;
  // const { error, loading, products, page, pages } = productCategory;

  let keyword = history.location.search;
  console.log("value of keyboard ");
  console.log(keyword);
  // let info = products;

  const [isShown, setIsShown] = useState(true);
  const reference = useRef([]);

  const [category, setCategory] = useState("");
  let nothing = '';
  const [no, setNo] = useState(products);
  // console.log("value of no");
  // console.log(productList);
  const [info, setInfo] = useState(productList.products);
  useEffect(() => {
    // console.log(no);
    reference.current = no;
    // console.log("referenced");
    // console.log(productList);

    // console.log(reference.current)
    // console.log(products);
    dispatch(listProducts(keyword));
    // setInfo(products);
  }, [dispatch, keyword, category, reference, no]);

  // console.log("here is all");
  // console.log(typeof info)
  // console.log(typeof reference.current)

  const filterCategory = () => {
    console.log('category dejljsd')
    console.log(nothing)
    dispatch(listProductsCategory(nothing));
    // dispatch({category: category})
    setClick(true);

    let details = products.filter((p) => {
      // console.log("inside filter");
      // console.log(p);
      return p.category === category;
    });
    setNo(details);
    setInfo(details);
    // console.log(category);
    // console.log("here is filter");
    // console.log(details);
    reference.current = details;
    // console.log(info);
  };

  return (
    <div style={{}}>
      <div style={{ display: "flex", "align-items": "center" }}>
        {/* <div
          className='text-lg font-bold'
          style={{
            position: "absolute",
            left: "4vw",
            top: "125px",
            "font-size": "15px",
            "font-weight": "semi-bold",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseEnter={() => setIsShown(true)}
          // onMouseLeave={() => setIsShown(false)}
        >
          <span>
            categories
            <AiOutlineDown />
          </span>
          {isShown && (
            <div>
              <div
                onClick={() => {
                  nothing = 'coconut'
                  setCategory("coconut");
                  filterCategory();
                }}
                className="mt-2"
              >
                coconut
              </div>
              <div
                onClick={() => {
                  nothing = 'lime'

                  setCategory("lime");
                  filterCategory();
                }}
                className="mt-0.5"
              >lime</div>
              <div
              onClick={() => {
                setCategory("lime");
                filterCategory();
              }}
              className="mt-0.5"

              >helelo</div>
              <div
              onClick={() => {
                setCategory("lime");
                filterCategory();
              }}
              className="mt-0.5"

              >helelo</div>
            </div>
          )}
        </div> */}
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
                <Product product={product} category={category} />
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
