class SetDefaults < ActiveRecord::Migration[7.1]
  def change
  	change_column_default :articles, :status, from: :null, to: "Public"
  	change_column_default :comments, :status, from: :null, to: "Public"
  end
end
