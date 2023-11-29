import React, { useState } from "react";

const Home = () => {

    const [inputs,setInputs]=useState({
        name:'',
        email:'',
    });

const [tableData,setTableData]=useState([]);

const [editClick,setEditClick]=useState(false);

const [editIndex,setEditIndex]=useState('');


const handleChange=(event)=>
    {
        setInputs({
                ...inputs,
                [event.target.name]:event.target.value,
            
            });
    };
    
    const handleSubmit=(e)=>
    {
        e.preventDefault(); 
        // console.log('inputs',inputs);
       if(editClick)
       {
        const tempTableData=tableData;
        Object.assign(tempTableData[editIndex],inputs)
         setTableData([...tempTableData])   
         setEditClick(false)
         setInputs({
            name:'',
            email:'',
        })
    }
       else
       {
        setTableData([...tableData,inputs]);
        setInputs({
            name:'',
            email:'',
        })
       }
    }

    // console.log(tableData)

const handleDelete=(index)=>{
    const newTableData=tableData.filter((item,i)=>i !== index);
    setTableData(newTableData);
};

const handleEdit=(index)=>
{
         
    const tempdata=tableData[index];
    setInputs({
        name:tempdata.name,
        email:tempdata.email,
    })

    setEditClick(!editClick);
    setEditIndex(index);
};

const isFormValid = () => 
{
    // Check if any input value is empty
    for (const key in inputs) 
    {
      if (inputs[key].trim() === '') 
        return false;
    }
    return true;
  };

     return (
    <div className="  min-h-screen bg-[#DBFF76]">

      <h1 className=" font-serif text-center text-black-1000 text-3xl font-bold pt-4 mb-2">Crud Application </h1>
      <div className="w-full max-w-xl mx-auto bg-yellow-200  m-auto py-4 px-6 rounded-xl ">

        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">

          <div className='text-center  shadow-lg rounded-lg '> 
            <label htmlFor="name" className='font-serif text-gray-900 text-xl font-bold mb-1' >Name </label>
            <br />
            <input name='name' value={inputs.name} onChange={handleChange} type="text" 
            className='w-full max-w-md p-2 border border-blue-900 focus:outline-none focus:border-red-900 hover:bg-yellow-300 mb-2 
            rounded-full px-2 py-1' id="name" placeholder="Enter your Full Name..." />
          </div>

          <div className='text-center shadow-lg rounded-lg'>
            <label htmlFor="email" className='font-serif text-gray-900 text-xl font-bold mb-1'>Email </label>
            <br />
            <input  name='email' value={inputs.email} onChange={handleChange} type="text" className='w-full max-w-md p-2 border border-blue-900 focus:outline-none 
             focus:border-red-900 hover:bg-yellow-300 mb-2 rounded-full px-2 py-1'  id="email"
                 placeholder="Enter your Email..."/>
          </div>

          <button disabled={!isFormValid()}  className='font-serif block mx-auto bg-blue-600 hover:bg-green-700 text-white font-bold my-2 py-1 px-4 shadow-md rounded-full'>
           {editClick? "Update" : "Merge"}
            </button>
        
        </form>
      </div>

      <div>
         <table className="w-full text-center">
            <thead className='font-serif underline font-bold'>
                <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className='text-black'> 
                {tableData.map((item,i)=>
                    (
                        <tr>
                            <td>{i}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <button onClick={()=>handleEdit(i)}   className='mr-3 text-yellow-900'>Edit</button>
                                <button onClick={()=>handleDelete(i)} className='mr-3 text-green-900'>Delete</button>
                                 </td>
                            </tr>
                )) }
                        
               
            </tbody>
         </table>

      </div>
    </div>
  );
};

export default Home;
