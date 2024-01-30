module Api
  module V1
    class SearchController < ApiController
      def articles
        articles_per_page = 10
        @articles = Article.search_term(params[:q])

        articles_with_images = paginate_articles(@articles, articles_per_page)
        total_articles_count = @articles.count

        render json: {
          articles: articles_with_images,
          total_count: total_articles_count,
          per_page: articles_per_page
        }
      end
    end
  end
end
