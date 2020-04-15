class VotesController < ApplicationController
    def index
        # user_info = JSON.parse(request.body.string)
        # user_id = user_info["user_id"].to_i
        # user_votes = Vote.all.select {|vote| vote.user_id == user_id}
        # byebug
        render json: Vote.all
    end
    
    def create
        vote_info = JSON.parse(request.body.string)
        user_id = vote_info["user_id"]
        option_id = vote_info["option_id"].to_i

        vote = Vote.create(user_id: user_id, option_id: option_id)

        render json: vote
    end
end
