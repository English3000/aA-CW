class PolyTreeNode

  def initialize(value)
    @value = value
    @parent = nil
    @children = []
  end

  def parent
    @parent
  end

  def parent=(node)
    @parent.children.delete(self) unless @parent.nil?
    @parent = node
    unless node.nil? || node.children.include?(self)
      node.children << self
    end
  end

  def add_child(node)
    @children << node unless @children.include?(node)
    node.parent = self
  end

  def remove_child(node)
    raise "Not a child!" unless @children.include?(node)
    node.parent = nil
    @children.delete(node)
  end

  def children
    @children
  end

  def value
    @value
  end

  def dfs(target_value)
    return self if value == target_value
    children.each do |child|
      result = child.dfs(target_value)
      return result unless result.nil?
    end
    nil
  end

  def bfs(target_value)
    que = [self]
    until que.empty?
      node = que.shift
      return node if node.value == target_value
      que += node.children
    end
    nil
  end

end
