module Api
  module V1
    class CommentsController < AuthenticatedController
      before_action -> {check_basic_auth( :Comment, params[:action], ['destroy'], params[:id])}, only: [:create, :destroy] 
      before_action :set_article

	  def index
		comments_per_page = params.has_key?(:per_page) ? params[:per_page] : 5
		@comments = @article.comments.order(created_at: :desc)

		total_comments_count = @comments.count

		render json: {
			comments: @comments.page(params[:page]).per(comments_per_page).map{|comment| comment.as_json.merge(username:comment.user.username) },
			total_count: total_comments_count,
			per_page: comments_per_page
		}
	  end

      def create
		@comment = @article.comments.new(comment_params)
		@comment.user = current_user

		if @comment.save
		  render json: @comment
		else
		  render json: @comment.errors, status: :unprocessable_entity
		end
	  end

      def destroy
		@comment = @article.comments.find(params[:id])
		@comment.destroy
	  end

	  private
	  def set_article
		@article = Article.find(params[:article_id])
	  end

	  def comment_params
		params.require(:comment).permit(:body, :status)
	  end
	end
  end
end
