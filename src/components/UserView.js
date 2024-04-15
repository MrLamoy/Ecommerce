import React, { useState, useEffect } from 'react';

import ProductCard from './ProductCard';
import ProductSearch from "./ProductSearch";
import SearchByPrice from "./SearchByPrice";
import ActiveProducts from "./ActiveProducts";

export default function UserView({ productsData }) {

  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("allActive");

  useEffect(() => {
    console.log(productsData);

    const productsArr = productsData.map(product => {
      if (product.isActive === true) {
        return (
          <ProductCard productProp={product} key={product._id} />
        );
      } else {
        return null;
      }
    });

    setProducts(productsArr);
  }, [productsData]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
return (
    <>
      {<h1>User Products Catalog</h1>}
      <ProductSearch />
      <SearchByPrice />
      <ActiveProducts />
   </>
);
}