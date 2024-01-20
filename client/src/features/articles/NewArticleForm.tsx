import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";

function NewArticleForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [notes, setNotes] = useState("");
    const [links, setLinks] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleSubmit =async (e:any) => {
        e.preventDefault();

        const articleData: Article = {
            title: title,
            body: body,
            notes: notes,
            links: links,
            status: "public"
        };
        
        try {
            const response = await createArticle(articleData);
            navigate(`/article/${response.id}`);
        } catch(e){
            console.error("Failed to create post: ",e);
        }
            
    }

    return (
        <div>
            <h1>New Article Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titleInput">Title:</label>
                    <input 
                        id="titleInput" 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="bodyInput">Body:</label>
                    <textarea 
                        id="bodyInput" 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="notesInput">Notes:</label>
                    <textarea 
                        id="notesInput" 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="linksInput">Links:</label>
                    <input 
                        id="linksInput" 
                        type="text" 
                        value={links} 
                        onChange={(e) => setLinks(e.target.value)}  
                    />
                </div>
                <div>
                    <button type="submit">Create Article</button>
                </div>
            </form>
        </div>
    )
}

export default NewArticleForm;