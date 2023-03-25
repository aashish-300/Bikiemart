import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { listProducts, listProductsCategory } from "../actions/productActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let nothing = "";

  const dispatch = useDispatch();
  // const productList = useSelector((state) => state.productList);
  // const productCategory = useSelector((state) => state.productCategory);

  // const { error, loading, products, page, pages } = click
  //   ? productCategory
  //   : productList;

  const logoutHandler = () => {
    dispatch(logout());
  };
  // let keyword = history.location.search;
  const loadPage = () => {
    dispatch(listProducts());
  }

  const filterCategory = () => {
    dispatch(listProductsCategory(nothing));
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand
              onClick={() => {
                loadPage()
              }}
            >
              Ecommerce
            </Navbar.Brand>
          </LinkContainer>
          <Dropdown>
            <Dropdown.Toggle variant='' id='dropdown-basic'>
              categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  nothing = "spare and parts";
                  filterCategory();
                }}
              >
                spare and parts
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  nothing = "Accessories";
                  filterCategory();
                }}
              >
                Accessories
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  nothing = "Modifation parts";
                  filterCategory();
                }}
              >
                Modifation parts
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  nothing = "Tires";
                  filterCategory();
                }}
              >
                Tires
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  nothing = "Helmets";
                  filterCategory();
                }}
              >
                Helmets
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  nothing = "Lubricants";
                  filterCategory();
                }}
              >
                Lubricants
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />

            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenue'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Stocks</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
