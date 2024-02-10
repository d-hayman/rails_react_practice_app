# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
[
    ["Article", "create"],
    ["Article", "update"],
    ["Article", "destroy"],
    ["Comment", "create"],
    ["Comment", "destroy"],
    ["User", "index"],
    ["User", "show"],
    ["User", "set_permissions"],
    ["Permission", "index"],
    ["Permission", "show"],
    ["AdminPanel", "view"]
].each do |model, action|
    Permission.find_or_create_by(model: model, action: action)
end