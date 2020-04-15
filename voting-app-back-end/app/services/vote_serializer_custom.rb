class VoteSerializer
    def initialize(vote_object)
        @vote = vote_object
    end

    def to_serialized_json
        @vote.to_json(:except => [:updated_at, :created_at])
    end
end