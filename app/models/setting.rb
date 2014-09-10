# == Schema Information
#
# Table name: settings
#
#  id            :integer          not null, primary key
#  visualiser_id :string(255)
#  settings      :text
#  user_id       :string(255)
#

class Setting < ActiveRecord::Base
  belongs_to :user
  serialize :settings, Hash
end
