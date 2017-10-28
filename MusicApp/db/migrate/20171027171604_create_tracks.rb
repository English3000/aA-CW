class CreateTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :ord, null: false, unique: true
      t.integer :album_id, null: false
      t.boolean :bonus?, null: false
      t.text :lyrics

      t.timestamps
    end

    add_index :tracks, :title, unique: true
    add_index :tracks, :album_id
  end
end
