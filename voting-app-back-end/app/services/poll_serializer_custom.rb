class PollSerializer
    def initialize(poll_object)
        @poll = poll_object
    end

    def to_serialized_json
        #will need ActiveModel Serializer to create 
        @poll.to_json(:include => {
            :options => {
                #should return the number of votes, not all the vote objects
                :include => {:votes => {:only => [:id, :user_id]}},
                :only => [:id, :name, :poll_id]}
        }, :except => [:updated_at, :created_at])
    end
end