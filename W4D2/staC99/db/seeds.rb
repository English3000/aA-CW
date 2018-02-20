# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  Cat.destroy_all

  cat1 = Cat.create(birth_date: '2015/01/20',
    color: 'black',
    name: 'Jamie',
    sex: 'F',
    description: 'domestic short-haired'
  )

  cat2 = Cat.create(birth_date: '2014/01/20',
    color: 'calico',
    name: 'Thomas',
    sex: 'M',
    description: 'mutt'
  )

  cat3 = Cat.create(birth_date: '2012/01/20',
    color: 'white',
    name: 'Snooky',
    sex: 'F',
    description: 'Burmese'
  )

  cat4 = Cat.create(birth_date: '2005/01/20',
    color: 'brown',
    name: 'Querido',
    sex: 'M',
    description: 'Siamese'
  )
  cat5 = Cat.create(birth_date: '1999/01/20',
    color: 'gray',
    name: 'Oldie',
    sex: 'F',
    description: 'domestic long-haired'
  )

  CatRentalRequest.destroy_all

  cr1 = CatRentalRequest.create(cat_id: cat1.id,
    start_date: '2017/10/20',
    end_date: '2017/10/24',
    status: 'APPROVED'
  )

  cr2 = CatRentalRequest.create(cat_id: cat2.id,
    start_date: '2017/06/12',
    end_date: '2017/06/16',
    status: 'DENIED'
  )

  cr3 = CatRentalRequest.create(cat_id: cat3.id,
    start_date: '2017/01/02',
    end_date: '2017/07/06',
    status: 'PENDING'
  )

  cr4 = CatRentalRequest.create(cat_id: cat4.id,
    start_date: '2017/12/25',
    end_date: '2040/12/02',
    status: 'DENIED'
  )

  cr5 = CatRentalRequest.create(cat_id: cat5.id,
    start_date: '2017/11/25',
    end_date: '2020/06/02',
    status: 'PENDING'
  )
end
