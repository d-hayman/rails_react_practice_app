class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :email
      t.string :uuid
      t.integer :visits
      t.datetime :lastLogin
      t.boolean :verified

      t.timestamps
    end
    add_index :users, :username
    add_index :users, :email
    add_index :users, :uuid
  end
end
