def what_was_that_one_with(those_actors)
  # Find the movies starring all `those_actors` (an array of actor names).
  # Show each movie's title and id.
  Movie.select(:title, :id).joins(:actors).where('actors.name IN (?)', those_actors).group(:id).having('COUNT(*) > 1')
end

def golden_age
  # Find the decade with the highest average movie score.
  Movie.select( '(yr/10 * 10) AS decade, AVG(score)' ).group('decade').order('AVG(score) DESC').first.decade
  # AVG the SUM of movies.score by movies.yr for 10 consecutive yrs; order by AVG DESC; limit 1
end

def costars(name)
  # List the names of the actors that the named actor has ever
  # appeared with.
  # Hint: use a subquery
  Actor.joins(:movies)
    .where("actors.name IN (
      SELECT actors.name
      FROM actors
      WHERE actors.id = castings.actor_id
    )").pluck(:name) #same movie_id
    # .where("movies.id IN (SELECT movies.*
    #   FROM movies
    #   JOIN castings ON castings.movie_id = movies.id
    #   JOIN actors ON castings.actor_id = actors.id
    #   WHERE actors.name = '#{name}')")
end

def actor_out_of_work
  #left outer join count nil
  # Find the number of actors in the database who have not appeared in a movie
  Actor.joins('LEFT OUTER JOIN castings ON actors.id = castings.actor_id')
    .group('castings.actor_id').having('COUNT(castings.actor_id) IS NULL').count
  # Actor.joins(:castings)
  # .group(:id)
  # .having('COUNT(actors.id) = 0')
  # .pluck(:id)
  # .count
end

def starring(whazzername)
  # Find the movies with an actor who had a name like `whazzername`.
  # A name is like whazzername if the actor's name contains all of the
  # letters in whazzername, ignoring case, in order.

  # ex. "Sylvester Stallone" is like "sylvester" and "lester stone" but
  # not like "stallone sylvester" or "zylvester ztallone"
  Movie.select('*').joins(:actors).where("actors.name LIKE '%#{whazzername}'", whazzername)
end

def longest_career
  # Find the 3 actors who had the longest careers
  # (the greatest time between first and last movie).
  # Order by actor names. Show each actor's id, name, and the length of
  # their career.
  # Actor
end
