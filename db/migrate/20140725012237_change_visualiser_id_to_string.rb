class ChangeVisualiserIdToString < ActiveRecord::Migration
  def change
    change_column :settings, :visualiser_id, :string
  end
end
