import Image from "next/image";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { VanCardProps } from "@/types/vanProp";


const VanCard: React.FC<VanCardProps> = ({ name, price, type, location, rating, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <div className="relative w-full h-56">
        <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600 flex items-center">
            <FaMapMarkerAlt className="mr-1 text-gray-500" /> {location.city}, {location.country}
          </span>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-lg ${
              type === "luxury"
                ? "bg-yellow-100 text-yellow-700"
                : type === "rugged"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-800">${price}/day</span>
          <span className="flex items-center text-sm text-gray-600">
            <FaStar className="text-yellow-500 mr-1" /> {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VanCard;
