class GroupsController < ApplicationController

  before_action :set_group, only: [:edit,:update]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.create(params_group)
    if @group.save
      redirect_to group_messages_path(@group.id), notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(params_group)
      redirect_to group_messages_path(params[:id]), notice: "グループを編集しました"
    else
      render :edit
    end
  end

  private
  def params_group
    params.require(:group).permit(:name, { user_ids: [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
