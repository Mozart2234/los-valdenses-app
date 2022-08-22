class ScoreSerializer
  include JSONAPI::Serializer
  attributes :pathfinder, :counselor, :flag, :uniform, :bible_study, :formation_1, :formation_2, :formation_3, :bonus, :small_fault, :moderate_fault, :serious_fault, :favor_score, :points_against, :total, :date_at
end
