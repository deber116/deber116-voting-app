class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :votedPollIds

  def votedPollIds 
    result = self.object.votes.map do |vote|
      poll = vote.option.poll.id
      {pollId: poll, optionId: vote.option.id}
    end
  end

end
