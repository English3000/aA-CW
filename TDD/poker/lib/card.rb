class Card
  attr_reader :number, :suit#, :color

  def initialize(number, suit)
    @number = number
    @suit = suit
    #@color =  #use helper method to assign color based on suit
  end
end
