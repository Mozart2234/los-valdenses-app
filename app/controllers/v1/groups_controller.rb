class V1::GroupsController < V1::BaseController
  def index
    groups = Group.all

    render json: groups, each_serializer: GroupSerializer
  end
end



