import React, { useState } from "react";
import { Navbar, Nav, Popover, OverlayTrigger, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const TopBar = ({ user }) => {
  const location = useLocation(); // To determine the active route
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverToggle = () => setShowPopover(!showPopover);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Info</Popover.Header>
      <Popover.Body>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <Button variant="link">Log Out</Button>
      </Popover.Body>
    </Popover>
  );

  const currentPage = location.pathname === "/catalog" ? "Catalog" : "Home";

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand as={Link} to="/">
        <img
          src="https://x.com/zomato/photo"
          alt="Logo"
          className="d-inline-block align-top"
          style={{ borderRadius: "50%" }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" active={currentPage === "Home"}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/catalog" active={currentPage === "Catalog"}>
            Catalog
          </Nav.Link>
        </Nav>
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-primary text-white text-center me-3"
            style={{
              width: "40px",
              height: "40px",
              lineHeight: "40px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onMouseEnter={handlePopoverToggle}
            onMouseLeave={handlePopoverToggle}
          >
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <OverlayTrigger
            show={showPopover}
            placement="bottom"
            overlay={popover}
          >
            <div />
          </OverlayTrigger>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
