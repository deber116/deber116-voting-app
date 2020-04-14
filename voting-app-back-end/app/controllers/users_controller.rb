class UsersController < ApplicationController
    def create
        email_info = JSON.parse(request.body.string)["email"]
        user = User.find_or_create_by(email: email_info)
        render json: UserSerializer.new(user).to_serialized_json
    end
end
