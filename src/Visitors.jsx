
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const getVisitors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "visitors"));
        const rawData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Normalize and filter valid dates
        const normalizedData = rawData
          .map((v) => {
            const dateObj = v.date?.toDate?.() || new Date(v.date);
            return isNaN(dateObj) ? null : { ...v, _dateObj: dateObj };
          })
          .filter(Boolean);

        // Group by Year-Month
        const groups = normalizedData.reduce((acc, visitor) => {
          const date = visitor._dateObj;
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(visitor);
          return acc;
        }, {});

        // Sort months descending
        const sortedMonthKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

        // Sort visitors inside each month group by ascending date
        const finalSorted = sortedMonthKeys.flatMap((monthKey) => {
          return groups[monthKey].sort((a, b) => a._dateObj - b._dateObj);
        });

        setVisitors(finalSorted);
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    };

    getVisitors();
  }, []);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-black">
        Visitor Records
      </h2>

      <p className="text-center text-gray-600 mb-6">
        Total Visitors:{" "}
        <span className="font-semibold text-black">{visitors.length}</span>
      </p>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full text-sm sm:text-base text-left border-collapse">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300">Name</th>
              <th className="py-3 px-4 border-b border-gray-300">Date</th>
              <th className="py-3 px-4 border-b border-gray-300">Department</th>
              <th className="py-3 px-4 border-b border-gray-300">Email</th>
              <th className="py-3 px-4 border-b border-gray-300">Phone</th>
              <th className="py-3 px-4 border-b border-gray-300">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map((visitor) => {
                const formattedDate = visitor._dateObj.toLocaleDateString();
                return (
                  <tr key={visitor.id} className="hover:bg-blue-50 transition-colors">
                    <td className="py-2 px-4 border-t border-gray-200">{visitor.name}</td>
                    <td className="py-2 px-4 border-t border-gray-200">{formattedDate}</td>
                    <td className="py-2 px-4 border-t border-gray-200">{visitor.department}</td>
                    <td className="py-2 px-4 border-t border-gray-200">{visitor.email}</td>
                    <td className="py-2 px-4 border-t border-gray-200">{visitor.phone}</td>
                    <td className="py-2 px-4 border-t border-gray-200">{visitor.purpose}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  No bookings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <Link
          to="/feedback"
          className="inline-block bg-blue-100 hover:bg-blue-100 text-black font-semibold py-2 px-4 rounded-full transition duration-200"
        >
          Go To Feedback
        </Link>
      </div>
    </div>
  );
};

export default Visitors;
