class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.integer :visualiser_id
      t.string :settings
      t.string :user_id
    end
  end
end
