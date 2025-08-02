import React, { useState } from 'react';



const TestCheckBox = () => {

  const listOptions = [ "apple", "banana", "cherry", "date", "elderberry", "fig", "honeydew melon"];

  const [selected, setSelected] = useState([]);

  const handleSelect = (value,name) => {
    if(value){
      setSelected([...selected, name]);
    }else{
      setSelected(selected.filter(item => item !== name));
    }
  }

  const selectAll = (value) => {
    if(value){
      setSelected(listOptions);
    }else{
      setSelected([]);
    }
  }

  


    return(
    <div className="flex w-full min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-md">
        <h1 className="font-semibold text-lg mb-2">Checkbox List</h1>
        <div className="-mx-5 px-5 py-0 rounded bg-gray-100 font-medium">
          <Checkbox name="all" value={selected.length === listOptions.length} updateValue={selectAll} />
        </div>
        { listOptions.map((item) => {
          return <Checkbox name={item} updateValue={handleSelect} value={selected.includes(item)}>{item}</Checkbox>
        }) }
      </div>
     </div>
    )
};

export default TestCheckBox;


function Checkbox({name,children ,value =false , updateValue = ()=>{} }){

  const handleChange = ()=>{
      console.log("name",name);
      console.log("value",value);
      updateValue(!value,name);
  }


  return(
    <div className="my-5">
      <input type="checkbox" id={`${name}-check`} name={name} onChange={handleChange} checked={value}/>
      <label for={`${name}-check`} className="ml-1 capitalize">{children}</label>
    </div>
  )
}