import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

const Visitors= () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const getVisitors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "visitors"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched visitors:", data);
        setVisitors(data);
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    };

    getVisitors();
  }, []);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-blue-700">
        Visitor Records
      </h2>

    
      <p className="text-center text-gray-600 mb-6">
        Total Visitors:{" "}
        <span className="font-semibold text-blue-600" >{visitors.length-1}</span>
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
              visitors.map((visitor) => (
                <tr
                  key={visitor.id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="py-2 px-4 border-t border-gray-200">{visitor.name}</td>
                  <td className="py-2 px-4 border-t border-gray-200">{visitor.date}</td>
                  <td className="py-2 px-4 border-t border-gray-200">{visitor.department}</td>
                  <td className="py-2 px-4 border-t border-gray-200">{visitor.email}</td>
                  <td className="py-2 px-4 border-t border-gray-200">{visitor.phone}</td>
                  <td className="py-2 px-4 border-t border-gray-200">{visitor.purpose}</td>
                </tr>
              ))
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
              className="inline-block bg-green-200 hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 rounded transition duration-200"
            >
              Go To Feedback
            </Link>
          </div>
    </div>
  );
};

export default Visitors;