import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const { username, reviewText, rating } = req.body;
  const newReview = new Review({ 
    productId: tourId,
    username,
    reviewText,
    rating
  });

  try {
    console.log('New review data:', newReview);
    const savedReview = await newReview.save();
    console.log('Review saved:', savedReview);

    const tour = await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id }
    });

    if (!tour) {
      console.error('Tour not found:', tourId);
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review submitted',
      data: savedReview
    });
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to submit review'
    });
  }
};