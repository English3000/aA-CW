class CreateAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.integer :year, null: false
      t.integer :band_id, null: false
      t.boolean :live?, null: false #how does this work?
      t.text :description

      t.timestamps
    end

    add_index :albums, :title, unique: true
    add_index :albums, :band_id
  end
end
