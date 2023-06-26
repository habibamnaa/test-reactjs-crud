import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import ModalAdd from './ModalAdd';
import ConfirmationModal from './ModalDelete'
import ModalDelete from './ModalDelete';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isshowModal,setModals] = useState(false);
    const [selectedProductId,setSelectedProductId]= useState(null)
    const [isShowModalDeleteConfirmation,setIsShowModalDeleteConfirmation] = useState(false)

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async() => {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
    }

    async function onDeleteProduct() {
        setIsShowModalDeleteConfirmation(false)
        try {
            await axios.delete(`http://localhost:5000/products/${selectedProductId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }
    function openDeleteConfirmation(productId){
      setIsShowModalDeleteConfirmation(true)
      setSelectedProductId(productId)
    }

    function callBackAfterAddProductSuccess(){
      getProducts();
    }
  return (
    <div className="container mt-5">
        <button  onClick={()=> setModals(true)} className='button is-success mb-2'>Add New</button>
        {isshowModal && <ModalAdd isOpen={isshowModal} onClose={()=> setModals(false)} callBackAfterAddProductSuccess={callBackAfterAddProductSuccess} />}
        {isShowModalDeleteConfirmation && <ModalDelete isOpen={isShowModalDeleteConfirmation } onDeleteProduct={onDeleteProduct} onClose={()=> setIsShowModalDeleteConfirmation(false)}/>}
        <div className="columns is-multiline">
            {products.map((product)=>(
                <div className="column is-one-quarter" key={product.id}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img 
                      src={product.url}
                      alt="Image" />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{product.name}</p>
                        <p className="title is-6">Stock {product.stock}</p>
                        <p className="title is-6">Harga Jual: Rp. {product.sell_price}</p>
                        <p className="title is-6">Harga Beli: Rp. {product.buy_price}</p>
                      </div>
                    </div>
                  </div>
                  <footer className='card-footer'>
                    <Link to={`edit/${product.id}`} className="card-footer-item">Edit</Link>
                    <button onClick={()=> openDeleteConfirmation(product.id)} className="card-footer-item">Delete</button>
                  </footer>
                </div>
                
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default ProductList