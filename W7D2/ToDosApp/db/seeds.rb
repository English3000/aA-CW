# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Todo.create(title: "test1", body: "test-body", done: false)
Todo.create(title: "test2", body: "test", done: false)
Todo.create(title: "test3", body: "test-other", done: true)
