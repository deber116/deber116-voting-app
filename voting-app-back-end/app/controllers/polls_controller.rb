class PollsController < ApplicationController
    def create
        #byebug
        poll_info = JSON.parse(request.body.string)
        poll_name = JSON.parse(request.body.string)["name"]
        poll_user = JSON.parse(request.body.string)["user_id"]
       
        poll = Poll.find_or_create_by(name: poll_name, user_id: poll_user)
        render json: PollSerializer.new(poll).to_serialized_json
    end
end
