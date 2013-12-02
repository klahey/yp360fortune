class CreateOffices < ActiveRecord::Migration
  def change
    create_table :offices do |t|
      t.string :name
      t.integer :sales
      t.integer :region_id

      t.timestamps
    end
  end
end
