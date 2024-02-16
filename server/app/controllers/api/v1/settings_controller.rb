module Api
    module V1
      class SettingsController < AuthenticatedController
        wrap_parameters false
        before_action -> {check_basic_auth( :Setting, params[:action])}

        def index
            @settings = Setting.all
    
            total_settings_count = Setting.count
    
            render json: {
              settings: @settings.map{ |setting| setting.as_json.merge(type:setting.type) },
              total_count: total_settings_count
            }
        end

        def update
            errors = {}
            
            #do a first pass to check that each setting is a valid setting without attempting to update anything
            settings_params[:settings].each do |s|
              if s[:name].nil? || s[:name].empty?
                errors["Empty"] = "Name not provided"
                next
              end
              setting = Setting.find_by(name: s[:name])
              unless setting
                errors = errors.as_json.merge("#{s[:name]}": "Setting not found")
              end
            end

            if errors.keys.count > 0
              render json: errors, status: :unprocessable_entity
            else
              #only update things now that we're certain we have valid settings names
              settings_params[:settings].each do |s|
                setting = Setting.find_by(name: s[:name])
                setting.value = s[:value]
                unless setting.save
                  errors[s[:name]] = setting.errors.full_messages
                end
              end

              if errors.keys.count > 0
                render json: errors, status: :unprocessable_entity
              else
                render json: Setting.all
              end
            end
        end

        private

        def settings_params
          params.permit(:settings => [:name, :value])
        end

      end
    end
end