class UsersController < ApplicationController
    def create
        email_info = JSON.parse(request.body.string)["email"]
        user = User.create(email: email_info)
        render json: UserSerializer.new(user).to_serialized_json
    end
end
