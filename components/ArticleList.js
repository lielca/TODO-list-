import React , { useState } from 'react'
import APIService from './APIService'



function ArticleList(props) {

    const editArticle = (article) => {
        props.editArticle(article)
    }

    const deleteArticle = (article) => {
        APIService.deleteArticle(article.id)
        .then(()=> props.deleteArticle(article))
    }


    const handleCheckboxChange = (event, article) => {
        const isChecked = event.target.checked;

        if (isChecked) {
          // Remove the article from its current position in the array and add it to the end
          const updatedArticles = props.articles.filter(a => a.id !== article.id);
          updatedArticles.push(article);
          // Update the state with the new array of articles
          props.setA(updatedArticles);
        }
      };




  return (
    <div style={{ marginTop: '20px' }}>
        <div class="grid-container2">
        
        <div class="grid-item2" style={{ textAlign: 'left' }}>Summary</div>
        <div class="grid-item2" >Priority</div>
        <div class="grid-item2">Due date</div>
        
    </div>
    
    
      {props.articles && props.articles.map((article,index)  => {
          return(
            
            <div key= {article.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
             <input type="checkbox" onChange={(event) => handleCheckboxChange(event, article)} />

            <h2 style={{ marginLeft: '10px'}}>{article.title}</h2>
        
            </div>
            <div class="grid-container2">
            <p class="grid-item3" style={{ marginLeft: '25px' }}>{article.body}</p> 

            <div class="grid-item3" style={{ textAlign: 'center' }}>
            <select class="my-select">
            <option selected>Open this select menu</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            </select>
            </div>

            <p class="grid-item3" style={{ textAlign: 'center' }}>{article.date}</p>

            </div>
             
              <div className= "row">
                <div className= "col-md-1">
                    <button type="button" className="btn btn-primary" 
                    onClick={()=>editArticle(article)}>
                        Update</button>                
                </div>
                <div className= "col-md-2">
                    <button type="button" className="btn btn-danger"
                    onClick={()=>deleteArticle(article)}
                    >Delete</button>
                </div>
                    
              </div>
              <hr/>                
            </div>
          )
        })}
    </div>
  )
}

export default ArticleList
