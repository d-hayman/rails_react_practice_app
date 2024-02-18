import { useNavigate } from "react-router-dom";
import { createArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";
import ArticleForm from "./components/ArticleForm";
import { objectToFormData } from "../../shared/utils/formDataHelper";
import ErrorModal from "../../shared/components/ErrorModal";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { listifyErrors } from "../../shared/utils/responseHelpers";

function NewArticleForm() {
    const [errorHeaderText, setErrorHeaderText] = useState('');
    const [errorBodyText, setErrorBodyText] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorAlertBody, setErrorAlertBody] = useState<any>({});
    const navigate = useNavigate();

    const handleCreateSubmit =async (rawData:Article) => {
        try {
            const formData = objectToFormData({article: rawData})
            const response = await createArticle(formData);
            const json = await response.json();
            if(response.ok) {
                navigate(`/article/${json.id}`);
            } else {
                setErrorAlertBody(json);
                setShowErrorAlert(true);
            }
        } catch(e){
            setErrorHeaderText("Failed to Create Article");
            setErrorBodyText(`${e}`);
            setErrorVisible(true);
            console.error("Failed to create article: ",e);
        }  
    };

    return (
        <>
        { showErrorAlert &&
        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <ul>{listifyErrors(errorAlertBody)}</ul>
        </Alert>}

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
