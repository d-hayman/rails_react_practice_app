module Api
    module V1
      class AuthenticatedController < ApiController
        before_action :check_basic_auth
  
        private
  
        def check_basic_auth
          unless request.authorization.present?
            head :unauthorized
            return
          end
  
          session = UserSession.find_by(token: request.authorization)

          if session.nil?
            head :unauthorized
          else
            @current_user = session.user
          end
        end
  
        def current_user
          @current_user
        end
      end
    end
  end