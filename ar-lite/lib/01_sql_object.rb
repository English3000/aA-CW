require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    return @columns if @columns

    results = DBConnection.execute2(<<-SQL)
      SELECT
        *
      FROM
        #{self.table_name}
    SQL

    @columns = results.first.map { |col| col.to_sym }
  end

  def self.finalize!
    return nil unless self.columns #class-lv

    @columns.each do |col_method|
      define_method(col_method) do
        self.attributes[col_method] #class-lv
      end

      define_method("#{col_method}=") do |value|
        self.attributes[col_method] = value
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name = "#{self}s".downcase
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      SELECT
        #{self.table_name}.*
      FROM
        #{self.table_name}
    SQL

    self.parse_all(results)
  end

  def self.parse_all(results)
    results.map do |hash|
      self.new(hash)
    end
  end

  def self.find(id)
    result = DBConnection.execute(<<-SQL)
      SELECT
        *
      FROM
        #{self.table_name}
      WHERE
        #{self.table_name}.id = #{id}
    SQL

    if result.empty?
      nil
    else
      self.new(result.first)
    end
  end

  def initialize(params = {})
    params.each do |column, value|
      unless self.class.columns.include?(column.to_sym)
        raise "unknown attribute '#{column}'"
      else
        self.send("#{column}=", value)
      end
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    @attributes.values
  end

  def insert
    col_names = self.class.columns.drop(1)

    question_marks = []
    col_names.size.times {question_marks << "?"}
    question_marks = question_marks.join(", ")

    col_names = col_names.join(", ")
    attr_values = self.attribute_values#.drop(1)

    DBConnection.execute(<<-SQL, *attr_values)
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{question_marks})
    SQL

    self.id = DBConnection.last_insert_row_id
  end

  def update
    col_names = self.class.columns.drop(1) #could make into a helper method

    setters = []
    col_names.each do |col|
      setters << "#{col} = ?"
    end

    attr_values = self.attribute_values.drop(1)

    DBConnection.execute(<<-SQL, *attr_values)
      UPDATE
        #{self.class.table_name}
      SET
        #{setters}
      WHERE
        #{self.class.table_name}.id = #{self.id}
    SQL
  end

  def save
    if self.id
      self.update
    else
      self.insert
    end
  end
end
