require 'rspec'
require 'game'
require 'card'
require 'deck'
require 'hand'
require 'player'

# Game
  # ::initialize(player1, player2)
  #round
    #each Player has a turn
    #if noone folds, players reveal their hands; strongest one wins
    #else another round (w/o players who folded)

# Player
  #is dealt a hand of 5 cards
  #turn
    #see current bet

    #choose btwn:
      #raise
      #fold
      #call (bet)

    #choose:
      #can discard upto 3 cards
        #replace cards

# Deck
  #when Game::initialize, Deck::initialize
  #52 cards of 2 colors & 4 suits & 13 numbers

describe "Poker" do
  describe Game do
    describe '#initialize' do
      let(:player1) {double("player1")}
      let(:player2) {double("player2")}
      let(:deck) {double("deck")}
      subject(:poker) {Game.new(player1, player2)}

      it 'receives two players as arguments' do
        expect(poker.player1).to eq(player1)
        expect(poker.player2).to eq(player2)
      end

      # it 'contains a deck' do
      #   expect(poker.deck).to be_an(Array)
      # end

      it 'deals five cards to each player'

      it 'has an empty pot' do
        expect(poker.pot).to eq(0)
      end

      it 'tracks whose turn is it' do
        expect(poker.player_turn).to eq(player1)
      end
    end
  end

  describe Player do
    describe '#initialize' do
      it 'creates a hand'

      it 'has an empty pot'
    end

    describe '#draw' do

    end

    describe '#discard' do

    end
  end

  #Hand
    #scores/ranks the best combo of cards each player has
  describe Hand do
    let(:hand) {Hand.new(Deck.new)}

    describe '#initialize' do
      it 'contains 5 cards' do
        expect(hand.cards.length).to eq(5)
      end
    end

    describe '#show' do
      it 'shows cards in hand' do
        expect(hand.show).to eq(hand.cards) #how do we test puts?
      end
    end

    describe '#score' do
      it "scores hand with a ranking" do
        expect(0..9).to cover(hand.score)
      end
    end

    # describe '#compare' do
    #   it 'returns player with higher Hand#score' do
    #
    #   end
    # end
  end

  describe Deck do
    let(:deck) {Deck.new}
    describe '#initialize' do
      it 'contains 52 cards' do
        expect(deck.stack.length).to eq(52)
      end

      it 'contains only unique cards' do
        test_deck = deck.stack.map{|card| [card.number, card.suit]}
        expect(test_deck).to eq(test_deck.uniq)
      end

      it 'has an empty discard pile' do
        expect(deck.discards).to be_empty
      end
    end

    describe 'self::populate' do
      before(:each) do
        deck.stack = Deck.populate
      end

      it 'generates the deck' do
        expect(deck.stack.length).to be(52)
      end

      it 'contains only unique cards' do
        test_deck = deck.stack.map{|card| [card.number, card.suit]}
        expect(test_deck).to eq(test_deck.uniq)
      end
    end

    describe '#shuffle!' do
      it 'adds the discard pile back to the stack' do
        deck.shuffle!
        expect(deck.stack.length).to be(52)
      end

      it 'shuffles the deck' do
        orig_stack = deck.stack
        deck.shuffle!
        expect(deck.stack).not_to eql(orig_stack)
        expect(deck.stack.first).not_to eql(orig_stack.first)
      end
    end

    describe '#draw' do
      it 'removes cards from the deck' do
        deck.draw(3)
        expect(deck.stack.length).to eq(49)
      end
    end
  end

  describe Card do
    let(:card) {Card.new(1, :spade)}
    describe '#initialize' do
      it 'has a number value' do
        expect(card.number).to eq(1)
      end

      it 'has a suit' do
        expect(card.suit).to eq(:spade)
      end

      # it 'has a color' do
      #   expect(card.color).to eq(:red)
      # end

    end
  end
end

#Card
  #when Deck::initialize, cards ::initialize
  #number
  #color
  #suit
