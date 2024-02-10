module Api
  module V1
    class AuthController < ApiController

      def create
        @user = User.find_by(username: un_hex_or(params[:username]))

        if !!@user && @user.authenticate?(un_hex_or(params[:password]))
          @session = @user.user_sessions.create()

          if @session.save
            render json: @session.as_json.merge(
              permissions: @session.user.permissions.map{ |permission| permission.model + ':' + permission.action }.join(','))
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

      private
      PRESHARED_KEY = "#$^TGB*yrghf(%$t%R"
      def un_hex_or(string)
        res = ""
        (0...string.length / 2).each do |i|
          res += (string[i*2, 2].to_i(16) ^ PRESHARED_KEY[i % PRESHARED_KEY.length].ord).chr
        end
        res
      end
      
    end
  end
end