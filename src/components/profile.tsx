
'use client';

import React from 'react';
import Link from 'next/link';

interface UserData {
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

interface StudentProfileProps {
  userData: UserData;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userData }) => {
  // Parse skill badges from the pipe-separated string

  const skillBadges = userData["Names of Completed Skill Badges"]
    ? userData["Names of Completed Skill Badges"]
        .split("|")
        .map((badge) => badge.trim())
        .filter((badge) => badge.length > 0)
    : [];

  // Parse arcade games from the pipe-separated string  
  const arcadeGames = userData["Names of Completed Arcade Games"]
    ? userData["Names of Completed Arcade Games"]
        .split("|")
        .map((game) => game.trim())
        .filter((game) => game.length > 0)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      {/* NO HEADER - Using your fixed header */}

      <div className="container mx-auto px-6">
        {/* Back Button - Go to Home */}
        <div className="mb-8">
          <Link 
            href="/"
            className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 text-lg font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Leaderboard</span>
          </Link>
        </div>

        {/* Profile Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Student Profile
          </h1>
          <p className="text-xl text-gray-600">
            Detailed progress and achievements
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {/* Profile Header Row */}
          <div className="bg-blue-600 px-8 py-6">
            <div className="grid grid-cols-12 gap-6 items-center text-white font-bold text-xl">
        
              <div className="col-span-4">Participant Name</div>
              <div className="col-span-4">Email Address</div>
              <div className="col-span-2 text-center">Skill Badges</div>
              <div className="col-span-1 text-center">Profile</div>
            </div>
          </div>

          {/* Profile Data Row */}
          <div className="grid grid-cols-12 gap-6 p-8 bg-white">
           

            {/* Name Section */}
            <div className="col-span-4 flex items-center">
              <div>
                <p className="font-bold text-gray-800 text-2xl mb-2">
                  {userData["User Name"]}
                </p>
               
              </div>
            </div>

            {/* Email */}
            <div className="col-span-4 flex items-center">
              <p className="text-gray-600 text-xl">{userData["User Email"]}</p>
            </div>

            {/* Badge Count */}
            <div className="col-span-2 flex items-center justify-center">
              <div className={`px-6 py-3 rounded-lg font-bold text-2xl ${
                userData["# of Skill Badges Completed"] >= 5 
                  ? "bg-green-100 text-green-800"
                  : userData["# of Skill Badges Completed"] >= 1
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {userData["# of Skill Badges Completed"]}
              </div>
            </div>

            {/* Profile Link */}
            <div className="col-span-1 flex items-center justify-center">
              <a
                href={userData["Google Cloud Skill"]}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg"
              >
                View
              </a>
            </div>
          </div>
        </div>

        {/* Simple Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Additional Information</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">Profile URL Status</p>
                <p className={`text-xl ${
                  userData["Profile URL Status"] === "All Good" 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {userData["Profile URL Status"]}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">Access Code Status</p>
                <p className={`text-xl ${
                  userData["Access Code Redeemed"] === "Yes" 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {userData["Access Code Redeemed"] === "Yes" ? "Redeemed" : "Not Redeemed"}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">Arcade Games Completed</p>
                <p className="text-xl text-gray-800">
                  {userData["# of Arcade Games Completed"]} games
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 mb-2">All Skill Badges Status</p>
                <p className="text-xl text-gray-800">
                  {userData["All Skill Badges"]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Badges */}
        {skillBadges.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Completed Skill Badges ({skillBadges.length})
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 gap-4">
                {skillBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-4 p-6 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      ✓
                    </div>
                    <span className="text-gray-800 text-xl font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Badges Message */}
        {skillBadges.length === 0 && (
          <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-600 mb-4">No skill badges completed yet</h2>
            <p className="text-xl text-gray-500 mb-6">Start your Google Cloud journey to earn badges</p>
            <a
              href={userData["Google Cloud Skill"]}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl"
            >
              Get Started
            </a>
          </div>
        )}

        {/* Arcade Games */}
        {arcadeGames.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Completed Arcade Games ({arcadeGames.length})
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 gap-4">
                {arcadeGames.map((game, index) => (
                  <div key={index} className="flex items-center space-x-4 p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                      G
                    </div>
                    <span className="text-gray-800 text-xl font-medium">{game}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
