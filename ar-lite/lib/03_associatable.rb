require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    @class_name.constantize
  end

  def table_name
    name = @class_name.downcase
    unless name[-1] == "y" && !( "aeiou".include?(name[-2]) )
      "#{name}s"
    else
      "#{name[0...-1]}ies"
    end
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    options[:primary_key] == nil ? @primary_key = :id : @primary_key = options[:primary_key]

    options[:foreign_key] == nil ? @foreign_key = "#{name}_id".to_sym : @foreign_key = options[:foreign_key]

    options[:class_name] == nil ? @class_name = name.camelcase : @class_name = options[:class_name]
  end
end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
    options[:primary_key] == nil ? @primary_key = :id : @primary_key = options[:primary_key]

    options[:foreign_key] == nil ? @foreign_key = "#{self_class_name.singularize.downcase}_id".to_sym : @foreign_key = options[:foreign_key]

    options[:class_name] == nil ? @class_name = name.singularize.camelcase : @class_name = options[:class_name]
  end
end

module Associatable #unclear instructions for this
  # Phase IIIb
  def belongs_to(name, options = {})
    p name
    p options

    options = BelongsToOptions.new(name.to_s, options)

    define_method(name) do
      options.model_class
        .where(options.primary_key => self.send(options.foreign_key)).first
    end
  end

  def has_many(name, options = {})
    p name
    p options

    options = HasManyOptions.new(name.to_s, self.name, options)

    define_method(name) do
      options.model_class
        .where(options.foreign_key => self.send(options.primary_key))
    end
  end

  def assoc_options
    # Wait to implement this in Phase IVa. Modify `belongs_to`, too.
  end
end

class SQLObject
  extend Associatable
end
