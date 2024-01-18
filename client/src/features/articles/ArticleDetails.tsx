import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import  DeletionModal from '../../components/DeletionModal';

let cached: any = null;

function ArticleDetails() {
    const [article, setArticle] = useState<any>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentArticle = async () => {
            try {
                if(cached != null)
                    setArticle(cached);
                else{
                    const response = await fetch(`${API_URL}/${id}`);
                    if(response.ok) {
                        const json = await response.json();
                        setArticle(json)
                        cached = article;
                    } else {
                        throw response;
                    }
                }

            } catch(e) {
                console.log("An error occurred: ", e);
            } 
        };
        fetchCurrentArticle();
    }, [id]);

    if(!article) return <h2>Loading...</h2>

    return <div>
        <h1>{article?.title}</h1>

        <p>{article?.body}</p>

        <h2>Notes</h2>
        <p>{article?.notes}</p>

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