module ValidLinks
  extend ActiveSupport::Concern

  included do
    validate :valid_links
  end

  def valid_links
    links.split(' ').each do |url|
      if url !~ URI::regexp
          errors.add(:links, "Invalid URL")
      end
    end
  end
end