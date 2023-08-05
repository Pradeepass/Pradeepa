import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { useEffect, useState } from 'react';
import axios from "axios"
import Formtable from './components/Formtable';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    product_id: "",
    product_name : "",
    quantity: "",
    price : "",
  })
  const [formDataEdit,setFormDataEdit] = useState({
    product_id: "",
    product_name : "",
    quantity: "",
    price : "",
    _id : ""
  })
  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }


  const handleSubmit = async(e)=>{
      e.preventDefault()
      const data = await axios.post("/create",formData)
      console.log(data)
      if(data.data.success){
          setAddSection(false)
          alert(data.data.message)
          getFetchData()
          setFormData({
            product_id: "",
            product_name : "",
            quantity: "",
            price : ""
          })

      }
  }
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
        setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    
      if(data.data.success){
        getFetchData()
        alert(data.data.message)
      }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }
  const handleEditOnChange = async(e)=>{
    const {value,name} = e.target
    setFormDataEdit((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })
  }
  const handleEdit = (el)=>{
    setFormDataEdit(el)
    setEditSection(true)
  }
  return (
   <>
      
      <div class="logo">
      <img src="https://www.techhive.co.in/img/logo.png"></img>
      </div>
      <div class="header">
          
          
          <h4> Product Details</h4>

        </div>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

      {
        addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose = {()=>setAddSection(false)}
            rest={formData}
          />
        )
      }
      {
        editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose = {()=>setEditSection(false)}
            rest={formDataEdit}
          />
        )
      }


      <div className='tableContainer'>
        <title>PRODUCT DETAILS</title>
        <table>
          <thead>
            <tr>
              <th>Product_id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>
              
              </th>
            </tr>
          </thead>
          <tbody>
            { dataList[0] ? (
              dataList.map((el)=>{
                console.log(el)
                return(
                  <tr>
                    <td>{el.product_id}</td>
                    <td>{el.product_name}</td>
                    <td>{el.quantity}</td>
                    <td>{el.price}</td>
                    <td>
                      <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                      <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                )
              }))
              : (
                <p style={{textAlign : "center"}}>No data</p>
              )
            }
            
            
          </tbody>
          
        </table>
      </div>
         <div class="foot">
              <footer>
                <p>Designed by S.S.Pradeepa - "Dhirajlal Gandhi College of Technology"</p>
                
              </footer>
         </div>



      </div>
   </>
  );
}
         
export default App;