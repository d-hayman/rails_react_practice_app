class Setting < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    attr_readonly :type, :name
end
