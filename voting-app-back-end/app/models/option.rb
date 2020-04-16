class Option < ApplicationRecord
  belongs_to :poll
  has_many :votes, dependent: :destroy
end
