module Api
  module V1
    class AuthController < ApiController

      def create
        @user = User.find_by(username: params[:username])

        if !!@user && @user.authenticate?(params[:password])
          @session = @user.user_sessions.create()

          if @session.save
            render json: @session
          else
            render json: @session.errors, status: :unprocessable_entity
          end
        else
          head :unauthorized
        end
      end

      def destroy
        
      end
    end
  end
end