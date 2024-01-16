// API_URL comes from env
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

function ArticlesList(){
    const [articles, setArticles] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [,setError] = useState('');
    //fetch articles
    useEffect(() =>{
        async function loadArticles() {
            try {
                const response = await fetch(API_URL);
                if(response.ok) {
                    const json = await response.json();
                    setArticles(json)
                }
            } catch(e) {
                setError("An error occurred.");
            } finally {
                setLoading(false);
            }
        }
        loadArticles();
    })

    return <div>
        {articles.map((article:any) => (
            <div key={article.id} className='article-container'>
                <h2>{article.title}</h2>
                <p>{article.created_at}</p>
            </div>
        ))}
    </div>
}

export default ArticlesList;