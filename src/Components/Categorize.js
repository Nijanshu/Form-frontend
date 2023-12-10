import React, { useContext, useEffect, useState } from 'react';
import { RiDragMoveFill } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';
import { IoIosAddCircle } from 'react-icons/io';
import FormContext from './context/form/FormContext';

function Form(props) {
  const [question, setQuestion] = useState('Categorize the following');
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([{id:1, item:'', belongs:''}]);
  const [newCategory, setNewCategory] = useState('');
  const [visibility, setVisibility] = useState('invisible');
  const unique_id= props.unique_id

  let last=items.length-1

  let cat;
  let itm;
  let belong;

  let add = () => {
    itm = document.getElementById('itm');
    belong = document.getElementById('belong');
    if (itm.value.trim() !== '') {
    if (belong.value.trim() !== '') {
      
      setItems((prevItems) => [...prevItems, { id: prevItems.length + 1, item: '', belongs:'' }]);
    }
  else{
    alert('Please select category');
  }}
  else{
    alert('Please add item');
  }
    console.log(items)
  };

  useEffect(() => {
    document.addEventListener('click', function (event) {
      cat = document.getElementById('cat');
      itm = document.getElementById('itm');

      if (cat.value.trim() !== '') {
        if (event.target !== cat && !cat.contains(event.target)) {
          const trimmedCategory = cat.value.trim();
          setCategories((prevCategories) => [...prevCategories, trimmedCategory]);
          setNewCategory('');
        }
      }
    });
  }, [cat,items]);

  const handleSubmit = async (e) => {
    itm = document.getElementById('itm');
    belong= document.getElementById('belong');
    let ques= document.getElementById('question');
    console.log(ques.value)
    e.preventDefault();
    if (itm.value.trim() !== '') {
      if (belong.value.trim() !== '') {
        if(ques.value.trim() !== ''){
    try {
      const category = categories;
      const item= items;
      let uid= unique_id;
      const questions= question;
      const response = await fetch(`http://localhost:5000/api/categorize/addcateg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, item, questions, uid}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse);

      if (jsonResponse) {
        alert('Data submitted successfully');
      } else {
        alert('Invalid details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }}
    else{
        alert('Please Enter a question')
    }
  }
  
    else{
      alert('Please Select a category')
    }}
    else{
      alert('Please add item')
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleCategoryKeyDown = (e) => {
    if (e.target.value.trim() === '') {
      return;
    }
    if (e.key === 'Enter') {
      const trimmedCategory = e.target.value.trim();
      setCategories((prevCategories) => [...prevCategories, trimmedCategory]);
      setNewCategory('');
    }
  };

  const handleItemChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].item = e.target.value;
    setItems(updatedItems);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleSelectCategoryChange = (e, index) => {
    const updateditems = [...items];
    updateditems[index].belongs = e.target.value;
    setItems(updateditems);
   console.log(items) 
  };
  const handleCategoryChange = (e, index) => {
    const updatedCategories = [...items];
    updatedCategories[index] = e.target.value;
    setCategories(updatedCategories);
    if(e.target.value === '') {
      handleDeleteCategory(index)
    }
  };

  let check=()=>{
    console.log('Fine kaus')
  }

  // check = useContext(FormContext)
  return (
      <FormContext.Provider value={check}>
    <div className='px-2'>

      <div>
        <section>
          <h1 className='text-gray-500 text-4xl font-bold my-2'>Categorize</h1>
          <input
            id='question'
            type='text'
            placeholder='Categorize the following'
            value={question}
            onChange={handleQuestionChange}
            className='border-2 px-1 border-stone-800'
          />
        </section>

        <section>
          <h2 className='text-3xl mt-3 mb-1'>Categories</h2>
          {categories.map((category, index) => (
            <div key={index} className='w-fit mb-1' onMouseOver={() => setVisibility('visible')} onMouseLeave={() => setVisibility('invisible')}>
              <input
                type='text'
                value={category}
                className='border-2 border-stone-800'
                onChange={(e) => handleCategoryChange(e, index)}
              />
              <ImCross className={`inline md:${visibility} cursor-pointer`} onClick={() => handleDeleteCategory(index)} />
            </div>
          ))}
          <div className='w-fit' onMouseOver={() => setVisibility('visible')} onMouseLeave={() => setVisibility('invisible')}>
            <input
              type='text'
              id='cat'
              value={newCategory}
              className='border-2 border-stone-800'
              onKeyDown={handleCategoryKeyDown}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <IoIosAddCircle className='float-right text-2xl' />

          </div>
        </section>

        <section className='flex'>
          <section>
            <h2 className='text-3xl mt-3'>Items</h2>
            {items.map((item, index) => (
              <div key={index} className='p-1 w-fit mb-1' onMouseOver={() => setVisibility('visible')} onMouseLeave={() => setVisibility('invisible')}>
                <input
                  type='text'
                  id={`${index==last?'itm':''}`}
                  value={item.item}
                  className='border-2 w-10/12 border-stone-800'
                  onChange={(e) => handleItemChange(e, index)}
                />
                <ImCross className={`inline ${items.length===1?'invisible':'visible'} md:${visibility} cursor-pointer`} onClick={() => handleDeleteItem(index)} />
              </div>
            ))}
           
          </section>

          <section>
            <h2 className='text-2xl mt-3 bg-secondary'>Belongs To</h2>

            {items.map((item, index) => (
              <select 
              id={`${index==last?'belong':''}`}
               key={index} value={item.belongs} onChange={(e) => handleSelectCategoryChange(e, index)} className='points border-2 border-gray-500 px-4 p-1 mb-1 form-select' aria-label='Default select example'>
                <option value='' disabled>
                  Choose Category
                </option>
                {categories.map((category, catIndex) => (
                  <option key={catIndex} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ))}

            <IoIosAddCircle className='float-right text-2xl' onClick={add} />
          </section>
        </section>

        <button type='submit' onClick={handleSubmit} className='btn btn-secondary'>
          Submit
        </button>
      </div>
    </div>
    </FormContext.Provider>

  );
}

export default Form;













