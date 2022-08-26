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
  attribute :pathfinder, default: 0
  attribute :counselor, default: 0
  attribute :flag, default: 0
  attribute :uniform, default: 0
  attribute :bible_study, default: 0
  attribute :event_1, default: 0
  attribute :event_2, default: 0
  attribute :event_3, default: 0
  attribute :initial_formation, default: 0
  attribute :unit_corner_formation, default: 0
  attribute :progressive_classes_formation, default: 0
  attribute :specialties_formation, default: 0
  attribute :events_formation, default: 0
  attribute :final_formation, default: 0
  attribute :bonus, default: 0
  attribute :small_fault, default: 0
  attribute :moderate_fault, default: 0
  attribute :serious_fault, default: 0
  attribute :moderate_fault, default: 0
  attribute :favor_score, default: 0
  attribute :points_against, default: 0
  attribute :total, default: 0

  belongs_to :group, optional: true
  belongs_to :user, optional: true

  validates :pathfinder, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :counselor, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :flag, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :uniform, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :bible_study, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :event_1, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_sunday?
  validates :event_2, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_sunday?
  validates :event_3, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_sunday?
  validates :initial_formation, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :unit_corner_formation, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :progressive_classes_formation, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :specialties_formation, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :events_formation, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :final_formation, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :bonus, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :small_fault, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :moderate_fault, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :serious_fault, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :date_at, presence: true, uniqueness: { scope: :group, message: "El grupo ya tiene un registro en la misma fecha" }
  validates :group_id, presence: true
  validates :user_id, presence: true
  validates :favor_score, presence: true
  validates :points_against, presence: true
  validates :total, presence: true
  validate :date_at_can_be_only_sunday_or_saturday

  before_save :calculate_totals

  private

  def calculate_totals
    add_points = pathfinder +
                 counselor +
                 flag +
                 uniform +
                 bible_study +
                 event_1 +
                 event_2 +
                 event_3 +
                 initial_formation +
                 unit_corner_formation +
                 progressive_classes_formation +
                 specialties_formation +
                 events_formation +
                 final_formation

    rest_points = 0

    if (serious_fault)
      rest_points = add_points
    else
      rest_points = (small_fault * 10) + (moderate_fault * 20) 
    end
    total = add_points - rest_points

    self.favor_score = add_points
    self.points_against = rest_points
    self.total = total
  end

  def day_is_sunday?
    date_at.to_date.wday == 0
  end

  def day_is_saturday?
    date_at.to_date.wday == 6
  end

  def date_at_can_be_only_sunday_or_saturday
    if date_at.present? && ![0, 6].include?(date_at.wday)
      errors.add(:date_at, "Solo es posible agregar un registro los dias Sabado o Domingo")
    end
  end
end
