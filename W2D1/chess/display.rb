require_relative 'board'
require_relative 'cursor'
require 'colorize'

class Display
  attr_reader :cursor_pos

  def initialize(board)
    @board = board
    @cursor_pos = Cursor.new([0,0], board)
    @board[@cursor_pos.cursor_pos]
  end

  def render
    system("clear")
    @board.grid.each_with_index do |row, row_i|
      row.each_index do |col_i|
        square = @board[[row_i, col_i]].to_s
        if @cursor_pos.cursor_pos == [row_i, col_i]
          square = square.on_red
        elsif (row_i + col_i) % 2 == 0
          square = square.on_light_black
        else
          square = square.on_light_white
        end
        print square
      end
      print "\n"
    end
  end

end

if __FILE__ == $PROGRAM_NAME
begin
  board = Board.new
  display = Display.new(board)
  board.move_piece([0, 4], [1, 3])
# rescue
  display.render
  # p board[[0,1]].moves
  # p board[[0,4]].moves
  # 10.times do
  #   display.render
  #   display.cursor_pos.get_input
  # end
end
end
