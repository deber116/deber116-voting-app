class PollSerializer < ActiveModel::Serializer
  attributes :id, :name, :user, :options

  def user
    {
      id: self.object.user.id, 
      email: self.object.user.email
    }
  end 

  def options
    result = self.object.options.map do |opt|
      {id: opt.id, name: opt.name, pollId: opt.poll_id, numVotes: opt.votes.count}
    end
  end
end
