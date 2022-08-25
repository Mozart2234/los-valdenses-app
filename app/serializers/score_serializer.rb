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
  attributes :id,
             :pathfinder, 
             :counselor, 
             :flag, 
             :uniform, 
             :bible_study, 
             :event_1,
             :event_2,
             :event_3,
             :initial_formation,
             :unit_corner_formation,
             :progressive_classes_formation,
             :specialties_formation,
             :events_formation,
             :final_formation,
             :bonus, 
             :small_fault, 
             :moderate_fault, 
             :serious_fault, 
             :favor_score, 
             :points_against, 
             :total, 
             :date_at
end
