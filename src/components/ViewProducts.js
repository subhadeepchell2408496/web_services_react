import React, { useState } from "react";
import productService from "../services/ProductService";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();


  const view = () => {
    productService
      .getProducts()
      .then((result) => {
        setProducts(result.data);
        setDataLoaded(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    view();
  }, []);

  const deleteProduct = (id) => {
    productService
      .deleteProductById(id)
      .then((result) => {
        alert("Product deleted Successfully!");
        view();
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Product couldn't be deleted!");
      });
  };

  const dataSet = products.map((element) => {
    return (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.name}</td>
        <td>{element.price}</td>
        <td>{element.category}</td>
        <td>
          <button
            onClick={() => {
              deleteProduct(element.id);
            }}
          >
            Delete Product
          </button>
          <button onClick={() => editProduct(element.id)}>Edit</button>
        </td>
      </tr>
    );
  });

  const editProduct = (id) => {
    navigate(`/add?id=${id}`);
  };

  return (
    <div>
      <h1>View the products</h1>
      {!dataLoaded && (
        <>
          <h1>Please wait while loading...</h1>
          <Link to="/add">Add New Product</Link>
        </>
      )}
      {dataLoaded && (
        <>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>price</th>
                <th>category</th>
              </tr>
            </thead>
            <tbody>{dataSet}</tbody>
          </table>
          <Link to="/add">Add New Product</Link>
        </>
      )}
    </div>
  );
};

export default ViewProducts;
