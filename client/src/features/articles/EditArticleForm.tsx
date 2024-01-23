import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle, updateArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";

let cached: any = null;

function EditArticleForm() {
    const [article, setArticle] = useState<Article|null>(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [,setError] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentArticle = async () => {
            try {
                if(cached != null) {
                    // do nothing;
                } else {
                   const json = await fetchArticle(id);
                    setArticle(Article.buildArticleData(json));
                    cached = article; 
                }

            } catch(e) {
                console.error("Failed to fetch the article: ", e);
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentArticle();
    }, [id]);

    const handleSubmit =async (e:any) => {
        e.preventDefault();
        
        try {
            const response = await updateArticle(id, article);
            navigate(`/article/${response.id}`);
        } catch (e) {
            console.error("Failed to update the article: ", e);
        }
    }

    if(!article) return <h2>Loading...</h2>

    return (
        <div>
            <h1>Edit Article Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titleInput">Title:</label>
                    <br/>
                    <input 
                        id="titleInput" 
                        type="text" 
                        value={article.title} 
                        onChange={(e) => setArticle({...article, title:e.target.value})} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="bodyInput">Body:</label>
                    <br/>
                    <textarea 
                        id="bodyInput" 
                        value={article.body} 
                        onChange={(e) => setArticle({...article, body:e.target.value})} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="notesInput">Notes:</label>
                    <br/>
                    <textarea 
                        id="notesInput" 
                        value={article.notes} 
                        onChange={(e) => setArticle({...article, notes:e.target.value})} 
                    />
                </div>
                <div>
                    <label htmlFor="linksInput">Links:</label>
                    <br/>
                    <input 
                        id="linksInput" 
                        type="text" 
                        value={article.links} 
                        onChange={(e) => setArticle({...article, links:e.target.value})}  
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditArticleForm;