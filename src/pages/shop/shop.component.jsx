import React, { useState, useEffect } from "react";
import SHOP_DATA from "./shop.data.js";

import CollectionPreview from "../../components/collection-preview/collection-preview-component";

const ShopPage = () => {
  const [collections, setColletcions] = useState([]);

  useEffect(() => {
    setColletcions(SHOP_DATA);
  }, []);

  return (
    <div className="shop-page">
      {collections.map((collection) => (
        <CollectionPreview key={collection.id} {...collection} />
      ))}
    </div>
  );
};

export default ShopPage;
