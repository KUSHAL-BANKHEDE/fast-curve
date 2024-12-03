import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import CatalogComponent from "./CatalogComponent";
import CartComponent from "./CartComponent";

function Catalog() {
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState(parseInt(localStorage.getItem("orderId") || 1));
  const [showModal, setShowModal] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, qty: 1 }]);
  };

  const updateQty = (itemId, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, qty } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const calculateGST = (total) => (total * 18) / 100;

  const handlePay = () => {
    const totalItems = cartItems.length;
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = calculateTotal() + calculateGST(calculateTotal());

    setOrderSummary({
      orderId,
      totalItems,
      totalQty,
      totalPrice,
      dateTime: new Date().toLocaleString("en-GB", {
        hour12: false,
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    });

    setOrderId(orderId + 1);
    localStorage.setItem("orderId", orderId + 1);
    setShowModal(true);
    setCartItems([]);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <CatalogComponent
            cartItems={cartItems}
            addToCart={addToCart}
            updateQty={updateQty}
          />
        </Col>
        <Col md={6}>
          <CartComponent
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            calculateTotal={calculateTotal}
            calculateGST={calculateGST}
            handlePay={handlePay}
          />
        </Col>
      </Row>
      {orderSummary && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank You for Your Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Order ID: {orderSummary.orderId}</p>
            <p>Total Items: {orderSummary.totalItems}</p>
            <p>Total Quantity: {orderSummary.totalQty}</p>
            <p>Grand Total: Rs {orderSummary.totalPrice}</p>
            <p>Date & Time: {orderSummary.dateTime}</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShowModal(false)} className="btn btn-primary">
              OK
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default Catalog;
