class PollSerializer
    def initialize(poll_object)
        @poll = poll_object
    end

    def to_serialized_json
        @poll.to_json(:include => {
            :options => {
                :include => {:votes => {:only => [:id, :user_id]}},
                :only => [:id, :name, :poll_id]}
        }, :except => [:updated_at, :created_at])
    end
end