import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import Card from "../../Card";

const ReviewMetrics = ({ totalReview, averageRating, recentRating }) => {
  return (
    <Card
      className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm"
      content={
        <div>
          <div className="flex items-center justify-between">
            <div className="text-purple-600">
              <StarIcon className="h-8 w-8" />
            </div>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-900">
            {averageRating}
          </h3>
          <p className="text-sm font-medium text-gray-600">Average Rating</p>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>{totalReview} reviews</span>
            <span>Recent: {recentRating}</span>
          </div>
        </div>
      }
    />
  );
};

export default ReviewMetrics;
