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
  validates :counselor, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :flag, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :uniform, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :bible_study, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :formation_1, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :formation_2, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :formation_3, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :bonus, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :small_fault, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :moderate_fault, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :serious_fault, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :group_id, presence: true
  
  belongs_to :group, optional: true
end
