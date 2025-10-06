
'use client';

import React from 'react';
import Image from 'next/image';

interface ProfileProps {
  className?: string;
}

interface UserProfile {
  name: string;
  email: string;
  institution: string;
  skillBadges: number;
  rank: number;
  totalParticipants: number;
  joinDate: string;
  badges: string[];
}

const ProfilePage: React.FC<ProfileProps> = ({ className }) => {
  // Sample user data - replace with actual data
  const userProfile: UserProfile = {
    name: "Alen Alexander",
    email: "alenalexander001@gmail.com", 
    institution: "Vignan's Institute of Information Technology",
    skillBadges: 8,
    rank: 1,
    totalParticipants: 150,
    joinDate: "September 2025",
    badges: [
      "Cloud Architecture",
      "Data Engineering", 
      "Machine Learning",
      "Cloud Security",
      "DevOps",
      "Kubernetes",
      "BigQuery",
      "Cloud Functions"
    ]
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="h-1 bg-blue-500"></div>
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src="/gdg-logo.jpeg"
                  alt="GDG Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">GDG on Campus</h1>
                <p className="text-gray-600 text-sm">Vignan's Institute of Information Technology</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 text-sm font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Profile Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Back to Leaderboard */}
        <div className="mb-6">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Leaderboard</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-4xl">
          {/* Profile Header */}
          <div className="bg-blue-600 px-8 py-6">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-blue-600">
                  {userProfile.name.charAt(0)}
                </span>
              </div>

              {/* Basic Info */}
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
                <p className="text-blue-100 text-lg">{userProfile.email}</p>
                <p className="text-blue-200 text-sm mt-1">{userProfile.institution}</p>
              </div>
            </div>
          </div>

          {/* Profile Body */}
          <div className="p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Rank Card */}
              <div className="bg-yellow-50 rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">🥇</div>
                <p className="text-2xl font-bold text-gray-800">#{userProfile.rank}</p>
                <p className="text-gray-600">Current Rank</p>
              </div>

              {/* Skill Badges Card */}
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <p className="text-2xl font-bold text-gray-800">{userProfile.skillBadges}</p>
                <p className="text-gray-600">Skill Badges</p>
              </div>

              {/* Participants Card */}
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">👥</div>
                <p className="text-2xl font-bold text-gray-800">{userProfile.totalParticipants}</p>
                <p className="text-gray-600">Total Participants</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Full Name</p>
                    <p className="text-gray-800">{userProfile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email Address</p>
                    <p className="text-gray-800">{userProfile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Institution</p>
                    <p className="text-gray-800">{userProfile.institution}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Joined</p>
                    <p className="text-gray-800">{userProfile.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Earned Badges */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Earned Badges</h3>
                <div className="grid grid-cols-2 gap-2">
                  {userProfile.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm text-center"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
                {userProfile.badges.length === 0 && (
                  <p className="text-gray-500">No badges earned yet</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                View All Badges
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium">
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
