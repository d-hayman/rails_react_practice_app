import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle, updateArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";
import ArticleForm from "./ArticleForm";
import { objectToFormData } from "../../shared/utils/formDataHelper";
import ErrorModal from "../../shared/components/ErrorModal";

function EditArticleForm() {
    const [article, setArticle] = useState<Article|null>(null);
    const { id } = useParams();
    const [errorHeaderText, setErrorHeaderText] = useState('');
    const [errorBodyText, setErrorBodyText] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentArticle = async () => {
            try {
                const json = await fetchArticle(id);
                setArticle(Article.buildArticleData(json));
            } catch(e) {
                setErrorHeaderText("Failed to Fetch Article");
                setErrorBodyText(`${e}`);
                setErrorVisible(true);
                console.error("Failed to fetch the article: ", e);
            }
        };
        fetchCurrentArticle();
    }, [id]);

    const handleUpdateSubmit =async (rawData:Article) => {
        try {
            delete(rawData.id);
            const formData = objectToFormData({article: rawData})
            await updateArticle(id, formData);
            navigate(`/article/${id}`);
        } catch (e) {
            setErrorHeaderText("Failed to Update Article");
            setErrorBodyText(`${e}`);
            setErrorVisible(true);
            console.error("Failed to update the article: ", e);
        }
    }

    return (
        <>
        {
            article
                ? <ArticleForm
                    article={article}
                    headerText="Edit Article"
                    buttonText="Update Article"
                    onSubmit={handleUpdateSubmit}
                />
                : <h2>Loading...</h2>
         }

         <ErrorModal 
            bodyText={errorBodyText}
            headerText={errorHeaderText}
            visible={errorVisible}
            setVisible={setErrorVisible}
         />
        </>
    )
}

export default EditArticleForm;