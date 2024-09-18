import React, { useContext, useState } from 'react'
import './Add.css'
import axios from "axios"
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'
import { StoreContext } from '../../../context/StoreContext'


const Add = ({url}) => {

    const { shopName } = useContext(StoreContext);

    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        shop: "",
        category: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("shop", shopName)
        formData.append("image", image)

        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                shop:shopName,
                category: ""
            })
            setImage(false);
            toast.success(response.data.message);

        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <>
        <AdminNavbar />
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : "../../upload_area.png"} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                {/* <div className="add-shop-name flex-col">
                    <p>Shop Name</p>
                    <input onChange={onChangeHandler} value={data.shop} type="text" name='shop' placeholder='Type here' />
                </div> */}
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Write context here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <input onChange={onChangeHandler} value={data.category} type="text" name='category' placeholder='Type here' />
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
        </>
    )
}

export default Add
