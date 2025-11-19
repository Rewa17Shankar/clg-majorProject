// import { useEffect, useState } from "react";
// import { addReview, getAllReviews } from "../../api/MANAGER/performanceApi";

// export default function Performance() {
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({
//     user_id: "",
//     reviewer_id: "", // manager id
//     rating: "",
//     feedback: "",
//   });

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       const data = await getAllReviews();
//       setReviews(data);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addReview(newReview);
//       setNewReview({ user_id: "", reviewer_id: "", rating: "", feedback: "" });
//       fetchReviews();
//     } catch (err) {
//       console.error("Error adding review:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Performance Reviews</h2>

//       {/* Add Review Form */}
//       <form onSubmit={handleSubmit} className="mb-6 space-y-3">
//         <input
//           type="text"
//           placeholder="Employee User ID"
//           value={newReview.user_id}
//           onChange={(e) =>
//             setNewReview({ ...newReview, user_id: e.target.value })
//           }
//           className="border p-2 w-full"
//         />
//         <input
//           type="text"
//           placeholder="Reviewer ID (Manager)"
//           value={newReview.reviewer_id}
//           onChange={(e) =>
//             setNewReview({ ...newReview, reviewer_id: e.target.value })
//           }
//           className="border p-2 w-full"
//         />
//         <input
//           type="number"
//           placeholder="Rating (1-5)"
//           value={newReview.rating}
//           onChange={(e) =>
//             setNewReview({ ...newReview, rating: e.target.value })
//           }
//           className="border p-2 w-full"
//         />
//         <textarea
//           placeholder="Feedback"
//           value={newReview.feedback}
//           onChange={(e) =>
//             setNewReview({ ...newReview, feedback: e.target.value })
//           }
//           className="border p-2 w-full"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Submit Review
//         </button>
//       </form>

//       {/* Reviews List */}
//       <div>
//         <h3 className="font-semibold mb-2">All Reviews</h3>
//         <ul className="space-y-2">
//           {reviews.map((r) => (
//             <li key={r.id} className="border p-3 rounded">
//               <p>
//                 <strong>Employee:</strong> {r.user?.username || r.user_id}
//               </p>
//               <p>
//                 <strong>Reviewer:</strong> {r.reviewer?.username || r.reviewer_id}
//               </p>
//               <p>
//                 <strong>Rating:</strong> {r.rating}
//               </p>
//               <p>
//                 <strong>Feedback:</strong> {r.feedback}
//               </p>
//               <p className="text-sm text-gray-500">
//                 {new Date(r.review_date).toLocaleDateString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { addReview, getAllReviews } from "../../api/MANAGER/performanceApi";

export default function Performance() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user_id: "",
    reviewer_id: "",
    rating: "",
    feedback: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(newReview);
      setNewReview({ user_id: "", reviewer_id: "", rating: "", feedback: "" });
      fetchReviews();
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-500/20 text-green-300 border-green-500/30";
    if (rating >= 3) return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    if (rating >= 2) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-red-500/20 text-red-300 border-red-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Performance Reviews</h2>
          <p className="text-gray-400 text-sm">
            Evaluate and track employee performance
          </p>
        </div>

        {/* Add Review Form */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-6">Submit Performance Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Employee User ID"
                value={newReview.user_id}
                onChange={(e) => setNewReview({ ...newReview, user_id: e.target.value })}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Reviewer ID (Manager)"
                value={newReview.reviewer_id}
                onChange={(e) => setNewReview({ ...newReview, reviewer_id: e.target.value })}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
                required
              />
            </div>
            <textarea
              placeholder="Feedback"
              value={newReview.feedback}
              onChange={(e) => setNewReview({ ...newReview, feedback: e.target.value })}
              rows="4"
              className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-150"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">All Reviews</h3>
          {reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No reviews submitted yet</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="bg-gray-700/30 border border-gray-700/50 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-medium">
                        Employee: {r.user?.username || `ID: ${r.user_id}`}
                      </p>
                      <p className="text-sm text-gray-400">
                        Reviewer: {r.reviewer?.username || `ID: ${r.reviewer_id}`}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRatingColor(r.rating)}`}>
                      ⭐ {r.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{r.feedback}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(r.review_date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
