class TowersOfHanoi
  attr_accessor :towers

  def initialize
    @towers = [[1, 2, 3], [], []]
  end

  def render
    towers
  end

  def move(tower_from, tower_to)
    if [tower_from, tower_to].valid?
      moving_disk = towers[tower_from].shift
      towers[tower_to].unshift(moving_disk)
    end
  end

  def valid?(tower_from, tower_to)
    return false if towers[self[0]].empty?
    towers[self[0]].first < towers[self[1]].first
  end

  def won?

  end
end
