class Api::V1::SearchController < ApplicationController
  def articles
    @articles = Article.search_term(params[:q])

    articles_with_images = @articles.map do |article|
      if article.image.attached?
        article.as_json.merge(image_url: url_for(article.image))
      else
        article.as_json.merge(image_url: nil)
      end
    end

    render json: articles_with_images
  end
end
