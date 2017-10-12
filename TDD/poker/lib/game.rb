class Game
  attr_reader :player1, :player2, :pot, :player_turn, :deck

  def initialize(player1, player2)
    @player1 = player1
    @player2 = player2
    # @deck = Deck.new
    @pot = 0
    @player_turn = player1
  end
end
