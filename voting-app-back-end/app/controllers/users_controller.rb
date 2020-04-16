class UsersController < ApplicationController
    def index
        render json: User.all
    end
    
    def create
        email_info = JSON.parse(request.body.string)["email"]
        user = User.find_or_create_by(email: email_info)
        render json: user
    end
end
