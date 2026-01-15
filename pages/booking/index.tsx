import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function BookingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Client-side Validation
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // POSTing the data to the API endpoint
      const response = await axios.post("/api/bookings", formData);
      
      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        // Redirect to a success page after a short delay
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (err) {
      setError("Failed to submit booking. Please check your payment details.");
      console.error("Booking Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <h2 className="text-3xl font-bold text-green-700">Booking Confirmed!</h2>
        <p className="mt-2">Redirecting you to the home page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input 
            name="firstName" placeholder="First Name" required 
            onChange={handleChange} className="border p-2 rounded" 
          />
          <input 
            name="lastName" placeholder="Last Name" required 
            onChange={handleChange} className="border p-2 rounded" 
          />
        </div>
        <input 
          name="email" type="email" placeholder="Email" required 
          onChange={handleChange} className="w-full border p-2 rounded" 
        />
        
        {/* Payment Section */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
          <input 
            name="cardNumber" placeholder="Card Number" required 
            onChange={handleChange} className="w-full border p-2 rounded mb-2" 
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              name="expirationDate" placeholder="MM/YY" required 
              onChange={handleChange} className="border p-2 rounded" 
            />
            <input 
              name="cvv" placeholder="CVV" required 
              onChange={handleChange} className="border p-2 rounded" 
            />
          </div>
        </div>

        {error && <p className="text-red-500 font-medium">{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-bold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>
    </div>
  );
}