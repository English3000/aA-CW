require_relative 'tic_tac_toe'

class TicTacToeNode
  attr_reader :board, :next_mover_mark, :prev_move_pos

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board #current board state
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(evaluator)
  end

  def winning_node?(evaluator)
  end

  def children #equiv. new_moves
    # generates an array of all moves that can be made after the current move.
    # 1. iterate through empty positions on board
    # for each empty pos, create a node via board.dup and putting a next_mover_mark in the position
  end
end

# def valid_moves(pos = @start_pos)
#   row, col = pos.value
#   #row: +/- 1/2, col: +/- 2/1
#   pos1 = [row + 2, col + 1]
#   pos2 = [row + 1, col + 2]
#   pos3 = [row - 1, col + 2]
#   pos4 = [row - 2, col + 1]
#
#   pos5 = [row + 2, col - 1]
#   pos6 = [row + 1, col - 2]
#   pos7 = [row - 1, col - 2]
#   pos8 = [row - 2, col - 1]
#
#   all_pos = [pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8]
#
#   all_pos.select do |sq|
#     row, col = sq
#     row.between?(0, 7) && col.between?(0, 7) && !( @visited_pos.include?(pos) )
#   end
# end
#
# def new_moves(pos = @start_pos)
#   #check for repeated moves
#   new_pos = self.valid_moves(pos).reject{ |sq| @visited_pos.include?(sq) }
#   @visited_pos += new_pos
#   new_pos
# end
