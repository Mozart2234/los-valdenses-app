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
  belongs_to :group, optional: true
  belongs_to :user, optional: true

  validates :pathfinder, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :counselor, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :flag, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :uniform, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :bible_study, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :event_1, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_sunday?
  validates :event_2, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_sunday?
  validates :event_3, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_sunday?
  validates :initial_formation, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :unit_corner_formation, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :progressive_classes_formation, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :specialties_formation, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :events_formation, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :final_formation, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :day_is_saturday?
  validates :bonus, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :small_fault, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :moderate_fault, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :serious_fault, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
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
    
    rest_points = small_fault + moderate_fault + serious_fault
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
