import { PropertyCardProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

const PropertyCard: React.FC<PropertyCardProps> = ({ id, property }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48 w-full">
        <Image 
          src={property.image || "/assets/Home/heroSection.png"} 
          alt={property.name} 
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{property.name}</h3>
        <p className="text-gray-600 text-sm">{property.address.city}, {property.address.country}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 font-semibold">${property.price} / night</span>
          <span className="flex items-center text-sm">
            ⭐ {property.rating}
          </span>
        </div>
        <Link href={`/property/${property.id}`}>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;