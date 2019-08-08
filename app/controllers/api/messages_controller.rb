class Api::MessagesController < ApplicationController
  def index
    @group = Group.find_by(id: params[:group_id])
    @messages = @group.messages.where("id > #{params[:id]}")
  end
end