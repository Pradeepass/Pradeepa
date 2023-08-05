import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const Formtable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addContainer">
            <form onSubmit={handleSubmit}>
            <div className="close-btn" onClick={handleclose}><MdClose/></div>
              <label htmlFor="product_id">Product_id: </label>
              <input type="number" id="product_id" name="product_id" onChange={handleOnChange} value={rest.product_id}/>

              <label htmlFor="product_name">Product_Name: </label>
              <input type="text" id="product_name" name="product_name" onChange={handleOnChange} value={rest.product_name}/>

              <label htmlFor="quantity">Quantity : </label>
              <input type="number" id="quantity" name="quantity" onChange={handleOnChange} value={rest.quantity}/>
              <label htmlFor="price">Price: </label>
              <input type="number" id="price" name="price" onChange={handleOnChange} value={rest.price}/>

              <button className="btn">Submit</button>
            </form>
    </div>
  )
}

export default Formtable