class ChangeSettingsToHash < ActiveRecord::Migration
  def change
    change_column :settings, :settings, :text
  end
end
