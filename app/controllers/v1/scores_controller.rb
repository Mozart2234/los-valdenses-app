class V1::ScoresController < V1::BaseController
  def create
    score = Score.new(score_params)

    if score.save
      render json: score, serializer: ScoreSerializer, status: :created
    else
      render json: score.errors, status: :bad_request
    end
  end

  def index
    scores = Score.all

    render json: scores, each_serializer: ScoreSerializer
  end

  private

  def score_params
    params.require(:score).permit(
      :pathfinder,
      :counselor,
      :flag,
      :uniform,
      :bible_study,
      :formation_1,
      :formation_2,
      :formation_3,
      :bonus,
      :small_fault,
      :moderate_fault,
      :serious_fault,
      :favor_score,
      :points_against,
      :total,
      :group_id,
      :date_at
    )
  end
end
