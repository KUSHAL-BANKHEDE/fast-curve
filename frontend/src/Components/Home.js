import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>
        Welcome to the shopping app! Explore the <Link to="/catalog">Catalog</Link> for the best deals.
      </p>
    </div>
  );
};

export default Home;
