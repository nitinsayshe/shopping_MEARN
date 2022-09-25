import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./addProducts.css"
import { useDispatch, useSelector } from "react-redux"
import { addProduct } from '../../redux/features/productSlice';

import ChipInput from "material-ui-chip-input";

const initialState = {
    title: "",
    description: "",
    image: "",
    price: "",
    tags: []
}

function AddProducts() {
    const [productData, setProductData] = useState(initialState)
    const [tagErrMsg, setTagErrMsg] = useState(null);
    const { error, loading } = useSelector((state) => ({ ...state.product }))
    const {user}=useSelector((state)=>({...state.auth}))
    const { title, description, image, price, tags } = productData;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        error && alert(error)
    }, [error])
    
    const handelSubmit = (e) => {
        console.log(productData)
        e.preventDefault();
        
        if (!tags.length) {
            setTagErrMsg("Please provide some tags");
        }
        if (title && description && image && price && tags) {
            const updateProductData={...productData,name: user?.result?.name}
            dispatch(addProduct({ updateProductData, navigate }))
        }
    };
    const handleAddTag = (tag) => {
        setTagErrMsg(null);
        setProductData({ ...productData, tags: [...productData.tags, tag] });
    };
    const handleDeleteTag = (deleteTag) => {
        addProduct({
            ...productData,
            tags: productData.tags.filter((tag) => tag !== deleteTag),
        });
    };
    const onInputChange = (e) => {
        let { name, value } = e.target
        setProductData({ ...productData, [name]: value });
    };

    return (
        <div className="addProducts">
            <Link to="/">
                <img src="./amazonlogo.jpg" alt="" className="signup_logo" />
            </Link>

            <div className="addProducts_container">
                <h1>Add New Products</h1>
                <form>
                    <h5>Title</h5>
                    <input type="text"
                        name="title"
                        value={title}
                        onChange={onInputChange} />

                    <h5>Description</h5>
                    <input type="text"
                        name="description"
                        value={description}
                        onChange={onInputChange} />
                    <div className="col-md-12">
                        <ChipInput
                            name="tags"
                            variant="outlined"
                            placeholder="Enter Tag"
                            fullWidth
                            value={tags}
                            onAdd={(tag) => handleAddTag(tag)}
                            onDelete={(tag) => handleDeleteTag(tag)}
                        />
                        {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
                    </div>
                    {/* <div className="d-flex justify-content-start">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                                setProductData({ ...productData, image: base64 })
                            }
                        />
                    </div> */}
                    <h5>Product Image</h5>
                    <input type="text"
                        name="image"
                        value={image}
                        onChange={onInputChange} />

                    <h5>Price</h5>
                    <input type="text"
                        name="price"
                        value={price}
                        onChange={onInputChange} />

                    <button onClick={handelSubmit}
                        type="submit" className="addProducts_Button">
                        Add Product
                    </button>
                </form>


            </div>
        </div>
    )
}

export default AddProducts