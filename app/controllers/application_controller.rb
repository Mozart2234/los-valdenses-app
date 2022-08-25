class ApplicationController < ActionController::Base
  before_action :feature_flags

  def feature_flags
    @feature_flags ||= FeatureFlag.where(is_active: true).pluck(:var_name) 
  end
end
