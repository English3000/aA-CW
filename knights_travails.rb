require_relative "poly-tree-node/lib/00_tree_node.rb"

class KnightPathFinder

  def initialize(pos)
    @pos = PolyTreeNode.new(pos)
    # @move_tree = @pos.build_move_tree
    @visited_pos = [pos] #or pos.value
  end

  def build_move_tree
    #calls new_moves(self.value) from current pos
    next_moves = new_moves(self.value)
    next_moves.each do |sq|
      new_pos = PolyTreeNode.new(sq)
      new_pos.parent = self
      self.add_child(new_pos)
    end
  end

  def valid_moves(pos)
    row, col = pos
    # row.between?(0..7)
    # && col.between?(0..7)
    # && !( @visited_pos.include?(pos) )

    #up to 8 valid moves
  end

  def new_moves(pos)
    #check for repeated moves
    new_pos = self.valid_moves(pos).reject{|sq| @visited_pos.include?(sq)}
    @visited_pos += new_pos
    new_pos
  end

end

# knight = KnightPathFinder.new([1,2])
# knight.new_moves([1,2])
