import './App.css'
import  ArticlesList  from "./features/articles/ArticlesList";

function App() {

  return (
    <>
      <div className='app'>
        <h1>The Devlog Devlog</h1>
        <p>Wherein we log the development of a means by which to log development</p>
        <ArticlesList />
      </div>
    </>
  )
}

export default App
