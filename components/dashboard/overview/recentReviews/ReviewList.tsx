import { ReviewWithVan } from "@/types/review";
import ReviewCard from "./ReviewCard";
import { getRecentElements } from "@/app/lib/actions/dashboardActions";

const ReviewList = ({ reviews }: { reviews: ReviewWithVan[] }) => {
  const recentReviews = getRecentElements(reviews, "createdAt", 3);
  const reviewCards = recentReviews.map((review) => (
    <ReviewCard key={review.id} review={review} />
  ));

  return (
    <>
      {reviewCards.length > 0 ? (
        reviewCards
      ) : (
        <div className="flex min-h-[120px] w-full items-center justify-center overflow-hidden">
          <p className="text-gray-500">No reviews</p>
        </div>
      )}
    </>
  );
};

export default ReviewList;
