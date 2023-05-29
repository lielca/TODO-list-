import React, { useState , useEffect } from 'react'
import APIService from './APIService';

function Form(props) {
    const [title, setTitle]= useState(props.article.title)
    const [body, setBody]= useState(props.article.body)
    const [date, setDate] = useState(props.article.date);

    useEffect(()=>{
        setTitle(props.article.title)
        setBody(props.article.body)
        setDate(props.article.date)
    }, [props.article]) //execute whenever the props.article value changes.



    const updateArticle = () => {
        
        APIService.UpdateArticle(props.article.id, {title,body,date})
        .then(resp => props.updatedData(resp))
        .catch(error=>console.log(error))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title,body,date})
        .then(resp=> props.insertArticle(resp))
        .catch(error => console.log(error))
    }

    return (
    <div>
      {props.article ? (

        <div className="mb-3">     
            <label htmlform= "title" name="title" className = "form-label"> Title</label>
            <input type="text" className='form-control' value = {title} 
            placeholder='Please Enter Title' onChange={(e) => setTitle(e.target.value)}/>
        
            <label htmlform= "body" name= "body" className = "form-label"> Description </label>
            <textarea rows= '5' className='form-control' value = {body} 
            placeholder='Please Enter Description' onChange={(e) => setBody(e.target.value)}/>

            <label htmlform="date" className="form-label"> Due Date</label>
            <input type="datetime-local" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>

            {
                props.article.id? <button 
                className='btn btn-success mt-3' onClick={updateArticle}>
                    Update</button>:
                <button 
                className='btn btn-success mt-3' onClick={insertArticle}>
                    Insert</button>

            }



        </div>
      
      ):null}  {/* if there is no article */}
      
    </div>
)}


export default Form
