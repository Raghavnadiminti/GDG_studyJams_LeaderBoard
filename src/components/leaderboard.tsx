// app/components/Leaderboard.tsx
"use client"

import type React from "react"
import { useState, useMemo, type ChangeEvent } from "react"
import { Search, X, Star, ChevronRight, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserData {
  "User Name": string
  "User Email": string
  "# of Skill Badges Completed": number
}

interface LeaderboardProps {
  data: UserData[]
  onViewProfile?: (email: string) => void
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState("")
 const router = useRouter()
  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(
      (user) =>
        user["User Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        user["User Email"].toLowerCase().includes(searchTerm.toLowerCase()),
    )
    return filtered.sort((a, b) => b["# of Skill Badges Completed"] - a["# of Skill Badges Completed"])
  }, [data, searchTerm])

  const handleViewProfile = (email: string) => {
    // Navigate to /profile/[email] route
    router.push(`/profile/${encodeURIComponent(email)}`)
  }

  const clearSearch = () => setSearchTerm("")
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

  const rankInfo: { [key: number]: { bg: string; text: string; trophy: string } } = {
    1: { bg: "bg-[#FBBC05]", text: "text-white", trophy: "text-yellow-500" },
    2: { bg: "bg-[#EA4335]", text: "text-white", trophy: "text-red-500" },
    3: { bg: "bg-[#34A853]", text: "text-white", trophy: "text-green-500" },
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
          <span className="text-gray-700"> Cloud Study Jams</span>
        </h1>
        <p className="text-lg text-gray-500">Leaderboard 2025-26</p>
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search participants..."
            className="w-full pl-12 pr-12 py-3 border-gray-200 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-shadow duration-200 shadow-sm hover:shadow-md"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50/70 border-b border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Participant
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Badges
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAndSortedData.map((user, index) => {
                const rank = index + 1
                const isTop3 = rank <= 3 && !searchTerm
                const rankStyle = isTop3 ? rankInfo[rank] : null

                return (
                  <tr
                    key={user["User Email"]}
                    className="transition-colors duration-150 hover:bg-gray-50/70"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isTop3
                              ? `${rankStyle?.bg} ${rankStyle?.text}`
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {rank}
                        </span>
                        {isTop3 && <Trophy className={`w-5 h-5 ${rankStyle?.trophy}`} />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-md font-medium text-gray-800">{user["User Name"]}</div>
                      <div className="text-sm text-gray-500">{user["User Email"]}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center space-x-2">
                        <Star className="w-5 h-5 text-blue-500" />
                        <span className="text-lg font-bold text-gray-700">
                          {user["# of Skill Badges Completed"]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleViewProfile(user["User Email"])}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#4285F4] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-lg"
                      >
                        View
                        <ChevronRight className="ml-1 h-5 w-5" />
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
        <div className="text-center py-20 mt-8">
          <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Participants Found</h3>
          <p className="text-gray-500">Try adjusting your search to find a participant.</p>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
