class V1::BaseController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
end
