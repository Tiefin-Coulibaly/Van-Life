import { StarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import SectionHeader from "../SectionHeader";
import { ReviewWithVan } from "@/types/review";
import ReviewCard from "./ReviewCard";
import ReviewList from "./ReviewList";


const recentReviews = ({reviews}:{reviews:ReviewWithVan[]}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <SectionHeader title="Recent Reviews" />
      <div className="space-y-4">
        <ReviewList reviews={reviews}/>
      </div>
    </div>
  );
};

export default recentReviews;
