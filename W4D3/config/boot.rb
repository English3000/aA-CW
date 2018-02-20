<<<<<<< HEAD
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)
=======
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)
>>>>>>> 851ce0a06a38d747060dbf65d2856f4339d657c9

require 'bundler/setup' # Set up gems listed in the Gemfile.
