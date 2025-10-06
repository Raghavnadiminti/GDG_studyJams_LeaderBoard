
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from '@/components/leaderboard';
import { LeaderboardSkeleton } from '@/components/loading';

// Database data structure from backend
interface DatabaseParticipant {
  "User Name": string;
  "User Email": string;
  "Google Cloud Skills Boost Profile URL": string;
  "Profile URL Status": string;
  "Access Code Redemption Status": string;
  "All Skill Badges & Games Completed": string;
  "# of Skill Badges Completed": number;
  "# of Arcade Games Completed": number;
}

// Expected data structure for leaderboard component
interface LeaderboardParticipant {
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

const LeaderboardPage: React.FC = () => {
  const [participants, setParticipants] = useState<LeaderboardParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to map database structure to leaderboard structure
  const mapDatabaseToLeaderboard = (dbData: DatabaseParticipant[]): LeaderboardParticipant[] => {
    return dbData.map((participant) => ({
      "User Name": participant["User Name"],
      "User Email": participant["User Email"],
      "Google Cloud Skill": participant["Google Cloud Skills Boost Profile URL"],
      "Profile URL Status": participant["Profile URL Status"],
      "Access Code Redeemed": participant["Access Code Redemption Status"],
      "All Skill Badges": participant["All Skill Badges & Games Completed"],
      "# of Skill Badges Completed": participant["# of Skill Badges Completed"],
      "Names of Completed Skill Badges": "", // Not available in database, will be empty
      "# of Arcade Games Completed": participant["# of Arcade Games Completed"],
      "Names of Completed Arcade Games": "", // Not available in database, will be empty
    }));
  };

  // Fetch participants data from API
  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<DatabaseParticipant[]>('https://gdgstdj.vercel.app/api/participants');

      if (response.data && Array.isArray(response.data)) {
        const mappedData = mapDatabaseToLeaderboard(response.data);
        setParticipants(mappedData);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (err) {
      console.error('Error fetching participants:', err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('API endpoint not found. Please check if the server is running.');
        }  else {
          setError(`API Error: ${err.response?.statusText || err.message}`);
        }
      } else {
        setError('Failed to fetch participants data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchParticipants();
  }, []);

  // Retry function
  const handleRetry = () => {
    fetchParticipants();
  };

  // Show loading skeleton while fetching data
  if (loading) {
    return <LeaderboardSkeleton />;
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
            <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no participants
  if (participants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-600 font-bold">0</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Participants Found</h3>
            <p className="text-gray-600 mb-6">There are currently no participants in the leaderboard.</p>
            <button
              onClick={handleRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render leaderboard with data
  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container mx-auto px-6">
        {/* Header */}
       

        {/* Leaderboard Component */}
        <Leaderboard data={participants} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
