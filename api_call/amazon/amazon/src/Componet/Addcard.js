import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../app/redex/counterSlice';
import { CiCircleMinus } from "react-icons/ci";
import { BsPlusCircle } from "react-icons/bs";

const Addcard = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item));
  };

  const [quantities, setQuantities] = useState(cart.map(() => 1));

  const handleQuantityChange = (index, newQuantity) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = newQuantity > 0 ? newQuantity : 1;
    setQuantities(updatedQuantities);
  };

  const getTotal = (item, index) => {
    return item.price * quantities[index];
  };

  return (
    <div>
      <Container>
        <table className='w-100 table table-bordered text-center mb-0"'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td className="align-middle cart-img text-start">
                  <img src={item.images[0]} alt={item.title} style={{ width: 50, height: 40 }} className='me-3 ms-3' />
                  {item.title}
                </td>
                <td className="align-middle ">$ {item.price}</td>
                <td className="align-middle">
                  <div className="input-group quantity mx-auto" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-minus  rounded-0 icon1"
                        onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                      >
                       <CiCircleMinus className='btn-outline-dark'></CiCircleMinus>
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-sm  text-center"
                      value={quantities[index]}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                    />
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm  rounded-0 icon1" 
                        onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                      >
                        <BsPlusCircle  className='btn-outline-dark'></BsPlusCircle>
                      </button>
                    </div>
                  </div>
                </td>
                <td className="align-middle">$ {getTotal(item, index)}</td>
                <td className="align-middle">
                  <button className="btn btn-sm close btn-outline-dark rounded-0" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Addcard;
