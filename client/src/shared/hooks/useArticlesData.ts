import { useState, useEffect } from "react";
import { fetchAllArticles, searchArticles } from "../services/articles.service";

function useArticlesData(searchTerm: string) {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<any>(null);

    useEffect(() => {
        async function loadArticles() {
            try {
                let data;
                if (searchTerm) {
                    data = await searchArticles(searchTerm);
                } else {
                    data = await fetchAllArticles();
                }
                setArticles(data);
                setLoading(false);
            } catch(e) {
                setError(e);
                setLoading(false);
                console.error("Failed to fetch articles: ", e);
            }
        }

        loadArticles();
    }, [searchTerm])

    return { articles, loading, error };
}

export default useArticlesData;