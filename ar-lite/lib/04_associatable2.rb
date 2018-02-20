require_relative '03_associatable'

# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options
  def has_one_through(name, through_name, source_name)
    p name #of the method
    p through_name
    p source_name


    define_method(name) do
      p through_options = self.class.assoc_options[through_name]
      p source_options = through_options.model_class.assoc_options[source_name]

      foreign_key = self.send(through_options.foreign_key)

      result = DBConnection.execute(<<-SQL, foreign_key)
        SELECT
          #{source_options.table_name}.*
        FROM
          #{through_options.table_name}
        JOIN
          #{source_options.table_name} ON #{through_options.table_name}.#{source_options.foreign_key} = #{source_options.table_name}.#{source_options.primary_key}
        WHERE
          #{through_options.table_name}.#{through_options.primary_key} = ?
      SQL

      if result.empty?
        nil
      else
        source_options.model_class.new(result.first)
      end
    end
  end
end
