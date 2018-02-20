require "rspec"
require 'towers-of-hanoi'

describe TowersOfHanoi do
  subject(:towers_of_hanoi) {TowersOfHanoi.new}

  describe '#initialize' do
    it 'creates a nested array with three towers' do
      expect(towers_of_hanoi.towers).to eq([[1, 2, 3], [], []])
    end

    specify 'first tower has three disks (elements)' do
      expect(towers_of_hanoi.towers[0]).to eq([1, 2, 3])
    end

    specify 'last two towers are empty' do
      expect(towers_of_hanoi.towers[1]).to be_empty
      expect(towers_of_hanoi.towers[2]).to be_empty
    end
  end

  describe '#render' do
    it 'displays the current towers' do
      expect(towers_of_hanoi.render).to eq(towers_of_hanoi.towers)
    end
  end

  describe '#move' do
    it 'moves disk from tower-from to tower-to' do
      expect(towers_of_hanoi.move(0, 1)).to eq([[2,3], [1], []])
    end

    it 'raises error if #valid? returns false' do
      expect do
        towers_of_hanoi.move(0, 1)
        towers_of_hanoi.move(0, 1)
      end.to raise_error(ArgumentError)
    end
  end

  describe '#valid?' do
    before(:each) {towers_of_hanoi.towers = [[2,3], [1], []]}
    context 'player selects tower-from and tower-to, via #move' do
      it 'returns false if tower-from is empty' do
        #towers_of_hanoi.move(0, 1); [0, 1]
        #self.valid?
        expect(towers_of_hanoi.valid?(2, 0)).to be false
      end

      it 'returns false if tower-from equals tower-to' do
        # if self[0] == self[1]
        expect(towers_of_hanoi.valid?(0, 0)).to be false
        # end
      end

      it 'returns false if tower-from disk is greater than tower-to disk' do
        expect(towers_of_hanoi.valid?(0, 1)).to be false
      end
    end
  end

  describe '#won?' do
    it 'returns true when all disks are on a new tower' do
      expect([[], [1, 2, 3], []].won?).to be true
      expect([[], [], [1, 2, 3]].won?).to be true
    end

    it 'returns false when all disks are on first tower' do
      expect([[1, 2, 3], [], []].won?).to be false
    end

    it 'returns false when disks aren\'t on same tower' do
      expect([[3], [1], [2]].won?).to be false
    end
  end
end
