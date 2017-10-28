class CreateBands < ActiveRecord::Migration[5.1]
  def change
    create_table :bands do |t|
      t.string :name, null: false
      t.integer :manager_id, null: false
      t.text :description

      t.timestamps
    end

    add_index :bands, :name, unique: true
    add_index :bands, :manager_id
  end
end
