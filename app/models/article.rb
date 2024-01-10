class Article < ApplicationRecord
	include Visible
	include ValidLinks
	include NavHelpers

	has_many :comments, dependent: :destroy

	validates :title, presence: true
  	validates :body, presence: true, length: { minimum: 10 }
end
