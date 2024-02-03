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
        unless request.authorization.present?
          head :unauthorized
          return
        end

        session = UserSession.find_by(token: request.authorization)

        if session.nil?
          return
        else
          session.destroy
        end
      end
    end
  end
end