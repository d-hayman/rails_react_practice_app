class UserSession < ApplicationRecord
  belongs_to :user

  before_create :generate_token

  protected

  def generate_token
    self.token = SecureRandom.urlsafe_base64
    generate_token if UserSession.exists?(token: self.token)
  end
end
