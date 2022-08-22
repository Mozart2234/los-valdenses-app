class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores do |t|
      t.integer :pathfinder
      t.integer :counselor
      t.integer :flag
      t.integer :uniform
      t.integer :bible_study
      t.integer :formation_1
      t.integer :formation_2
      t.integer :formation_3
      t.integer :bonus
      t.integer :small_fault
      t.integer :moderate_fault
      t.integer :serious_fault
      t.integer :favor_score
      t.integer :points_against
      t.integer :total
      t.references :group, index: true
      t.references :user, index: true
      t.date :date_at

      t.timestamps
    end
  end
end
