import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { TbReplace } from 'react-icons/tb';
import { CiDeliveryTruck } from 'react-icons/ci';
import { MdOutlinePolicy } from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../app/redex/counterSlice';

const ProductSingle = () => {
  const { id } = useParams();
  const [val, setVal] = useState(null);

  const dispatch = useDispatch(); // Move useDispatch to the top level

  useEffect(() => {
    const delay = Math.floor(Math.random() * 1000) + 1000;

    const timer = setTimeout(() => {
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then(function (response) {
          setVal(response.data);
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, delay);
    return () => clearTimeout(timer);
  }, [id]);

  if (!val) {
    return (
      // <div className='loderser'>
      //   <div className="loader ">
      //     <span className="loader-text">loading</span>
      //     <span className="load"></span>
      //   </div>
      // </div>
      <div className='loderser'>
      <span class="loader"></span>
      </div>

    );
  }

  const handleImageClick = (image) => { 
    setVal({ ...val, thumbnail: image });
  };

  const addproduct = (val) => {
    dispatch(addItem(val));
  };

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col className="col-lg-6 order-1 ps-0 d-flex">
            <div>
              {val.images.map((image, index) => {
                return (
                  <img
                    className="mt-2 phone"
                    key={index}
                    src={image}
                    alt={`Product Image ${index}`}
                    onClick={() => handleImageClick(image)}
                    width={90}
                  />
                );
              })}
            </div>
            <Col>
              <img src={val.thumbnail} className='big_phone' alt="Product Thumbnail" />
            </Col>
          </Col>
          <Col className="col-lg-6  order-3">
            <h3>{val.title}</h3>
            <h5>{val.category}</h5>
            <p>{val.description}</p>
            <p>
              <b>Offer :</b> {val.discountPercentage} % off
            </p>
            <p>
              <b>Price :</b> $ {val.price}
            </p>
            <p className="text-warning">
              <b className="text-dark">Rating :</b>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <span className="text-dark">{val.rating}</span>
            </p>
            <p>
              <b>Stock :</b> {val.stock}
            </p>
            <h6>
              <b>Brand :</b> {val.brand}
            </h6>
            <Row className="mx-3">
              <Col className="col-5 border text-center py-2 mt-5 m-2 rounded-5 btn btn-warning">
                <Link to='/Addcard'>Go To Cart</Link>
              </Col>
              <Col className="col-5 border text-center py-2 mt-5 m-2 rounded-5 btn btn-warning">
                <button onClick={() => addproduct(val)}>Add To Cart</button>
              </Col>
            </Row>

            <Row>
              <div className="services mt-5 d-flex">
                <Col className="col-md-4">
                  <div className="border rounded-5 sm-w-25 text-center m-2">
                    <h1>
                      <CiDeliveryTruck />
                    </h1>
                    <p>Free Delivery</p>
                  </div>
                </Col>
                <Col className="col-md-4">
                  <div className="border rounded-5 sm-w-25 text-center m-2">
                    <h1>
                      <TbReplace />
                    </h1>
                    <p>7 Days Replacement</p>
                  </div>
                </Col>
                <Col className="col-md-4">
                  <div className="border rounded-5 sm-w-25 text-center m-2">
                    <h1>
                      <MdOutlinePolicy />
                    </h1>
                    <p>Warranty Policy</p>
                  </div>
                </Col>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductSingle;
