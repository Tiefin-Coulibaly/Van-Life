import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { IVanDetailsProps } from "@/types/vanDetailsProp";

const VanDetails: React.FC<IVanDetailsProps> = ({
  name,
  price,
  description,
  images,
  type,
  location,
  rating,
  available,
  features,
}) => {
  return (
    <div className="mx-auto mb-10 max-w-5xl rounded-lg bg-white p-6 shadow-lg">
      {/* Image Section */}
      <div className="relative h-96 w-full">
        <Image
          src={images[0]}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Van Details */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>

        {/* Type, Rating & Availability */}
        <div className="mt-2 flex flex-wrap items-center justify-between">
          <span
            className={`rounded-lg px-3 py-1 text-sm font-semibold ${
              type === "luxury"
                ? "bg-yellow-100 text-yellow-700"
                : type === "rugged"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>

          <span className="flex items-center text-sm text-gray-600">
            <FaStar className="mr-1 text-yellow-500" /> {rating} / 5
          </span>

          {/* Availability Badge */}
          <span
            className={`flex items-center rounded-lg px-3 py-1 text-sm font-semibold ${
              available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {available ? (
              <>
                <FaCheckCircle className="mr-1 text-green-600" /> Available
              </>
            ) : (
              <>
                <FaExclamationTriangle className="mr-1 text-red-600" /> Not
                Available
              </>
            )}
          </span>
        </div>

        {/* Location */}
        <p className="mt-2 flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-1 text-gray-500" /> {location.city},{" "}
          {location.country}
        </p>

        {/* Price */}
        <p className="mt-3 text-xl font-bold text-gray-800">${price}/day</p>

        {/* Features */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Features</h2>
          {features && (
            <ul className="mt-2 grid grid-cols-2 gap-4 text-gray-700">
              <li>
                Seats: <span className="font-semibold">{features.seats}</span>
              </li>
              <li>
                Sleeping Capacity:{" "}
                <span className="font-semibold">
                  {features.sleepingCapacity}
                </span>
              </li>
              <li className="flex items-center">
                {features.hasKitchen ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Kitchen
              </li>
              <li className="flex items-center">
                {features.hasToilet ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Toilet
              </li>
              <li className="flex items-center">
                {features.hasAC ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Air Conditioning
              </li>
              <li className="flex items-center">
                {features.hasHeating ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Heating
              </li>
              <li className="flex items-center">
                {features.petFriendly ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Pet-Friendly
              </li>
            </ul>
          )}
        </div>

        {/* Description */}
        <p className="mt-6 text-gray-700">{description}</p>

        {/* Booking Button (Disabled if Not Available) */}
        <button
          className={`mt-6 w-full rounded-lg py-3 text-lg font-semibold transition ${
            available
              ? "bg-black text-white hover:bg-gray-900"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
          disabled={!available}
        >
          {available ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default VanDetails;
