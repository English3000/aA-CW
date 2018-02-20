require_relative "poly-tree-node/lib/00_tree_node.rb"

class KnightPathFinder

  def initialize(start_pos)
    @start_pos = start_pos
    @move_tree = PolyTreeNode.new(start_pos)
    @visited_positions = [start_pos]
    build_move_tree #all possible seq's of moves
  end

  def build_move_tree
    que = [@move_tree]
    until que.empty?
      node = que.shift
      next_moves = new_moves(node)
      next_moves.each do |sq|
        new_node = PolyTreeNode.new(sq)
        node.add_child(new_node)
        que << new_node
      end
    end
    nil
  end

  def valid_moves(node = @move_tree)
    row, col = node.value

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
      row.between?(0, 7) && col.between?(0, 7) && !( @visited_positions.include?(node) )
    end
  end

  def new_moves(node = @move_tree)
    new_nodes = self.valid_moves(node).reject{ |sq| @visited_positions.include?(sq) }
    @visited_positions += new_nodes
    new_nodes
  end

  def shortest_path(end_pos) #find_path
    node = @move_tree.bfs(end_pos)
    trace_path(node)
  end

  def trace_path(node)
    path = []
    current_node = node
    until current_node.nil?
      path << current_node.value
      current_node = current_node.parent
    end
    path.reverse
  end

end
