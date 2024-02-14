import { useState, useEffect } from 'react';
import { deleteArticle, fetchArticle } from '../../shared/services/articles.service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import  DeletionModal from '../../shared/components/DeletionModal';
import styles from '../../assets/styles/ArticleDetails.module.css';
import noImage from '../../assets/img/imagenotfound.png';

function ArticleDetails() {
    const hasArticleDestroy = (localStorage.getItem("permissions")??'').includes("Article:destroy");
    const hasArticleUpdate = (localStorage.getItem("permissions")??'').includes("Article:update");
    const [article, setArticle] = useState<any>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentArticle = async () => {
            try {
                const data = await fetchArticle(id);
                setArticle(data);
            } catch(e) {
                console.error("Failed to fetch article: ", e);
            } 
        };
        fetchCurrentArticle();
    }, [id]);

    if(!article) return <h2>Loading...</h2>

    return <div>
        <Link to={`/article/${article.previous?.id}`} className='article-previous'>
            {article.previous?.title}
        </Link>
        <Link to={`/article/${article.next?.id}`} className='article-next'>
            {article.next?.title}
        </Link>
        <br/>
        <h1>{article?.title}</h1>

        <Link to={article.image_url ?? noImage} target="_blank" rel="noopener noreferrer">
            <img src={article.image_url ?? noImage} alt={article.title} className={styles.article_image} />
        </Link>

        <p className={styles.details_section}>{article?.body}</p>

        <h2>Notes</h2>
        <p className={styles.details_section}>{article?.notes}</p>

        {article?.links && <>
            <h2 >Links</h2> 
            <ul>
                {article?.links.split(' ').map((link:any) => (
                    <li>
                        <a href={`${link}`}>{link}</a>
                    </li>
                ))}
            </ul> 
        </>}

        { hasArticleUpdate && 
            <>
            <Link to={`/article/${article.id}/edit`}>Edit</Link>
            {" | "}
            </>
        }

        <Link to="/">Back to Articles</Link>

        { hasArticleDestroy &&
            <>
            {" | "}
            <DeletionModal title={article.title} id={article.id} deletion={deleteArticle} callback={()=>{navigate("/")}}/>
            </>
        }

    </div>;
}

export default ArticleDetails;