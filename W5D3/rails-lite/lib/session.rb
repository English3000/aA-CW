require 'json'
require 'byebug'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    # debugger
    @app_name = '_rails_lite_app'

    if req.cookies[@app_name]
      @cookie = JSON.parse(req.cookies[@app_name])#.to_json
    else
      @cookie = {}
    end
    # req.set_cookie
  end

  def [](key)
    # debugger
    @cookie[key]
  end

  def []=(key, val)
    @cookie[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    # debugger
    res.set_cookie(@app_name, path: '/', value: @cookie.to_json)
  end
end
