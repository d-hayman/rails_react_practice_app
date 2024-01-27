// API_URL comes from env
import { useState, useEffect } from 'react';
import { fetchAllArticles } from '../../shared/services/articles.service';
import { Link } from 'react-router-dom';
import  DeletionModal from '../../components/DeletionModal';
import styles from '../../assets/styles/ArticleList.module.css';
import noImage from '../../assets/img/imagenotfound.png';

function ArticlesList(){
    const [articles, setArticles] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [,setError] = useState<any>(null);
    //fetch articles
    const loadArticles = async() => {
        try {
            {
                const data = await fetchAllArticles();
                setArticles(data);
                setLoading(false);
            }
        } catch(e) {
            setError(e);
            setLoading(false);
            console.error("Failed to fetch articles: ", e);
        }
    }
    useEffect(() =>{
       
        loadArticles();
    }, [])

    return <div>
        {articles.map((article:any) => (
            <div key={article.id} className='article-container'>
                <Link to={`/article/${article.id}`} className='article-title'>
                    <h2>
                        {article.title}
                    </h2>
                    <img src={article.image_url ?? noImage} alt={article.title} className={styles.article_image} />
                </Link>
                <p>{article.created_at}</p>
                <div className='post-links'>
                    <Link to={`/article/${article.id}/edit`}>Edit</Link>
                    {" | "}
                    <DeletionModal article={article} callback={()=>{setArticles(articles.filter((_article) => _article.id !== article.id));}}/>
                </div>
            </div>
        ))}
    </div>
}

export default ArticlesList;