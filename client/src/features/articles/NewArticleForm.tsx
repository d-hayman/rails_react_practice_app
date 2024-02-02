import { useNavigate } from "react-router-dom";
import { createArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";
import ArticleForm from "./ArticleForm";
import { objectToFormData } from "../../shared/utils/formDataHelper";
import ErrorModal from "../../shared/components/ErrorModal";
import { useState } from "react";

function NewArticleForm() {
    const [errorHeaderText, setErrorHeaderText] = useState('');
    const [errorBodyText, setErrorBodyText] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const navigate = useNavigate();

    const handleCreateSubmit =async (rawData:Article) => {
        try {
            const formData = objectToFormData({article: rawData})
            const response = await createArticle(formData);
            navigate(`/article/${response.id}`);
        } catch(e){
            setErrorHeaderText("Failed to Create Article");
            setErrorBodyText(`${e}`);
            setErrorVisible(true);
            console.error("Failed to create article: ",e);
        }  
    };

    return (
        <>
        <ArticleForm
            headerText="Create a New Article"
            buttonText="Create Article"
            onSubmit={handleCreateSubmit}
         />

         <ErrorModal 
            bodyText={errorBodyText}
            headerText={errorHeaderText}
            visible={errorVisible}
            setVisible={setErrorVisible}
         />
        </>
    );
}

export default NewArticleForm;
