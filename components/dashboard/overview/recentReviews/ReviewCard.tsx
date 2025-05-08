import { determineHowManyDaysAgo } from "@/app/lib/actions/dashboardActions";
import { ReviewWithVan } from "@/types/review";
import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { JSX } from "react";

const ReviewCard = ({ review }: { review: ReviewWithVan }) => {
  let starIcons: JSX.Element[] = [];
  for (let i = 0; i < review.rating; i++) {
    starIcons.push(<StarIcon key={i} className="h-3 w-3 fill-current" />);
  }

  const diffDays = determineHowManyDaysAgo(review.createdAt);

  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="flex items-center ">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          {review.van?.images?.[0] && (
            <Image
              src={review.van.images[0]}
              alt={review.van.name || "Van Image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 64px"
            />
          )}
        </div>
        <div className="ml-3 flex flex-1  flex-col">
          <div className="flex items-center ">
            {starIcons.length > 0 && (
              <div className="flex items-center text-amber-400">
                {starIcons}
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
          <p className="mt-1 text-xs text-gray-500">
            {review.van.name} • {diffDays} days ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
