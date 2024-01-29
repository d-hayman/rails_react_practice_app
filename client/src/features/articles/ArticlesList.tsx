// API_URL comes from env
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  DeletionModal from '../../components/DeletionModal';
import SearchBar from '../../components/SearchBar';
import useURLSearchParam from '../../shared/hooks/useURLSearchParam';
import useArticlesData from '../../shared/hooks/useArticlesData';
import styles from '../../assets/styles/ArticleList.module.css';
import noImage from '../../assets/img/imagenotfound.png';

function ArticlesList(){
    const [articles, setArticles] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = 
        useURLSearchParam("search");
    
    const {
        articles: fetchedArticles,
        loading,
        error
    } = useArticlesData(debouncedSearchTerm);
        
    useEffect(() =>{
        if (fetchedArticles) {
            setArticles(fetchedArticles);
        }
    }, [fetchedArticles]);

    const handleImmediateSearchChange = (searchValue: string) => {
        setSearchTerm(searchValue)
    }

    const handleDebouncedSearchChange = (searchValue: string) => {
        setDebouncedSearchTerm(searchValue);
    }

    return <div>
        <SearchBar 
            value={searchTerm}
            onSearchChange={handleDebouncedSearchChange}
            onImmediateChange={handleImmediateSearchChange}
        />
        {loading && <p>Loading... </p>}
        {error && <p>Error loading posts.</p>}
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