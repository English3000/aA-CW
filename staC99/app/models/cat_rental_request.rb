class CatRentalRequest < ApplicationRecord
  validates :cat_id, :start_date, :end_date, presence: true
  validates :status, presence: true, inclusion: {in: %w(PENDING APPROVED DENIED)}

  belongs_to :cat


  def overlapping_approved_requests
    self.overlapping_requests.where('status != ?', 'APPROVED') #check if request status is approved
  end

  def overlapping_requests
    CatRentalRequest.where('cat_id = ?', cat_id).where(
      '? BETWEEN start_date AND end_date OR
      ? BETWEEN start_date AND end_date', self.start_date, self.end_date)
  end

  def does_not_overlap_approved_request
    !overlapping_approved_requests.exists?
  end
end
