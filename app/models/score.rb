# == Schema Information
#
# Table name: scores
#
#  id             :bigint           not null, primary key
#  pathfinder     :integer
#  counselor      :integer
#  flag           :integer
#  uniform        :integer
#  bible_study    :integer
#  formation_1    :integer
#  formation_2    :integer
#  formation_3    :integer
#  bonus          :integer
#  small_fault    :integer
#  moderate_fault :integer
#  serious_fault  :integer
#  favor_score    :integer
#  points_against :integer
#  total          :integer
#  group_id       :bigint
#  user_id        :bigint
#  date_at        :date
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Score < ApplicationRecord
  validates :pathfinder, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
