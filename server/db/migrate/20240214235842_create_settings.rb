class CreateSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :settings do |t|
      t.string :name
      t.string :value
      t.string :type

      t.timestamps
    end
  end
end
