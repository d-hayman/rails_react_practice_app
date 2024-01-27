import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle, updateArticle } from "../../shared/services/articles.service";
import { Article } from "../../shared/models/article.model";
import ArticleForm from "./ArticleForm";
import { objectToFormData } from "../../shared/utils/formDataHelper";

function EditArticleForm() {
    const [article, setArticle] = useState<Article|null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentArticle = async () => {
            try {
                const json = await fetchArticle(id);
                setArticle(Article.buildArticleData(json));
            } catch(e) {
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
            console.error("Failed to update the article: ", e);
        }
    }

    if(!article) return <h2>Loading...</h2>

    return (
        <>
        <ArticleForm
            article={article}
            headerText="Edit Article"
            buttonText="Update Article"
            onSubmit={handleUpdateSubmit}
         />
        </>
    )
}

export default EditArticleForm;