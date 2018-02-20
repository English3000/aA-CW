require_relative 'card'

class Deck
  attr_accessor :discards, :stack

  SUITS = [:diamond, :club, :heart, :spade]

  def initialize
    @discards = []
    @stack = Deck.populate
    @stack.shuffle!
  end

  def self.populate
    stack = []

    (1..13).each do |value|
      SUITS.each do |suit|
        stack << Card.new(value, suit)
      end
    end

    stack
  end

  def shuffle!
    @stack += @discards
    @discards = []
    @stack.shuffle!
  end

  def draw(n)
    new_cards = []
    n.times{new_cards << @stack.shift}
    new_cards
  end
end

# deck = Deck.new
# p deck.draw(3)
