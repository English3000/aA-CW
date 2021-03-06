require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require 'active_support/inflector'
require 'byebug'

class ControllerBase
  # include ActiveSupport#/inflector
  attr_reader :req, :res, :params, :already_built_response

  # Setup the controller
  def initialize(request, response, params = {})
    # debugger
    @req = request
    @res = response
    @params = params
    @already_built_response = false
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    # debugger
    # raise "double-render error" if @already_built_response
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    session.store_session(@res)

    @res['Location'] = url
    @res.status = 302

    raise "double-render error" if already_built_response?
    @already_built_response = true
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    session.store_session(@res)

    @res['Content-Type'] = content_type
    @res.write("#{content}")
    @res.finish

    raise "double-render error" if already_built_response?
    @already_built_response = true
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    path = "views/#{self.class.to_s.underscore}/#{template_name.to_s}.html.erb"

    body = File.read(path)

    template = ERB.new(body).result(binding)

    render_content(template, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    self.send(name)
    # self.render(name)
  end
end
