class CreateVisualisers < ActiveRecord::Migration
  def change
    create_table :visualisers do |t|
      t.integer :visualiser_id
    end
  end
end
