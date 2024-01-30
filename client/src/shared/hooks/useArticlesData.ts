import { useState, useEffect } from "react";
import { fetchAllArticles, searchArticles } from "../services/articles.service";

function useArticlesData(searchTerm: string, page:number = 1) {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<any>(null);
    const [totalArticles, setTotalArticles] = useState(0);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        async function loadArticles() {
            try {
                let data;
                if (searchTerm) {
                    data = await searchArticles(searchTerm, page);
                } else {
                    data = await fetchAllArticles(page);
                }
                if(data.articles) {
                    setArticles(data.articles);
                    setTotalArticles(data.total_count);
                    setPerPage(data.per_page);
                }
                setLoading(false);
            } catch(e) {
                setError(e);
                setLoading(false);
                console.error("Failed to fetch articles: ", e);
            }
        }

        loadArticles();
    }, [searchTerm, page])

    return { articles, loading, error, totalArticles, perPage };
}

export default useArticlesData;