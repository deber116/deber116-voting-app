class User < ApplicationRecord
    has_many :polls
    has_many :votes
    validates :email, uniqueness: { case_sensitive: false }
end
