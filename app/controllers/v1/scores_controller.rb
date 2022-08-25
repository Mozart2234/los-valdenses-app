class V1::ScoresController < V1::BaseController
  def create
    score = current_user.scores.new(score_params)
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
      :event_1,
      :event_2,
      :event_3,
      :initial_formation,
      :unit_corner_formation,
      :progressive_classes_formation,
      :specialties_formation,
      :events_formation,
      :final_formation,
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
