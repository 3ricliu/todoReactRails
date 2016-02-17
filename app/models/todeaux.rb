class Todeaux < ActiveRecord::Base
    validates :title, presence: true

    # before_save :default_values
    #
    # def default_values
    #   self.done ||= false
    # end

end
