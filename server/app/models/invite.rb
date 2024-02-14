class Invite < ApplicationRecord
    validates :email, presence: true
    validates :email, uniqueness: true, unless: :consumed
end
