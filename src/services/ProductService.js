import axios from "axios"

class ProductService{
    constructor(){
        this.url='http://localhost:3001/products'
    }

    getProducts(){
        return axios.get(`${this.url}`)
    }
    getProductById(id){
        return axios.get(`${this.url}/${id}`)
    }

    addProducts(product){
        return axios.post(this.url, product)
    }

    editProductById(id,product){
        return axios.put(`${this.url}/${id}`, product)
    }

    deleteProductById(id){
        return axios.delete(`${this.url}/${id}`)
    }

}

const productService = new ProductService()

export default productService