class UsersController < ApplicationController

  def index
    @users = User.where("name Like(?)","%#{params[:keyword]}%").where.not(id: current_user.id) if params[:keyword].present?
    respond_to do |format|
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    elsif
      render :edit
    end
  end

  private 
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
