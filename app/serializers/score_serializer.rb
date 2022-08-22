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
class ScoreSerializer < ActiveModel::Serializer
  attributes :pathfinder, 
             :counselor, 
             :flag, 
             :uniform, 
             :bible_study, 
             :formation_1, 
             :formation_2, 
             :formation_3, 
             :bonus, 
             :small_fault, 
             :moderate_fault, 
             :serious_fault, 
             :favor_score, 
             :points_against, 
             :total, 
             :date_at
end
