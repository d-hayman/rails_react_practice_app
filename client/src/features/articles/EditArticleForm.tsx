import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";

let cached: any = null;

function EditArticleForm() {
    const [article, setArticle] = useState<any>(null);
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
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentArticle();
    }, [id]);

    const handleSubmit =async (e:any) => {
        e.preventDefault();
        
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Q7XH3tcrzJNnRObZVEY3tg"
            },
            body: JSON.stringify(article),
        });

        if (response.ok) {
            const { id } = await response.json();
            navigate(`/article/${id}`);
        } else {
            console.log("An error occurred");
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