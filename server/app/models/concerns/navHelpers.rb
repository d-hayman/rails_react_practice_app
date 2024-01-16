module NavHelpers
    extend ActiveSupport::Concern

    # Gets the next record in the database, or +nil+ if this is the last record
    def next
        self.class.where("id > ?", id).first
    end

    # Gets the previous record in the database, or +nil+ if this is the first record
    def previous
        self.class.where("id < ?", id).last
    end
end