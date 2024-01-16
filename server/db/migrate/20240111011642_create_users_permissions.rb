class CreateUsersPermissions < ActiveRecord::Migration[7.1]
  def change
    create_table :users_permissions, primary_key: [:user_id, :permission_id] do |t|
      t.belongs_to :user
      t.belongs_to :permission
    end

    add_foreign_key :users_permissions, :users, on_delete: :cascade
    add_foreign_key :users_permissions, :permissions, on_delete: :cascade
  end
end
