module Api
    module V1
      class AuthenticatedController < ApiController
        #before_action :check_basic_auth 
        #checks auth on all methods when added, add to subclasses with "only:" when necessary
        #I would like to have a default paramaterless call in this parent class except it seems that 
        #overriding with :only in a subclass only prevents this from being called when not passing params
        #because the only method that works is a lambda it counts as a separate call instead of overriding
        #and preventing the blanket call in the parent class, which is no good for when some actions are
        #meant to be deliberately unauthenticated and not others, such as Articles show and update
  
        private
  
        def check_basic_auth (model="", action="", allowSelf=[], id=0)
          unless request.authorization.present?
            head :unauthorized
            return
          end
  
          session = UserSession.find_by(token: request.authorization)

          #just check if we're logged in
          if session.nil?
            head :unauthorized
          else
            @current_user = session.user

            #granular permission checks where applicable
            if model.length > 0 && action.length > 0
              #skip permission checks when a user is fetching their own data
              unless allowSelf.include?(action) && compare_id(id.to_i, model)
                permission = Permission.find_by(model: model, action: action)
                unless permission.user_ids.include? @current_user.id
                  head :unauthorized
                end
              end
            end
          end
        end
  
        def current_user
          @current_user
        end

        def compare_id(id, model)
          if model.to_s == "User"
            return id == @current_user.id
          end

          # if user has comments then :Comment converted thusly should give us a list of the user's comments
          belongings = @current_user.try(model.to_s.downcase.pluralize)
          unless belongings
            return false
          end

          return belongings.ids.include? id
        end
      end
    end
  end