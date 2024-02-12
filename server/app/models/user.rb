class User < ApplicationRecord
    before_create :hash_password
    has_many :user_sessions, dependent: :destroy

    has_and_belongs_to_many :permissions

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, confirmation: true
    validates :password_confirmation, presence: true, unless: :skip_password_validation
    attr_accessor :skip_password_validation

    def authenticate? _password
        salted = _password + uuid.reverse
        password == Digest::SHA256.hexdigest(salted)
    end

    protected

    def hash_password
        self.uuid = SecureRandom.uuid
        self.password = Digest::SHA256.hexdigest(self.password + self.uuid.reverse)
    end
end
