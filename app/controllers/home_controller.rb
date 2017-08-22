class HomeController < ApplicationController
  def index
    @providers = EggProvider.all.order(local_cd: "asc");
  end

end
