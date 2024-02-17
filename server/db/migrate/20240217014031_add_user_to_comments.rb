class AddUserToComments < ActiveRecord::Migration[7.1]
  def change
    add_reference :comments, :user, null: true, foreign_key: {on_delete: :nullify}
    remove_foreign_key :comments, column: :article_id
    add_foreign_key :comments, :articles, column: :article_id, on_delete: :cascade
  end
end
