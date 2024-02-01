module Api
  module V1
    class ArticlesController < AuthenticatedController
      before_action :check_basic_auth, only: [:create, :update, :destroy]
      before_action :set_article, only: %i[show update destroy]

      def index
        articles_per_page = 5
        @articles = Article.all

        articles_with_images = paginate_articles(@articles, articles_per_page)
        total_articles_count = Article.count

        render json: {
          articles: articles_with_images,
          total_count: total_articles_count,
          per_page: articles_per_page
        }
      end

      def show
        if @article.image.attached?
          article_with_image = @article.as_json.merge(image_url: url_for(@article.image))
        else
          article_with_image = @article.as_json.merge(image_url: nil)
        end

        nextArticle = @article.next || OpenStruct.new(id:"",title:"")
        prevArticle = @article.previous || OpenStruct.new(id:"",title:"")

        render json: article_with_image.as_json.merge(
          previous:{"id":prevArticle.id, "title":prevArticle.title},
          next:{"id":nextArticle.id, "title":nextArticle.title})
      end

      def create
        @article = Article.new(article_params)

        if @article.save
          render json: @article
        else
          render json: @article.errors, status: :unprocessable_entity
        end
      end

      def update
        #@article = Article.find(params[:id])
    
        if @article.update(article_params)
          render json: @article
        else
          render json: @article.errors, status: :unprocessable_entity
        end
      end

      def destroy
        #@article = Article.find(params[:id])
        @article.destroy
      end

      private

        def set_article
          @article = Article.find(params[:id])
        end

        def article_params
          params.require(:article).permit(:title, :body, :status, :notes, :links, :image)
        end
    end
  end
end