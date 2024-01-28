class Article < ApplicationRecord
	include Visible
	include ValidLinks
	include NavHelpers

	has_many :comments, dependent: :destroy
	has_one_attached :image

	validates :title, presence: true
  	validates :body, presence: true, length: { minimum: 10 }

	scope :search_term, ->(query) do
		where('title LIKE ? OR body LIKE ? OR notes LIKE ?', 
			"%#{sanitize_sql_like(query)}%", 
			"%#{sanitize_sql_like(query)}%", 
			"%#{sanitize_sql_like(query)}%")
	end
end
