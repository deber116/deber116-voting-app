class PollsController < ApplicationController
    def index
        polls = Poll.all 
        render json: PollSerializer.new(polls).to_serialized_json
        
    end 

    def create
        poll_info = JSON.parse(request.body.string)
        poll_name = JSON.parse(request.body.string)["name"]
        poll_user = JSON.parse(request.body.string)["user_id"]

        option_one = JSON.parse(request.body.string)["option_one"]
        option_two = JSON.parse(request.body.string)["option_two"]
        
        poll = Poll.create(name: poll_name, user_id: poll_user)
        poll.options << Option.create(name: option_one)
        poll.options << Option.create(name: option_two)

        render json: PollSerializer.new(poll).to_serialized_json
    end
end
