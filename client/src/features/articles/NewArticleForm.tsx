import { useNavigate } from "react-router-dom";
import { createArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";
import ArticleForm from "./ArticleForm";

function NewArticleForm() {
    const navigate = useNavigate();

    const handleCreateSubmit =async (rawData:Article) => {
        // convert to formData
        const formData = new FormData();
        formData.append("article[title]", rawData.title);
        formData.append("article[body]", rawData.body);
        formData.append("article[notes]", rawData.notes);
        formData.append("article[links]", rawData.links);
        formData.append("article[status]", rawData.status);
        if(rawData.image !== null && rawData.image !== undefined){
            formData.append("article[image]", rawData.image);
        }

        try {
            const response = await createArticle(formData);
            navigate(`/article/${response.id}`);
        } catch(e){
            console.error("Failed to create post: ",e);
        }  
    };

    return (
        <>
        <ArticleForm
            headerText="Create a New Article"
            buttonText="Create Article"
            onSubmit={handleCreateSubmit}
         />
        </>
    );
}

export default NewArticleForm;
