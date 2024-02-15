class ToggleSetting < Setting
    validates_presence_of :value
    validates :value, inclusion: { in: ["True", "False"] }
end
