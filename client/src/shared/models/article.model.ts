/**
 * 
 */
class Article {
    /**
     * ID, a number, but we treat it as a string since we do no math with it but plenty of concatenation in routing
     */
    id?:string = '';
    /**
     * The article title
     */
    title:string = '';
    /**
     * The main content of the article
     */
    body:string = '';
    /**
     * Additional remarks
     */
    notes:string = '';
    /**
     * Space delimited list of URLs
     */
    links:string = '';
    /**
     * Status: must be public, private, or archived
     */
    status:string = '';
    image?: File | undefined | null;

    /**
     * 
     * @param dataset 
     * @returns 
     */
    public static buildArticleData(dataset:any):Article {
        const article = new Article();
        article.id = dataset.id ?? '';
        article.title = dataset.title ?? '';
        article.body = dataset.body ?? '';
        article.notes = dataset.notes ?? '';
        article.links = dataset.links ?? '';
        article.status = dataset.status ?? '';
        return article;
    }
}

export {Article}