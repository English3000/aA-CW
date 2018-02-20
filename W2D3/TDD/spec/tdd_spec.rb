require "rspec"
require "tdd"

describe Array do
  describe "#my_uniq" do
    array = [1,2,1,3,3]
    it "removes duplicates from array" do
      expect(array.my_uniq).to eq([1,2,3])
    end

    it "returns an array of uniq elements in order they appear" do
      expect(array.my_uniq).to eq([1,2,3])
    end
  end

  describe '#two_sum' do
    array = [-1, 0, 2, -2, 1]
    it 'selects index-pairs for array elements that sum to zero' do
      expect(array.two_sum).to eq([[0, 4], [2, 3]])
    end

    it 'returns pairs by lowest first element' do
      expect(array.two_sum).to eq([[0, 4], [2, 3]])
    end
  end

  describe '#my_transpose' do
    array = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]
    it 'transposes rows into columns' do
      expect(array.my_transpose).to eq([[0, 3, 6],[1, 4, 7],[2, 5, 8]])
    end

    it 'returns a two-dimensional array' do
      transposed = array.my_transpose
      expect(transposed[0]).to be_an(Array)
    end
  end
end

describe '#stock_picker' do
  stocks = [1.00, 1.50, 2.00, 1.75, 0.75]

  it 'outputs the most profitable pair of days (indices) to buy then sell' do
    expect(stock_picker(stocks)).to eq([0, 2])
  end

end
