// API_URL comes from env
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import  DeletionModal from '../../components/DeletionModal';

let cached:any[] = [];

function ArticlesList(){
    const [articles, setArticles] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [,setError] = useState('');
    //fetch articles
    const loadArticles = async() => {
        try {
            if (cached.length > 0)
                setArticles(cached);
            else
            {
                const response = await fetch(API_URL);
                if(response.ok) {
                    const json = await response.json();
                    setArticles(json)
                    cached = articles;
                } else {
                    throw response;
                }
            }
        } catch(e) {
            setError("An error occurred.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() =>{
       
        loadArticles();
    })

    return <div>
        {articles.map((article:any) => (
            <div key={article.id} className='article-container'>
                <h2>
                    <Link to={`/article/${article.id}`} className='article-title'>
                        {article.title}
                    </Link>
                </h2>
                <p>{article.created_at}</p>
                <div className='post-links'>
                    <Link to={`/article/${article.id}/edit`}>Edit</Link>
                    {" | "}
                    <DeletionModal article={article} callback={()=>{cached=[]}}/>
                </div>
            </div>
        ))}
    </div>
}

export default ArticlesList;