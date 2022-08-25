class CreateFeatureFlags < ActiveRecord::Migration[7.0]
  def change
    create_table :feature_flags do |t|
      t.string :name
      t.string :var_name
      t.boolean :is_active
      t.timestamps
    end
  end
end
