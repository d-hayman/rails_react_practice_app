import { useState, useEffect } from 'react';
import { fetchArticle } from '../../shared/services/articles.service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import  DeletionModal from '../../components/DeletionModal';
import styles from '../../assets/styles/ArticleDetails.module.css';
import noImage from '../../assets/img/imagenotfound.png';

function ArticleDetails() {
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

        <img src={article.image_url ?? noImage} alt={article.title} className={styles.article_image} />

        <p className='details-section'>{article?.body}</p>

        <h2>Notes</h2>
        <p className='details-section'>{article?.notes}</p>

        <h2>Links</h2>
        <ul>
            {article?.links.split(' ').map((link:any) => (
                <li>
                    <a href={`${link}`}>{link}</a>
                </li>
            ))}
        </ul>
        <Link to={`/article/${article.id}/edit`}>Edit</Link>
        {" | "}
        <Link to="/">Back to Articles</Link>
        {" | "}
        <DeletionModal article={article} callback={()=>{navigate("/")}}/>

    </div>;
}

export default ArticleDetails;