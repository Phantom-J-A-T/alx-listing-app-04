import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}

const ReviewSection = ({ propertyId }: { propertyId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;

      try {
        setLoading(true);
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        setError("Unable to load reviews at this time.");
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <div className="py-10 text-center text-gray-500">Loading guest reviews...</div>;
  }

  if (error) {
    return <div className="py-10 text-center text-red-400">{error}</div>;
  }

  return (
    <div className="mt-12 border-t pt-10">
      <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
      
      {reviews.length === 0 ? (
        <p className="text-gray-500 italic">No reviews yet for this property.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center mb-3">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={review.user.avatar || "/assets/default-avatar.png"}
                    alt={review.user.name}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{review.user.name}</h4>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex text-yellow-500 mb-2">
                {"★".repeat(review.rating)}
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;