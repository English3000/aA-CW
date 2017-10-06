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

end
