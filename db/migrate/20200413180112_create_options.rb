class CreateOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :options do |t|
      t.string :name
      t.references :poll, null: false, foreign_key: true

      t.timestamps
    end
  end
end
