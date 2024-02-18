// API_URL comes from env
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import  DeletionModal from '../../shared/components/DeletionModal';
import SearchBar from '../../components/SearchBar';
import useURLSearchParam from '../../shared/hooks/useURLSearchParam';
import useArticlesData from '../../shared/hooks/useArticlesData';
import styles from '../../assets/styles/ArticleList.module.css';
import noImage from '../../assets/img/imagenotfound.png';
import Paginator from '../../shared/components/Pagination';
import { Col, Container, Row } from 'react-bootstrap';
import { deleteArticle } from '../../shared/services/articles.service';

function ArticlesList(){
    const hasArticleDestroy = (localStorage.getItem("permissions")??'').includes("Article:destroy");
    const hasArticleUpdate = (localStorage.getItem("permissions")??'').includes("Article:update");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = 
        useURLSearchParam("search");

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
        <h1>The Devlog Devlog</h1>
        <p>Wherein we log the development of a means by which to log development</p>
        <Row>
            <Col md={4}>
                <SearchBar 
                    value={searchTerm}
                    onSearchChange={handleDebouncedSearchChange}
                    onImmediateChange={handleImmediateSearchChange}
                />
            </Col>
            <Col md={8}>
                <Paginator
                    currentPage={currentPage}
                    totalItems={totalArticles}
                    itemsPerPage={perPage}
                    onPageChange={handlePageChange}
                />
            </Col>
        </Row>
        {loading && <p>Loading... </p>}
        {error && <p>Error loading posts.</p>}
        {articles.map((article:any) => (
            <div key={article.id} className={styles.article_container}>
                <Link to={`/article/${article.id}`} className={styles.article_title}>
                    <h2>
                        {article.title}
                    </h2>
                    <img src={article.image_url ?? noImage} alt={article.title} className={styles.article_image} />
                </Link>
                <Container><Row><Col>
                    <p className={styles.post_timestamp}>{article.created_at}</p>
                    <div className={styles.post_links}>
                        { hasArticleUpdate &&
                            <Link to={`/article/${article.id}/edit`}>Edit</Link>
                        }
                        { hasArticleUpdate && hasArticleDestroy &&
                            " | "
                        }
                        { hasArticleDestroy &&
                            <DeletionModal title={article.title} id={article.id} deletion={deleteArticle} callback={()=>{setArticles(articles.filter((_article) => _article.id !== article.id));}}/>
                        }
                    </div>
                </Col></Row></Container>
            </div>
        ))}
        <Paginator 
            currentPage={currentPage}
            totalItems={totalArticles}
            itemsPerPage={perPage}
            onPageChange={handlePageChange}
        />
    </div>
}

export default ArticlesList;