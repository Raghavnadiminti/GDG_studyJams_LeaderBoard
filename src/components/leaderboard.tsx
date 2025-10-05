// components/Leaderboard.tsx
'use client'
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

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

interface LeaderboardProps {
  data: UserData[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort data based on search term
  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(user => 
      user["User Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      user["User Email"].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => 
      b["# of Skill Badges Completed"] - a["# of Skill Badges Completed"]
    );
  }, [data, searchTerm]);

  const handleViewProfile = (email: string) => {
   
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            🏆 Google Cloud Skills Leaderboard
          </h2>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white sm:text-sm"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg 
                  className="h-5 w-5 text-gray-400 hover:text-gray-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="bg-gray-50 px-6 py-3 border-b">
            <p className="text-sm text-gray-600">
              {filteredAndSortedData.length > 0 ? (
                <>
                  Found <span className="font-medium">{filteredAndSortedData.length}</span> 
                  {filteredAndSortedData.length === 1 ? ' result' : ' results'} 
                  for "<span className="font-medium">{searchTerm}</span>"
                </>
              ) : (
                <>
                  No results found for "<span className="font-medium">{searchTerm}</span>"
                </>
              )}
            </p>
          </div>
        )}

        {/* Desktop/Tablet View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skill Badges
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedData.map((user, index) => (
                  <tr 
                    key={user["User Email"]} 
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index < 3 && !searchTerm ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        {!searchTerm && index === 0 && <span className="text-2xl mr-2">🥇</span>}
                        {!searchTerm && index === 1 && <span className="text-2xl mr-2">🥈</span>}
                        {!searchTerm && index === 2 && <span className="text-2xl mr-2">🥉</span>}
                        #{index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {highlightSearchTerm(user["User Name"], searchTerm)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {highlightSearchTerm(user["User Email"], searchTerm)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <span className="mr-1">🎖️</span>
                        {user["# of Skill Badges Completed"]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewProfile(user["User Email"])}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="space-y-4 p-4">
            {filteredAndSortedData.map((user, index) => (
              <div 
                key={user["User Email"]} 
                className={`bg-gray-50 rounded-lg p-4 border ${
                  index < 3 && !searchTerm ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {!searchTerm && index === 0 && <span className="text-2xl mr-2">🥇</span>}
                    {!searchTerm && index === 1 && <span className="text-2xl mr-2">🥈</span>}
                    {!searchTerm && index === 2 && <span className="text-2xl mr-2">🥉</span>}
                    <span className="text-sm font-medium text-gray-500">
                      #{index + 1}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <span className="mr-1">🎖️</span>
                    {user["# of Skill Badges Completed"]}
                  </span>
                </div>

                <div className="mb-3">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {highlightSearchTerm(user["User Name"], searchTerm)}
                  </h3>
                  <p className="text-sm text-gray-500 break-all">
                    {highlightSearchTerm(user["User Email"], searchTerm)}
                  </p>
                </div>

                <button
                  onClick={() => handleViewProfile(user["User Email"])}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedData.length === 0 && !searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No participants yet
            </h3>
            <p className="text-gray-500">
              Check back later to see the leaderboard rankings.
            </p>
          </div>
        )}

        {/* No Search Results */}
        {filteredAndSortedData.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or clearing the search filter.
            </p>
            <button
              onClick={clearSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to highlight search terms
const highlightSearchTerm = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

export default Leaderboard;