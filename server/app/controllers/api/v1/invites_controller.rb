module Api
    module V1
      class InvitesController < AuthenticatedController
        before_action -> {check_basic_auth( :Invite, params[:action])}
        before_action :set_invite, only: %i[destroy]

        def index
            invites_per_page = params.has_key?(:per_page) ? params[:per_page] : 5
            @invites = Invite.all
    
            total_invites_count = Invite.count
    
            render json: {
              invites: @invites.page(params[:page]).per(invites_per_page),
              total_count: total_invites_count,
              per_page: invites_per_page
            }
        end

        def create
            @invite = Invite.new(invite_params)

            if @invite.save
                render json: @invite
            else
                render json: @invite.errors, status: :unprocessable_entity
            end
        end

        def destroy
            @invite.destroy
        end

        private
        def set_invite
            @invite = Invite.find(params[:id])
        end

        def invite_params
          params.require(:invite).permit(:email)
        end

      end
    end
end