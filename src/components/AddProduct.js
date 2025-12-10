import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import productService from "../services/ProductService";

const AddProduct = () => {
  const navigate =useNavigate()
    const [params]= useSearchParams()
    const id = params.get('id')
 
    const formik=useFormik({
        initialValues:{
            name:'',
            price:0.0,
            category:''
        },
        validate:values=>{
            const errors={}
            if( !values.name){
                errors.name='Name is required'
            }
            if( !values.category){
                errors.category='Category is required'
            }
            if( !values.price){
                errors.price='Price is required'
            }
            else if( values.price<=0){
                errors.price='Price can not be zero or negative'
            }
            return errors
        },
 
        onSubmit:values=>{
            let product={
                name:values.name,
                price:values.price,
                category:values.category
            }
            if(id){
            productService.editProductById(id,product)
            .then((result)=>{
                let response=result.data
                alert('Product is successfully edited with Id :'+ id)
                navigate('/view')
            })
            .catch((error)=>{console.log(error)})
            }
            else{
            productService.addProducts(product)
            .then((result)=>{
                let response=result.data
                alert('Product is successfully added with Id :'+ response.id)
                navigate('/view')
            })
            .catch((error)=>{console.log(error)})
           }
        }
    })
 
    useEffect(()=>{  
        if(id!=null){
            productService.getProductById(id)
            .then((result)=>{
                console.log(result.data)
                formik.setValues(result.data);
            })
            .catch((error)=>{console.log(error)})
        }
        else{
            formik.setValues({name:'',price:0.0,category:''})
        }
    },[id])
 
   
  return (
    <div>
      <h1>Add Products</h1>
      <form onSubmit={formik.handleSubmit}>
        <table>
          <thead>
            <tr colSpan="2">
              <th>Fill the details to add the product</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Name of product:</th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <span style={{ color: "red" }}>{formik.errors.name}</span>
                )}
              </td>
            </tr>
            <tr>
              <th>Price of product:</th>
              <td>
                <input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && (
                  <span style={{ color: "red" }}>{formik.errors.price}</span>
                )}
              </td>
            </tr>
            <tr>
              <th>Category of product:</th>
              <td>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <option value="">----------</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Garments">Garments</option>
                  <option value="Utensils">Utensils</option>
                </select>
                {formik.errors.category && (
                  <span style={{ color: "red" }}>{formik.errors.category}</span>
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit">Register Product</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddProduct;
