class PolyTreeNode

  def initialize(value)
    @value = value
    @parent = nil
    @children = []
  end

  def parent
    @parent#.dup
  end

  def parent=(node)
    #self.parent.children.delete(self)
    @parent = node
    unless node.nil? || node.children.include?(self)
      node.children << self
    end
  end

  def add_child(node)
    @children << node unless @children.include?(node)
  end

  def remove_child(node)
    @children.delete(node)
  end


  def children
    @children
  end

  def value
    @value#.dup
  end

end
