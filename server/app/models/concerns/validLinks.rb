module ValidLinks
  extend ActiveSupport::Concern

  included do
    validate :valid_links
  end

  # Checks that a string is a space-delimited list of valid URLs by
  # splitting the string and checking each portion against the standard URI regex
  def valid_links
    if links.nil?
      return
    end
    links.split(' ').each do |url|
      if url !~ URI::regexp
          errors.add(:links, "Invalid URL")
      end
    end
  end
end