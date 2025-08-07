import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    getFeedbacks();
  }, []);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center text-black">
        Feedback Records
      </h2>

      <p className="text-center text-gray-600 mb-6">
        Total feedbacks:{" "}
        <span className="font-semibold text-black">{feedbacks.length}</span>
      </p>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              {[
                "Name",
                "Email",
                "Visited Before",
                "Expectations Met",
                "If Not, Why?",
                "Got Something",
                "Needed Assistance",
                "Satisfaction With Support",
                "Rating",
                "Would Recommend Hub",
                "Why",
                "Improvements",
                "Recommendations",
                "Comment",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium text-center min-w-[150px]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.name}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.email}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.visitedBefore}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.expectationsMet}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.ifNotWhy}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.gotSomething}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.neededAssistance}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.satisfactionWithSupport}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.rating}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.WouldYouRecommendHub}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.Why}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.improvements}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.recommendations}</td>
                  <td className="px-4 py-2 border border-gray-200 text-center">{item.comment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="py-6 text-center text-gray-500">
                  No feedbacks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-6 rounded-full transition duration-200"
        >
          Go To Bookings
        </Link>
      </div>
    </div>
  );
};

export default Feedback;
