# Implement a queue with #enqueue and #dequeue, as well as a #max API,
# a method which returns the maximum element still in the queue. This
# is trivial to do by spending O(n) time upon dequeuing.
# Can you do it in O(1) amortized? Maybe use an auxiliary storage structure?

# Use your RingBuffer to achieve optimal shifts! Write any additional
# methods you need.

require_relative 'ring_buffer'

class QueueWithMax
  attr_accessor :store

  def initialize
    @store = RingBuffer.new
    @max = RingBuffer.new
  end

  def enqueue(val)
    @store.push(val)
    if @max.length > 0
      @max.push(val) if val > @max[@max.length - 1]
    else
      @max.push(val)
    end
  end

  def dequeue
    val = @store.shift

    new_max = RingBuffer.new
    i = 0
    while i < @max.length
      new_max.push(@max[i]) if @max[i] > val
      i += 1
    end

    @max = new_max
    val
  end

  def max
    if @max.length == 0
      @max.push(@store[0])
      i = 1
      while i < @store.length
        @max.push(@store[i]) if @store[i] > @max[@max.length - 1]
        i += 1
      end
    end
    @max[@max.length - 1]
  end

  def length
    @store.length
  end

end
