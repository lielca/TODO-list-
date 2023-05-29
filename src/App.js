import './App.css';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // set the appElement to the root element

function App() {

  const [articles, setArticles]= useState([])
  const [editedArticle, setEditedArticle]= useState(null)
  const [inputValue, setInputValue] = useState('');
  const [foundArticles, setFoundArticles] = useState([]);

  const setA = (articles) => {
    setArticles(articles)
  }

  useEffect(()=>{
    fetch('http://127.0.0.1:5000/get',{
      'method':'GET',
      headers:{
        'Content-Type': 'applications/json'
      }
    })
    .then(resp=>resp.json())
    .then(resp=>setArticles(resp))
    .catch(error=>console.log(error))

  },[])

  const editArticle = (article) => {
    setEditedArticle(article)
  }

  // maps through the articles array and replaces the updated one with the old one
  const updatedData = (article) => {
    const new_article = articles.map(my_article =>{
      if (my_article.id===article.id){
        return article
      }
      else{
        return my_article
      }
    })
    setArticles(new_article)
    setEditedArticle(null)
  }

  const openForm = () => {
    setEditedArticle({title:'', body:'', date: new Date()})
  }

  const insertArticle = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
    setEditedArticle(null)

  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(myarticle=>{
      if(myarticle.id===article.id){
        return false;
      }
      return true;
    })
    setArticles(new_articles)
  }
  
  const handleSearch = () => {
    const matchingArticles = articles.filter((myarticle) => myarticle.date <= inputValue);
    if (matchingArticles.length > 0) {
      setFoundArticles(matchingArticles);
    } else {
      setFoundArticles([]);
      alert('No tasks found');
    }
  };
  
  

  return (
    
    <div className="App">
        <div class="grid-container">
          <div class="grid-item" style={{ textAlign: 'left' }} > <h1>My TODO List</h1> </div>
          <div  class="grid-item"> <button className='btn btn-success' style={{ marginTop: '10px' }} onClick={openForm}> Insert Task </button> </div>
          <div  class="grid-item">
            <p>Tasks before date:</p>
          <input type="Date" value={inputValue} onChange={(e) => setInputValue(e.target.value) } /> 
          <button onClick={handleSearch} className="btn btn-info" style={{marginLeft: '10px', marginBottom: '5px'}} >Search</button> 
          </div>
    </div>
      <ReactModal isOpen={foundArticles.length > 0} className="Modal">
        {foundArticles.map(article => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <p>{article.date}</p>
          </div>
        ))}
      
        <button onClick={() => setFoundArticles([])}>Close</button>
      </ReactModal>
        {/*sending the component the props */}
        <ArticleList articles={articles} editArticle= {editArticle} deleteArticle={deleteArticle} setA={setA}/> 
        {editedArticle? <Form article= {editedArticle} updatedData = {updatedData} insertArticle={insertArticle} /> : null}
        

    </div>
  );
}

export default App;
