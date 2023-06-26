import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [title,setTitle] = useState("");
  const [file,setFile] = useState("");
  const [preview,setPreview] = useState("");
  const [buy_price,set_buy_price] = useState("")
  const [sell_price,set_sell_price]= useState("")
  const [stock,set_stock]=useState("")
  const {id} = useParams();
  const navigate = useNavigate();

useEffect(()=>{
    getProductById();
},[]);

  const getProductById = async() =>{
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setTitle(response.data.name);
    setFile(response.data.image);
    setPreview(response.data.url);
    set_buy_price(response.data.buy_price);
    set_sell_price(response.data.sell_price);
    set_stock(response.data.stock);
  }

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  }

  const updateProduct = async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("stock", Number(stock));
    formData.append("buy_price", Number(buy_price));
    formData.append("sell_price", Number(sell_price));
    try {
        await axios.patch(`http://localhost:5000/products/${id}`, formData);
        navigate("/")
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
        <div className="column is-half">
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className="label">Product Name</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product Name"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Sell Price</label>
                    <div className="control">
                        <input 
                        type="number" 
                        className="input" 
                        value={sell_price} 
                        onChange={(e) => set_sell_price(e.target.value)}
                        placeholder="Sell Price"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Buy Price</label>
                    <div className="control">
                        <input 
                        type="number" 
                        className="input" 
                        value={buy_price} 
                        onChange={(e) => set_buy_price(e.target.value)}
                        placeholder="Buy Price"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Stock</label>
                    <div className="control">
                        <input 
                        type="number" 
                        className="input" 
                        value={stock} 
                        onChange={(e) => set_stock(e.target.value)}
                        placeholder="Stock"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <div className="file">
                            <label className="file-label">
                                <input 
                                type="file" 
                                className='file-input'
                                onChange={loadImage}
                                />
                                <span className='file-cta'>
                                    <span className="file-label">Choose a file</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {preview ? (
                    <figure className='image is-128x128'>
                        <img src={preview} alt='Preview Image' />
                    </figure>
                ): 
                ("")
                }

                <div className="field">
                    <div className="control">
                        <button type='submit' className="button is-success">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default EditProduct;