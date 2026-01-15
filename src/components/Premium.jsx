import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function Premium() {
  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      console.log(order.data);
      const { keyId, amount, currency, notes, orderId } = order.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits.
        currency: currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {}
  };
  return (
    <div className="w-full min-h-screen bg-base-300 text-base-content flex flex-col items-center py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-3">
        Upgrade to <span className="text-primary">Premium</span>
      </h1>
      <p className="text-gray-400 mb-12 text-center">
        Unlock exclusive features and get the best DevTinder experience 🚀
      </p>

      {/* Cards Wrapper */}
      <div className="w-full flex justify-center">
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl px-6">
          {/* Silver Card */}
          <div className="card bg-base-100 shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-2xl">🥈 Silver Membership</h2>
                <span className="badge badge-info badge-outline">Popular</span>
              </div>

              <ul className="mt-4 space-y-3 text-gray-300">
                <li>💬 Chat with connections</li>
                <li>🔵 Blue tick verification</li>
                <li>⏳ Valid for 3 months</li>
                <li>📨 50 requests per day</li>
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-3xl font-bold text-info">₹499</p>
                <button
                  className="btn btn-info btn-outline"
                  onClick={() => handleBuyClick("silver")}
                >
                  Choose Silver
                </button>
              </div>
            </div>
          </div>

          {/* Gold Card */}
          <div className="card bg-gradient-to-br from-yellow-500/20 to-orange-500/10 shadow-2xl border border-yellow-500 hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute -top-4 right-4 badge badge-warning">
              Best Value
            </div>

            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-2xl text-yellow-400">
                  🥇 Gold Membership
                </h2>
                <span className="badge badge-warning badge-outline">
                  Premium
                </span>
              </div>

              <ul className="mt-4 space-y-3 text-gray-200">
                <li>💬 Chat with connections</li>
                <li>🔵 Blue tick verification</li>
                <li>⏳ Valid for 1 year</li>
                <li>🔥 Unlimited requests per day</li>
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-3xl font-bold text-warning">₹799</p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleBuyClick("gold")}
                >
                  Choose Gold
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
