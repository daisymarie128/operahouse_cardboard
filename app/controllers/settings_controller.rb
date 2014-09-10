class SettingsController < ApplicationController
  def create
    visualiser_id = params[:settings][:visualiser]
    if oldsetting = @current_user.settings.find_by(visualiser_id: visualiser_id)
      oldsetting.update(settings: params[:settings][:setting].to_hash)
    else
      @setting = Setting.new(visualiser_id: visualiser_id, settings: params[:settings][:setting].to_hash, user_id: @current_user.id)
      if @setting.save
        @current_user.settings << @setting
      end
    end
    render json: @setting
  end
end
