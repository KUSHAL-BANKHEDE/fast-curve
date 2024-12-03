import React from "react";
import { Table, Button, Modal } from "react-bootstrap";

const CartComponent = ({
  cartItems,
  removeFromCart,
  calculateGST,
  calculateTotal,
  handlePay,
}) => {
  const total = calculateTotal();
  const gst = calculateGST(total);

  return (
    <div>
      <h4>Your Cart</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Item</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>Rs {item.price}</td>
              <td>{item.qty}</td>
              <td>Rs {item.price * item.qty}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <p>Total: Rs {total}</p>
        <p>GST (18%): Rs {gst}</p>
        <p>Grand Total: Rs {total + gst}</p>
        <Button onClick={handlePay} variant="success">
          Pay
        </Button>
      </div>
    </div>
  );
};

export default CartComponent;

