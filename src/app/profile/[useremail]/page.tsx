
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import StudentProfile from '@/components/profile';
import { ProfileSkeleton } from '@/components/loading';

// Database data structure from backend
interface DatabaseStudent {
  "User Name": string;
  "User Email": string;
  "Google Cloud Skills Boost Profile URL": string;
  "Profile URL Status": string;
  "Access Code Redemption Status": string;
  "All Skill Badges & Games Completed": string;
  "# of Skill Badges Completed": number;
  "# of Arcade Games Completed": number;
  // Additional fields that might be in the API response
  "Names of Completed Skill Badges"?: string;
  "Names of Completed Arcade Games"?: string;
}

// Expected data structure for StudentProfile component
interface StudentProfileData {
  "User Name": string;
  "User Email": string;
  "Google Cloud Skill": string;
  "Profile URL Status": string;
  "Access Code Redeemed": string;
  "All Skill Badges": string;
  "# of Skill Badges Completed": number;
  "Names of Completed Skill Badges": string;
  "# of Arcade Games Completed": number;
  "Names of Completed Arcade Games": string;
}

const ProfilePage: React.FC = () => {
  const params = useParams();
  const userEmail = decodeURIComponent(params.useremail as string);

  const [studentData, setStudentData] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to map database structure to StudentProfile structure
  const mapDatabaseToProfile = (dbData: DatabaseStudent): StudentProfileData => {
    return {
      "User Name": dbData["User Name"],
      "User Email": dbData["User Email"],
      "Google Cloud Skill": dbData["Google Cloud Skills Boost Profile URL"],
      "Profile URL Status": dbData["Profile URL Status"],
      "Access Code Redeemed": dbData["Access Code Redemption Status"],
      "All Skill Badges": dbData["All Skill Badges & Games Completed"],
      "# of Skill Badges Completed": dbData["# of Skill Badges Completed"],
      "Names of Completed Skill Badges": dbData["Names of Completed Skill Badges"] || "", // Default to empty if not available
      "# of Arcade Games Completed": dbData["# of Arcade Games Completed"],
      "Names of Completed Arcade Games": dbData["Names of Completed Arcade Games"] || "", // Default to empty if not available
    };
  };

  // Fetch student data from API
  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<DatabaseStudent>(
        `/api/students?email=${encodeURIComponent(userEmail)}`
      );

      if (response.data) {
        const mappedData = mapDatabaseToProfile(response.data);
        setStudentData(mappedData);
      } else {
        throw new Error('No student data found');
      }
    } catch (err) {
      console.error('Error fetching student data:', err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Student not found. Please check the email address.');
        } else if (err.response?.status === 400) {
          setError('Invalid email address provided.');
        }  else {
          setError(`API Error: ${err.response?.statusText || err.message}`);
        }
      } else {
        setError('Failed to fetch student data. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount or when email changes
  useEffect(() => {
    if (userEmail) {
      fetchStudentData();
    } else {
      setError('No email provided in URL');
      setLoading(false);
    }
  }, [userEmail]);

  // Retry function
  const handleRetry = () => {
    fetchStudentData();
  };

  // Show loading skeleton while fetching data
  if (loading) {
    return <ProfileSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-red-600 font-bold">!</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Profile</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500 mb-6">
              Requested email: {userEmail}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show message if no student data
  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-600 font-bold">?</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Student Not Found</h3>
            <p className="text-gray-600 mb-4">No student found with the provided email address.</p>
            <p className="text-sm text-gray-500 mb-6">
              Email: {userEmail}
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Go Back to Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render StudentProfile component with data
  return <StudentProfile userData={studentData} />;
};

export default ProfilePage;
