require 'json'

class Flash
  def initialize(req) #added to request, then cleared
    debugger
    @app_name = '_rails_lite_app'

    @flash = {}
    @flash['path'] = req.path
    @flash['action'] = req.request_method
    @temp_flash
  end
end
