import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";

function ArticleForm({ article=null, headerText, buttonText, onSubmit }
    :{article?:Article|null, headerText:string, buttonText:string, onSubmit:any}) {
    const [formData, setFormData] = useState<Article>(
        article || {
            title: "",
            body: "",
            notes: "",
            links: "",
            status: "public"
        }
    );
    const navigate = useNavigate();

    const handleSubmit =async (e:any) => {
        e.preventDefault();

        if(typeof onSubmit === "function") {
            onSubmit(formData);
        }
    }

    return (
        <div>
            <h1>{headerText}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titleInput">Title:</label>
                    <input 
                        id="titleInput" 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({
                            ...formData,
                            title: e.target.value})
                        } 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="bodyInput">Body:</label>
                    <textarea 
                        id="bodyInput" 
                        value={formData.body} 
                        onChange={(e) => setFormData({
                            ...formData,
                            body: e.target.value})
                        } 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="notesInput">Notes:</label>
                    <textarea 
                        id="notesInput" 
                        value={formData.notes} 
                        onChange={(e) => setFormData({
                            ...formData,
                            notes: e.target.value})
                        } 
                    />
                </div>
                <div>
                    <label htmlFor="linksInput">Links:</label>
                    <input 
                        id="linksInput" 
                        type="text" 
                        value={formData.links} 
                        onChange={(e) => setFormData({
                            ...formData,
                            links: e.target.value})
                        }  
                    />
                </div>
                <div>
                    <button type="submit">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}

export default ArticleForm;