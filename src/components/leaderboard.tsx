"use client"
import type React from "react"
import { useState, useMemo, type ChangeEvent } from "react"

interface UserData {
  "User Name": string
  "User Email": string
  "Google Cloud Skill": string
  "Profile URL Status": string
  "Access Code Redeemed": string
  "All Skill Badges": string
  "# of Skill Badges Completed": number
  "Names of Completed Skill Badges": string
  "# of Arcade Games Completed": number
  "Names of Completed Arcade Games": string
}

interface LeaderboardProps {
  data: UserData[]
  onViewProfile?: (email: string) => void
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(
      (user) =>
        user["User Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        user["User Email"].toLowerCase().includes(searchTerm.toLowerCase()),
    )
    return filtered.sort((a, b) => b["# of Skill Badges Completed"] - a["# of Skill Badges Completed"])
  }, [data, searchTerm])

  const handleViewProfile = (email: string) => {
    if (onViewProfile) onViewProfile(email)
    else console.error("onViewProfile function not implemented")
  }

  const clearSearch = () => setSearchTerm("")
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-lg shadow-lg mb-4 py-4 px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">Google Cloud Study Jams 2025-26</h1>
        </div>

      </div>

      <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="max-w-2xl mx-auto">
          <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
            Search Participants
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or email address..."
              className="
                w-full
                pl-12
                pr-12
                py-3.5
                border-2
                border-gray-300
                rounded-lg
                text-gray-900
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-600
                focus:border-transparent
                transition-all
                duration-200
                text-base
              "
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Participant Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Email Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Skill Badges
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.map((user, index) => {
                const isTop3 = index < 3 && !searchTerm

                return (
                  <tr
                    key={user["User Email"]}
                    className={`transition-colors duration-150 ${
                      isTop3
                        ? index === 0
                          ? "bg-amber-50 hover:bg-amber-100"
                          : index === 1
                            ? "bg-gray-50 hover:bg-gray-100"
                            : "bg-orange-50 hover:bg-orange-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`text-lg font-bold ${
                            isTop3
                              ? index === 0
                                ? "text-amber-600"
                                : index === 1
                                  ? "text-gray-600"
                                  : "text-orange-600"
                              : "text-gray-900"
                          }`}
                        >
                          {index + 1}
                        </span>
                        {isTop3 && (
                          <span className="ml-2 text-xl">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-base font-semibold text-gray-900">{user["User Name"]}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-600 max-w-xs truncate">{user["User Email"]}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-blue-900">{user["# of Skill Badges Completed"]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <button
                        onClick={() => handleViewProfile(user["User Email"])}
                        className="inline-flex items-center px-5 py-2.5 border border-blue-600 text-sm font-semibold rounded-lg text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow"
                      >
                        View Profile
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Participants Found</h3>
          <p className="text-gray-600">Please adjust your search criteria and try again.</p>
        </div>
      )}
    </div>
  )
}

export default Leaderboard