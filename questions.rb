require 'sqlite3'
require 'singleton'

class QuestionsDatabase < SQLite3::Database
  include Singleton

  def initialize
    super('questions.db')
    self.type_translation = true
    self.results_as_hash = true
  end
end

class User
  attr_accessor :fname, :lname
  attr_reader :id

  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT * FROM users WHERE id = ?
    SQL

    return nil if data.empty?
    User.new(data.first)
  end

  def self.find_by_name(fname, lname)
    data = QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
      SELECT * FROM users WHERE fname = ? AND lname = ?
    SQL

    return nil if data.empty?
    User.new(data.first)
  end

  def initialize(options)
    @id = options['id']
    @fname = options['fname']
    @lname = options['lname']
  end

  def save
    unless id
      QuestionsDatabase.instance.execute(<<-SQL, @fname, @lname)
        INSERT INTO
          users (fname, lname)
        VALUES
          (?, ?)
      SQL
      @id = QuestionsDatabase.instance.last_insert_row_id
    else
      QuestionsDatabase.instance.execute(<<-SQL, @fname, @lname, @id)
        UPDATE
          users
        SET
          fname = ?, lname = ?
        WHERE
          id = ?
      SQL
    end
  end

  def authored_questions
    Question.find_by_author_id(id)
  end

  def authored_replies
    Reply.find_by_user_id(id)
  end

  def followed_questions
    QuestionFollow.followed_questions_for_user_id(id)
  end

  def liked_questions
    QuestionLike.liked_questions_for_user_id(id)
  end

  def average_karma
    user_Qs = authored_questions
    total_likes = 0

    user_Qs.each{|question| total_likes += QuestionLike.num_likes_for_question_id(question.id)}

    total_likes.fdiv(user_Qs.size)
  end
end

class Question
  attr_accessor :title, :body
  attr_reader :id, :author_id

  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT * FROM questions WHERE id = ?
    SQL

    return nil if data.empty?
    Question.new(data.first)
  end

  def self.find_by_author_id(author_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, author_id)
      SELECT * FROM questions WHERE author_id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| Question.new(datum) }
  end

  def self.most_liked(n)
    QuestionLike.most_liked_questions(n)
  end

  def self.most_followed(n)
    QuestionFollow.most_followed_questions(n)
  end

  def initialize(options)
    @id = options['id']
    @title = options['title']
    @body = options['body']
    @author_id = options['author_id']
  end

  def save
    unless id
      QuestionsDatabase.instance.execute(<<-SQL, @title, @body, @author_id)
        INSERT INTO
          questions (title, body, author_id)
        VALUES
          (?, ?, ?)
      SQL
      @id = QuestionsDatabase.instance.last_insert_row_id
    else
      QuestionsDatabase.instance.execute(<<-SQL, @title, @body, @id)
        UPDATE
          users
        SET
          title = ?, body = ?
        WHERE
          id = ?
      SQL
    end
  end

  def author
    User.find_by_id(author_id)
  end

  def replies
    Reply.find_by_user_id(author_id)
  end

  def followers
    QuestionFollow.followers_for_question_id(id)
  end

  def likers
    QuestionLike.likers_for_question_id(id)
  end

  def num_likes
    QuestionLike.num_likes_for_question_id(id)
  end


end

class Reply
  attr_accessor :body
  attr_reader :id, :user_id, :question_id, :parent_reply_id

  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT * FROM replies WHERE id = ?
    SQL

    return nil if data.empty?
    Reply.new(data.first)
  end

  def self.find_by_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT DISTINCT * FROM replies WHERE user_id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| Reply.new(datum) }
  end

  def self.find_by_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT DISTINCT * FROM replies WHERE question_id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| Reply.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @body = options['body']
    @user_id = options['user_id']
    @question_id = options['question_id']
    @parent_reply_id = options['parent_reply_id']
  end

  def save
    unless id
      QuestionsDatabase.instance.execute(<<-SQL, @body, @user_id, @question_id, @parent_reply_id)
        INSERT INTO
          replies (body, user_id, question_id, parent_reply_id)
        VALUES
          (?, ?, ?, ?)
      SQL
      @id = QuestionsDatabase.instance.last_insert_row_id
    else
      QuestionsDatabase.instance.execute(<<-SQL, @body, @id)
        UPDATE
          users
        SET
          body = ?
        WHERE
          id = ?
      SQL
    end
  end

  def author
    User.find_by_id(user_id)
  end

  def question
    Question.find_by_id(question_id)
  end

  def parent_reply
    Reply.find_by_id(parent_reply_id)
  end

  def child_replies
    data = QuestionsDatabase.instance.execute(<<-SQL, @id)
      SELECT DISTINCT * FROM replies WHERE parent_reply_id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| Reply.new(datum) }
  end
end

class QuestionLike
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT * FROM question_likes WHERE id = ?
    SQL

    return nil if data.empty?
    QuestionLike.new(data.first)
  end

  def self.likers_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT users.* FROM users JOIN question_likes
      ON question_likes.user_id = users.id WHERE question_likes.question_id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| User.new(datum) }
  end

  def self.num_likes_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT COUNT(users.id) FROM users JOIN question_likes
      ON question_likes.user_id = users.id WHERE question_likes.question_id = ?
    SQL

    return 0 if data.first.values.first == 0
    data.first.values.first
  end

  def self.liked_questions_for_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT questions.* FROM questions JOIN question_likes
      ON question_likes.question_id = questions.id WHERE question_likes.user_id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| Question.new(datum) }
  end

  def self.most_liked_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
      SELECT questions.* FROM questions JOIN question_likes
      ON questions.id = question_likes.question_id
      GROUP BY question_likes.question_id
      ORDER BY COUNT(question_likes.user_id) DESC LIMIT ?
    SQL

    return nil if n <= 0
    data.map { |datum| Question.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end

end

class QuestionFollow
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT * FROM question_follows WHERE id = ?
    SQL

    return nil if data.empty?
    QuestionFollow.new(data.first)
  end

  #Are both JOIN...ONs necessary?
  def self.followers_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT users.* FROM users JOIN question_follows ON
        users.id = question_follows.user_id JOIN questions ON
        question_follows.question_id = questions.id WHERE questions.id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| User.new(datum) }
  end

  #Is JOIN...ON necessary?!?!
  def self.followed_questions_for_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT DISTINCT questions.* FROM questions JOIN question_follows ON
        questions.id = question_follows.question_id WHERE question_follows.user_id = ?
    SQL

    return nil if data.empty?
    data.map { |datum| Question.new(datum) }
  end

  def self.most_followed_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
      SELECT questions.* FROM questions JOIN question_follows
      ON questions.id = question_follows.question_id
      GROUP BY question_follows.question_id
      ORDER BY COUNT(question_follows.user_id) DESC LIMIT ?
    SQL

    return nil if n <= 0
    data.map { |datum| Question.new(datum) }
  end



  def initialize(options)
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end

end
