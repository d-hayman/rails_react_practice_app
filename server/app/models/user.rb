class User < ApplicationRecord
    has_many :user_sessions, dependent: :destroy

    has_and_belongs_to_many :permissions

    def authenticate? _password
        salted = _password + uuid.reverse
        password == Digest::SHA256.hexdigest(salted)
    end
end
