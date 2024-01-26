import { useNavigate } from "react-router-dom";
import { createArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";
import ArticleForm from "./ArticleForm";
import { objectToFormData } from "../../shared/utils/formDataHelper";

function NewArticleForm() {
    const navigate = useNavigate();

    const handleCreateSubmit =async (rawData:Article) => {
        try {
            const formData = objectToFormData({article: rawData})
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
