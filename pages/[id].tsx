import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";
import { PropertyProps } from "@/interfaces";
import ReviewSection from "@/components/property/ReviewSection";

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Extracts 'id' from the URL path /[id]
  
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      // router.query.id might be undefined on the first render
      if (!id) return;

      try {
        setLoading(true);
        // GET request using the specific property ID
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError("Could not find property details.");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // Re-run whenever the ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">{error || "Property not found"}</p>
        <button 
          onClick={() => router.push("/")}
          className="mt-4 text-blue-600 underline"
        >
          Return to listings
        </button>
      </div>
    );
  }

  return (
    <>
      <PropertyDetail property={property} />
      <ReviewSection propertyId={id as string} />
    </>
  );
}