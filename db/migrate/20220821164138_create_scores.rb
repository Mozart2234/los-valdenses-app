class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores do |t|
      t.integer :pathfinder
      t.integer :counselor
      t.integer :flag
      t.integer :uniform
      t.integer :bible_study
      t.integer :event_1
      t.integer :event_2
      t.integer :event_3
      t.integer :initial_formation
      t.integer :unit_corner_formation
      t.integer :progressive_classes_formation
      t.integer :specialties_formation
      t.integer :events_formation
      t.integer :final_formation
      t.integer :bonus
      t.integer :small_fault
      t.integer :moderate_fault
      t.integer :serious_fault
      t.integer :favor_score
      t.integer :points_against
      t.integer :total
      t.references :group, index: true, not_null: true
      t.references :user, index: true, not_null: true
      t.date :date_at

      t.timestamps
    end
  end
end
