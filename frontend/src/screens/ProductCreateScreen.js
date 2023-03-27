import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductCreateScreen({ history }) {
  //   const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("spare and parts");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const productCreate = useSelector((state) => state.productCreate);
  const [imageUpload, setImageUpload] = useState(false);
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const [file,setFile] = useState(null);
  let formData;
  console.log("formdata outsite");
  useEffect(() => {
    console.log("useeffect clicked");

    // if (imageUpload) {
    //   uploadFileHandler();
    // }
    if (createdProduct) {
      console.log(createdProduct._id);
      // formData.append("product_id", productId);
      console.log("create success");
      //   uploadFileHandler();
      postImage(createdProduct._id);
      setTimeout(() => {
        history.push("/admin/productlist");
        console.log("created successful");
      }, 3000);
      //   dispatch({ type: PRODUCT_UPDATE_RESET });
    }
    //   if (!product.name || product._id !== Number(productId)) {
    //     dispatch(listProductDetails(productId));
    //     console.log("not product name");
    //   } else {
    // setName(product.name);
    // setPrice(product.price);
    // setImage(product.image);
    // setBrand(product.brand);
    // setCategory(product.category);
    // setCountInStock(product.countInStock);
    // setDescription(product.description);
    // console.log("details");
    //   }
    // }
  }, [
    dispatch,
    product,
    history,
    successUpdate,
    successCreate,
    errorUpdate,
    imageUpload,
    createdProduct,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("image name");
    console.log(image);
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );

    // dispatch(
    //   updateProduct({
    //     _id: productId,
    //     name,
    //     price,
    //     image,
    //     brand,
    //     category,
    //     countInStock,
    //     description,
    //   })
    // );
  };

  const postImage = async (productId) => {
    const formData = new FormData();
    console.log("here is file of image");
    console.log(file);
    formData.append("image", file);
    formData.append("product_id", productId);
    setUploading(true);
    formData.append("product_id", productId);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );
      console.log("formdata outsite");

      console.log("inside post upload");
      console.log(productId);
      console.log(data);
      console.log(formData);

      //   setImage(file.name);
      setUploading(false);
    } catch (error) {
      console.log(error);
      console.log("image upload error");
      setUploading(false);
    }
  };
  const uploadFileHandler = async (e) => {
    //    formData = new FormData();

    console.log("file handler");
    // console.log(productId);
    setFile(e.target.files[0]);
    // console.log(file);
    // setImage(file.name);
    // var formData = new FormData();

    // formData.append("image", file);
    console.log(file);
    // formData.append("product_id", productId);

    // setUploading(true);

    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   };

    //   const { data } = await axios.post(
    //     "/api/products/upload/",
    //     formData,
    //     config
    //   );
    //   console.log(data);
    //   console.log(formData);

    //   setImage(data);
    //   setUploading(false);
    // } catch (error) {
    //   console.log("image upload error");
    //   setUploading(false);
    // }
  };

  return (
    <div>
      <Link to='/admin/productlist'>Go Back</Link>

      <FormContainer>
        <h1>Create Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countinstock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='spare and parts'>spare and parts</option>
                <option value='Accessories'>Accessories</option>
                <option value='Modifation parts'>Modifation parts</option>
                <option value='Tires'>Tires</option>
                <option value='Helmets'>Helmets</option>
                <option value='Lubricants'>Lubricants</option>
              </select>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductCreateScreen;
