class HomeController < ApplicationController
  def index
    @providers = EggProvider.all.order(local_code: "asc");
  end
end
