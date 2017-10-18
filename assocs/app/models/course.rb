class Course < ApplicationRecord
  has_many :enrollments,
  class_name: :Enrollment,
  primary_key: :id,
  foreign_key: :course_id

  has_many :enrolled_students,
  through: :enrollments,
  source: :student

  has_many :prerequisite,
  class_name: :Course,
  primary_key: :id,
  foreign_key: :prereq_id

  has_many :instructor,
  class_name: :User,
  primary_key: :id,
  foreign_key: :instructor_id

end
