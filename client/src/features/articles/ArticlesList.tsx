// API_URL comes from env
import React, { useState, useEffect } from 'react';
import { fetchAllArticles } from '../../shared/services/articles.service';
import { Link } from 'react-router-dom';
import  DeletionModal from '../../components/DeletionModal';

let cached:any[] = [];

function ArticlesList(){
    const [articles, setArticles] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [,setError] = useState<any>(null);
    //fetch articles
    const loadArticles = async() => {
        try {
            if (cached.length > 0)
                setArticles(cached);
            else
            {
                const data = await fetchAllArticles();
                setArticles(data);
                cached = articles;
                setLoading(false);
            }
        } catch(e) {
            setError(e);
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