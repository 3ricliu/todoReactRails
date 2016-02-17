class Api::TodeauxesController < ApplicationController
  def index
    render json: Todeaux.all
  end

  def create
    # debugger
    todeaux = Todeaux.create!(todeaux_params)
    render json: todeaux
  end

  def update
    todeaux = Todeaux.find_by_id(params[:id])
    todeaux.update_attributes!(todeaux_params)
    render json: todeaux
  end

  def destroy
    todeaux = Todeaux.find_by_id(params[:id])
    todeaux.destroy!
    render json: todeaux
  end

  private
  def todeaux_params
    params.permit(:title, :body, :done)
    # require(:todeaux)
  end
end
