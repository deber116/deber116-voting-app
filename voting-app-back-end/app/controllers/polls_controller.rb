class PollsController < ApplicationController
    def index
        polls = Poll.all 
        #render json: PollSerializer.new(polls).to_serialized_json
        render json: polls
    end 

    def show
        poll = Poll.find_by(id: params[:id])
        render json: poll
    end 

    def create
        poll_info = JSON.parse(request.body.string)
        poll_name = poll_info["name"]
        poll_user = poll_info["user_id"]

        option_one = poll_info["option_one"]
        option_two = poll_info["option_two"]
        
        poll = Poll.create(name: poll_name, user_id: poll_user)
        poll.options << Option.create(name: option_one)
        poll.options << Option.create(name: option_two)

        render json: PollSerializer.new(poll).to_serialized_json
    end
end
