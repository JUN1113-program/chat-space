class GroupUser < ApplicationRecord
  belogns_to :user
  belongs_to :group
end
