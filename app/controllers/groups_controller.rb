class GroupsController < ApplicationController

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.create(params_group)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[id])
  end

  def update
  end

  private
  def params_group
    params.require(:group).permit(:name, { user_ids: [] })
  end

end
