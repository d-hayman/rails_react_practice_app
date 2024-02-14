class Invite < ApplicationRecord
    validates :email, presence: true
    validates_uniqueness_of :email, conditions: -> { where(consumed: false) }
end
