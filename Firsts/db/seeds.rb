# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
user1 = User.create(username: 'hydroflask')
user2 = User.create(username: 'red_mug')
user3 = User.create(username: 'chocolate_raisin')
user4 = User.create(username: 'sunglasses')

Artwork.destroy_all
artwork1 = Artwork.create(
  title: 'korgi',
  image_url: 'https://i.pinimg.com/736x/5f/72/b0/5f72b0e9b3a92404f145acbc3fba8b60--corgi-puppies-puppy.jpg',
  artist_id: user1.id
)
artwork2 = Artwork.create(
  title: 'cat',
  image_url: 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg',
  artist_id: user2.id
)
artwork3 = Artwork.create(
  title: 'lion',
  image_url: 'http://i0.kym-cdn.com/photos/images/original/000/895/441/442.jpg',
  artist_id: user3.id
)
artwork4 = Artwork.create(
  title: 'hippopotamus',
  image_url: 'http://blog.cincinnatizoo.org/wp-content/uploads/pooltime_lo2-635x440.jpg',
  artist_id: user4.id
)

ArtworkShare.destroy_all
ArtworkShare.create(viewer_id: user1.id, artwork_id: artwork2.id)
ArtworkShare.create(viewer_id: user3.id, artwork_id: artwork2.id)
ArtworkShare.create(viewer_id: user4.id, artwork_id: artwork2.id)
ArtworkShare.create(viewer_id: user2.id, artwork_id: artwork1.id)
ArtworkShare.create(viewer_id: user3.id, artwork_id: artwork1.id)
ArtworkShare.create(viewer_id: user1.id, artwork_id: artwork3.id)
ArtworkShare.create(viewer_id: user1.id, artwork_id: artwork4.id)

Comment.destroy_all
cmt1 = Comment.create(
  body: "Beautiful, period.",
  artwork_id: artwork1.id,
  user_id: user1.id
)
cmt2 = Comment.create(
  body: "Where is this going?????",
  artwork_id: artwork2.id,
  user_id: user3.id
)
cmt3 = Comment.create(
  body: "FIRST!",
  artwork_id: artwork2.id,
  user_id: user4.id
)
cmt4 = Comment.create(
  body: "This is the most beautiful lion I've ever seen...",
  artwork_id: artwork3.id,
  user_id: user2.id
)
cmt5 = Comment.create(
  body: "All I want for christmas...",
  artwork_id: artwork4.id,
  user_id: user4.id
)
cmt6 = Comment.create(
  body: "Notice: This artwork is a violation of the DMCA. You have 24 hours to delete this, or we'll see you in court!",
  artwork_id: artwork3.id,
  user_id: user1.id
)
