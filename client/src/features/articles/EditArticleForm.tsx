import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle, updateArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";
import ArticleForm from "./components/ArticleForm";
import { objectToFormData } from "../../shared/utils/formDataHelper";
import ErrorModal from "../../shared/components/ErrorModal";
import { Alert } from "react-bootstrap";
import { listifyErrors } from "../../shared/utils/responseHelpers";

function EditArticleForm() {
    const [article, setArticle] = useState<Article|null>(null);
    const { id } = useParams();
    const [errorHeaderText, setErrorHeaderText] = useState('');
    const [errorBodyText, setErrorBodyText] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorAlertBody, setErrorAlertBody] = useState<any>({});
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
            const response = await updateArticle(id, formData);
            if(response === undefined) {
                setErrorAlertBody({error: "Malformed Data?"});
                setShowErrorAlert(true);
            } else {
                const json = await response.json();
                if(response.ok) {
                    navigate(`/article/${id}`);
                } else {
                    setErrorAlertBody(json);
                    setShowErrorAlert(true);
                }
            }
        } catch (e) {
            setErrorHeaderText("Failed to Update Article");
            setErrorBodyText(`${e}`);
            setErrorVisible(true);
            console.error("Failed to update the article: ", e);
        }
    }

    return (
        <>
        { showErrorAlert &&
        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <ul>{listifyErrors(errorAlertBody)}</ul>
        </Alert>}
        
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