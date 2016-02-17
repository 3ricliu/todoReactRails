class CreateTodeauxes < ActiveRecord::Migration
  def change
    create_table :todeauxes do |t|
      t.string :title, null: false
      t.text :body
      t.boolean :done
      t.timestamps null: false
    end
  end
end
