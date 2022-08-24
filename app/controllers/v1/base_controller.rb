class V1::BaseController < ActionController::Base
  before_action :authenticate_user!

  protect_from_forgery unless: -> { request.format.json? }
  rescue_from ActiveRecord::StatementInvalid do |exception|
    render json: { error: "Please try again later" }
  end
end
