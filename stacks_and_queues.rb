class MyQueue
  def initialize
    @store = []
  end

  def enqueue(el)
    @store.push(el)
  end

  def dequeue
    @store.shift
  end

  def peek
    @store.first
  end

  def size
    @store.size
  end

  def empty?
    @store.empty?
  end
end


class MyStack
  def initialize
    @store = []
    @values = Hash.new(0)
    #peek
  end

  def push(el)
    @store << el
    @values[el] += 1
  end

  def pop
    el = @store.pop
    @values[el] -= 1
  end

  def max
    @values.max_by { |k, v| k if v > 0}.first
  end

  def min
    @values.min_by { |k, v| k if v > 0}.first
  end

  def peek
    @store.last
  end

  def size
    @store.size
  end

  def empty?
    @store.empty?
  end
end


class StackQueue < MyStack
  def initialize
    @stack = MyStack.new
    @temp_stack = MyStack.new
  end

  def enqueue(el)
    @stack.push(el)
  end

  def dequeue
    @temp_stack.push(@stack.pop) until @stack.empty?
    @temp_stack.pop
    @stack.push(@temp_stack.pop) until @temp_stack.empty?
  end

  def size
    @stack.size
  end

  def empty?
    @stack.empty?
  end
end

class MinMaxStackQueue < MyStack#Queue
  # def initialize
  #   @stack = MyStack.new
  # end

  def enqueue(el)
    @values[el] += 1
    @store.push(el)
  end

  def dequeue
    # to_delete = @stack.first
    @values[@store.first] -= 1
    @store.delete_at(0)
  end

  # def max
  #
  # end
  #
  # def min
  #
  # end
end
