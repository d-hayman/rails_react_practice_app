class AddNotesAndLinksToArticles < ActiveRecord::Migration[7.1]
  def change
    add_column :articles, :notes, :text
    add_column :articles, :links, :text
  end
end
