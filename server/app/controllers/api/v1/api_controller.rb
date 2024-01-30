module Api
    module V1
      class ApiController < ActionController::Base
        skip_before_action :verify_authenticity_token
  
        private
        def augment_with_image(article)
          if article.image.attached?
            article.as_json.merge(image_url: url_for(article.image))
          else
            article.as_json.merge(image_url: nil)
          end
        end

        def paginate_articles(articles, articles_per_page)
          paginated_articles = articles.page(params[:page]).per(articles_per_page)
          paginated_articles.map { |article| augment_with_image(article) }
        end
      end
    end
  end