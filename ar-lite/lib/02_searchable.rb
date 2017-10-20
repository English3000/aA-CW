require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    where_sql = "SELECT * FROM #{self.table_name} WHERE "
    where_sql += params.map {|key, value| "#{key} = '#{value}'"}.join(" AND ")

    results = DBConnection.execute(where_sql)

    unless results.empty?
      results.map { |hash| self.new(hash) }
    else
      []
    end
  end
end


class SQLObject
  extend Searchable
end
