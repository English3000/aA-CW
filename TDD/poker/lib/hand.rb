require_relative 'deck'

class Hand
  attr_reader :deck, :cards

  RANKING = {

  }
  def initialize(deck)
    @deck = deck
    @cards = @deck.draw(5)
  end

  def show
    p @cards
  end

  def score

  end
end
