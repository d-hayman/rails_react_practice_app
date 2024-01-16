class CreateUserSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :user_sessions do |t|
      t.string :token
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :user_sessions, :token
  end
end
