class Array
  def my_uniq
    result = []
    each do |el|
      result << el if result.none?{|el2| el2 == el}
    end
    result
  end

  def two_sum
    result = []
      each_index do |i|
        each_index do |j|
            result << [i, j] if self[i] + self[j] == 0 && j > i
        end
      end
    result
  end

  def my_transpose
    result = Array.new(self[0].length) {Array.new}
    each_with_index do |row, row_i|
      row.each_with_index do |el, col_i|
        result[col_i][row_i] = el
      end
    end
    result
  end

end

def stock_picker(array)
  array_length = array.length - 1
  buy_sell_combos = []

  (0...array_length).each do |buy_day|
    (1..array_length).each do |sell_day|
      buy_sell_combos << [buy_day, sell_day] if sell_day > buy_day
    end
  end

  best_combo = nil
  profit = 0
  buy_sell_combos.each do |pair|
    difference = array[pair[1]] - array[pair[0]]
    if difference > profit
      profit = difference
      best_combo = pair
    end
  end
  best_combo
end
