class User < ApplicationRecord
    has_many :polls
    has_many :votes
    
end
