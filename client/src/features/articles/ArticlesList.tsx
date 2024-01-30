// API_URL comes from env
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import  DeletionModal from '../../components/DeletionModal';
import SearchBar from '../../components/SearchBar';
import useURLSearchParam from '../../shared/hooks/useURLSearchParam';
import useArticlesData from '../../shared/hooks/useArticlesData';
import styles from '../../assets/styles/ArticleList.module.css';
import noImage from '../../assets/img/imagenotfound.png';
import Pagination from '../../components/Pagination';

function ArticlesList(){
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = 
        useURLSearchParam("search");
URLSearchParams
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPageFromURL = Number(searchParams.get("page") || 1);
    const [currentPage, setCurrentPage] = useState(initialPageFromURL);
    
    const [articles, setArticles] = useState<any[]>([]);
    const {
        articles: fetchedArticles,
        loading,
        error,
        totalArticles,
        perPage
    } = useArticlesData(debouncedSearchTerm, currentPage);
        
    useEffect(() =>{
        if (fetchedArticles) {
            setArticles(fetchedArticles);
        }
    }, [fetchedArticles]);

    useEffect(() => {
        const initialSearchTerm = searchParams.get("search") || "";
        setSearchTerm(initialSearchTerm);

        const pageFromURL = searchParams.get("page") || "1";
        setCurrentPage(Number(pageFromURL));
    }, [searchParams]);

    const handleImmediateSearchChange = (searchValue: string) => {
        setSearchTerm(searchValue)
    }

    const handleDebouncedSearchChange = (searchValue: string) => {
        setDebouncedSearchTerm(searchValue);
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        setSearchParams({search: debouncedSearchTerm, page: page} as unknown as URLSearchParams)
    }

    return <div>
        <SearchBar 
            value={searchTerm}
            onSearchChange={handleDebouncedSearchChange}
            onImmediateChange={handleImmediateSearchChange}
        />
        <Pagination 
            currentPage={currentPage}
            totalArticles={totalArticles}
            articlesPerPage={perPage}
            onPageChange={handlePageChange}
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