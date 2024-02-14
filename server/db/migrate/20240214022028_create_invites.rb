class CreateInvites < ActiveRecord::Migration[7.1]
  def change
    create_table :invites do |t|
      t.string :email
      t.boolean :consumed, :null => false, :default => false

      t.timestamps
    end
  end
end
