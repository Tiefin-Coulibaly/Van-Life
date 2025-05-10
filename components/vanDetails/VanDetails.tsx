"use client";

import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { IVanDetailsProps } from "@/types/vanDetailsProp";
import { Carousel } from "@material-tailwind/react";
import { useState } from "react";
import { handleBooking } from "@/app/lib/actions/bookingActions";
import BookingModal from "../payment/BookingModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const VanDetails = ({
  id,
  name,
  price,
  description,
  images,
  type,
  city,
  country,
  rating,
  available,
  features,
}: IVanDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diffDays, setDiffDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const { data: UserSession, update } = useSession();

  const handleOpenModal = () => {
    if (!UserSession) {
      router.push("/auth/signin");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const processBooking = async () => {
    handleCloseModal();
    const checkoutSession = await handleBooking(
      id,
      UserSession?.user.id!,
      name,
      description,
      images,
      price,
      startDate,
      endDate,
      diffDays,
      totalPrice,
    );

    if (checkoutSession) {
      window.location.href = checkoutSession.url!;
    } else {
      console.error("Failed to create booking session");
    }
  };

  return (
    <div className="mx-auto mb-10 max-w-5xl rounded-lg bg-white p-6 shadow-lg">
      {images.length > 1 ? (
        <Carousel
          className="relative h-[700px] w-full"
          autoplay={true}
          loop={true}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="h-full w-full rounded-lg object-cover"
            />
          ))}
        </Carousel>
      ) : (
        <div className="relative h-[700px] w-full">
          <Image
            src={images[0]}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Van Details Section */}
      <div className="mt-6">
        {/* Van Name */}
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>

        {/* Type, Rating & Availability */}
        <div className="mt-2 flex flex-wrap items-center justify-between">
          {/* Van Type Badge */}
          <span
            className={`rounded-lg px-3 py-1 text-sm font-semibold ${
              type === "Luxury"
                ? "bg-yellow-100 text-yellow-700"
                : type === "Rugged"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>

          {/* Rating */}
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
          <FaMapMarkerAlt className="mr-1 text-gray-500" /> {city}, {country}
        </p>

        {/* Price */}
        <p className="mt-3 text-xl font-bold text-gray-800">${price}/day</p>

        {/* Features Section */}
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

        {/* Booking Button (Disabled if Van is Unavailable) */}
        <button
          onClick={handleOpenModal}
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

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBooking={processBooking}
        name={name}
        price={price}
        vanId={id}
        setDiffDays={setDiffDays}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setTotalPrice={setTotalPrice}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default VanDetails;
