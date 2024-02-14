module Api
    module V1
      class UsersController < AuthenticatedController
        before_action -> {check_basic_auth( :User, params[:action], ['show'], params[:id])}, except: [:create]
        before_action :set_user, only: %i[show set_permissions]

        def index
            users_per_page = params.has_key?(:per_page) ? params[:per_page] : 5
            @users = User.all
    
            total_users_count = User.count
    
            render json: {
              users: @users.page(params[:page]).per(users_per_page).map{ |user| include_permissions(user) },
              total_count: total_users_count,
              per_page: users_per_page
            }
        end

        def show
            render json: include_permissions(@user)
        end

        def create
          #instantiate potential new user
          @user = User.new(user_create_params)

          #check for a matching invite
          invite = Invite.find_by(email:@user.email, consumed: false)

          unless invite.nil?
            invite.consumed = true
            invite.save
          end

          if @user.save
            render json: include_permissions(@user)
          else
            render json: @user.errors, status: :unprocessable_entity
          end
        end

        def set_permissions

            @user.skip_password_validation = true
            
            if @user.update(user_permission_params)
                render json: include_permissions(@user)
            else
                render json: @user.errors, status: :unprocessable_entity
            end
        end

        private
        def include_permissions(user)
            res = user.as_json
            res.delete("password")
            res.as_json.merge(permissions: user.permissions)
        end

        def set_user
            @user = User.find(params[:id])
        end

        def user_permission_params
          params.require(:user).permit(:permission_ids => [])
        end

        def user_create_params
          params.require(:user).permit(:username, :email, :password, :password_confirmation)
        end

      end
    end
end