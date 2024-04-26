import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/viewproducts`);
      setProducts(response.data.map(product => ({ ...product, isDescriptionVisible: false })));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleDescription = (index) => {
    setProducts(prevProducts => (
      prevProducts.map((product, i) => (
        i === index ? { ...product, isDescriptionVisible: !product.isDescriptionVisible } : { ...product, isDescriptionVisible: false }
      ))
    ));
  };

  return (
    <div style={styles.container}>
      <h1>Products</h1>
      <div style={styles.productContainer}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} style={{ ...styles.productCard }}>
              {/* <img src={product.image} alt="ImageHere" style={styles.productImage} /> */}
              <div style={styles.productDetails}>
                <h2>{product.name}</h2>
                <p><strong>Category:</strong> {product.category}</p>
                {/* <p><strong>Company:</strong> {product.company}</p> */}
                <p><strong>Price:₹</strong>{product.price}</p>
                <button onClick={() => toggleDescription(index)} style={styles.showDescriptionButton}>
                  {product.isDescriptionVisible ? 'Hide Description' : 'Show Description'}
                </button>
                {product.isDescriptionVisible && (
                  <div style={styles.description}>
                    <p><strong>Description:</strong> {product.description}</p>
                    <button onClick={() => toggleDescription(index)} style={styles.closeButton}>X</button>
                  </div>
                )}
                &nbsp;
                {(product.category.toLowerCase() === 'pets(newlyborn)')||(product.category.toLowerCase() === 'pets(preowned)') ? (
                  <a href="/customerlogin"><button style={styles.showDescriptionButton}>Login as Customer to Adopt!</button></a>
                ) : (
                  <a href="/customerlogin"><button style={styles.showDescriptionButton}>Login as Customer to Buy!</button></a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Data Not Found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '80%',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '50px',
  },
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productCard: {
    width: '200px', // Adjust the width of the card
    margin: '10px', // Adjust the margin of the card
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    backgroundColor: '#f1e2d2',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '150px', // Adjust the height of the image
    objectFit: 'cover',
  },
  productDetails: {
    padding: '10px', // Adjust the padding of the details
    textAlign: 'left',
  },
  showDescriptionButton: {
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px', // Adjust the padding of the button
    borderRadius: '5px',
    cursor: 'pointer',
  },
  description: {
    padding: '10px', // Adjust the padding of the description
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
  },
};
