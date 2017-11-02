require 'pry'
require 'rack'

app = Proc.new do |env|
  request = Rack::Request.new(env)
  response = Rack::Response.new

  # pry.binding

  response['Content-Type'] = 'text/html'
  response.write("#{request.path}")
  response.finish
end

Rack::Server.start(
  app: app,
  Port: 3000
)
