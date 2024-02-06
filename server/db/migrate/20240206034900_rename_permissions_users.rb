class RenamePermissionsUsers < ActiveRecord::Migration[7.1]
  def change
    rename_table :users_permissions, :permissions_users
  end
end
