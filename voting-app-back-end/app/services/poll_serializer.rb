class PollSerializer
    def initialize(poll_object)
        @poll = poll_object
    end

    def to_serialized_json
        @poll.to_json(:include => {
            :options => {:only => [:id, :name]}
        }, :except => [:updated_at, :created_at])
    end
end