import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, InputGroup, FormControl } from "react-bootstrap";

const CatalogComponent = ({ cartItems, addToCart, updateQty }) => {
  const [catalog, setCatalog] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Fetch catalog data
    fetch("https://api.npoint.io/0000de8d1cab7a126cb9")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          // Add unique IDs to catalog items
          const catalogWithIds = data.data.map((item, index) => ({
            ...item,
            id: index + 1, // Generate unique IDs for items
          }));
          setCatalog(catalogWithIds);
        } else {
          console.error("Unexpected API response format:", data);
        }
      })
      .catch((err) => console.error("Failed to fetch catalog", err));
  }, []);

  const handleShowMore = () => setCurrentPage(currentPage + 1);

  const itemsToDisplay = catalog.slice(0, (currentPage + 1) * 3);

  return (
    <div>
      <h4>Catalog</h4>
      <Row>
        {itemsToDisplay.map((item) => {
           const inCart = cartItems.find((cartItem) => cartItem.id === item.id);
          return (
            <Col key={item.id} sm={12} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Unit Price: Rs {item.price}</Card.Text>
                  <InputGroup>
                    <FormControl
                      type="number"
                      min={1}
                      max={100}
                      value={inCart ? inCart.qty : ""}
                      onChange={(e) => updateQty(item.id, Math.max(1, Math.min(100, parseInt(e.target.value) || 0)))}
                      placeholder="Enter Qty"
                    />
                    <Button
                        variant={inCart ? "success" : "primary"}
                        disabled={!!inCart}
                        onClick={() => addToCart(item)}
                        >
                        {inCart ? "Added" : "Add to Cart"}
                    </Button>

                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {itemsToDisplay.length < catalog.length && (
        <Button variant="link" onClick={handleShowMore}>
          Show More
        </Button>
      )}
    </div>
  );
};

export default CatalogComponent;
