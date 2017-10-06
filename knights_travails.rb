require_relative "poly-tree-node/lib/00_tree_node.rb"

class KnightPathFinder

  def initialize(start_pos)
    @start_pos = PolyTreeNode.new(start_pos)
    @move_tree = []
    build_move_tree #all possible seq's of moves
    @visited_pos = [start_pos] #or start_pos.value
  end

  def build_move_tree #make recursive/bfs
    #calls new_moves(self.value) from current pos
    que = [@start_pos.value]
    until que.empty?
      node = que.shift
      next_moves = new_moves(node.value)
      next_moves.each do |sq|
        new_pos = PolyTreeNode.new(sq)
        new_pos.parent = node
        node.add_child(new_pos)
        @move_tree << new_pos #what are we building w/in @move_tree?
        que << new_pos
      end
    end
    nil
  end

  # def bfs(target_value)
  #   que = [self]
  #   until que.empty?
  #     node = que.shift
  #     return node if node.value == target_value
  #     que += node.children
  #   end
  #   nil
  # end

  def valid_moves(pos = @start_pos)
    row, col = pos.value
    #row: +/- 1/2, col: +/- 2/1
    pos1 = [row + 2, col + 1]
    pos2 = [row + 1, col + 2]
    pos3 = [row - 1, col + 2]
    pos4 = [row - 2, col + 1]

    pos5 = [row + 2, col - 1]
    pos6 = [row + 1, col - 2]
    pos7 = [row - 1, col - 2]
    pos8 = [row - 2, col - 1]

    all_pos = [pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8]

    all_pos.select do |sq|
      row, col = sq
      row.between?(0, 7) && col.between?(0, 7) && !( @visited_pos.include?(pos) )
    end
  end

  def new_moves(pos = @start_pos)
    #check for repeated moves
    new_pos = self.valid_moves(pos).reject{ |sq| @visited_pos.include?(sq) }
    @visited_pos += new_pos
    new_pos
  end

  def shortest_path(end_pos) #find_path
    # @move_tree #has all possible valid paths #traverse it
    # bfs(end_pos) #to find shortest of them
  end

  def trace_path
    #should return the values in order from start_pos to end_pos
  end

end

# knight = KnightPathFinder.new([1,2])
# knight.new_moves([1,2])
