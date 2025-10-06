"use client"
import type React from "react"

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

interface StudentProfileProps {
  userData: UserData
  onBack?: () => void
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userData, onBack }) => {
  // Parse skill badges from the pipe-separated string
  const skillBadges = userData["Names of Completed Skill Badges"]
    ? userData["Names of Completed Skill Badges"]
        .split("|")
        .map((badge) => badge.trim())
        .filter((badge) => badge.length > 0)
    : []

  // Parse arcade games from the pipe-separated string
  const arcadeGames = userData["Names of Completed Arcade Games"]
    ? userData["Names of Completed Arcade Games"]
        .split("|")
        .map((game) => game.trim())
        .filter((game) => game.length > 0)
    : []

  // Helper function to get status badge styling
  const getStatusBadge = (status: string, isSuccess: boolean) => {
    const baseClasses = "inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold border"
    if (isSuccess) {
      return `${baseClasses} bg-green-50 text-green-800 border-green-200`
    }
    return `${baseClasses} bg-red-50 text-red-800 border-red-200`
  }

  // Helper function to get progress percentage (assuming 10 total badges)
  const getProgressPercentage = () => {
    const totalBadges = 10
    return Math.min((userData["# of Skill Badges Completed"] / totalBadges) * 100, 100)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header with Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg shadow-sm border-2 border-gray-300 hover:border-gray-400 transition-all duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Leaderboard
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 break-words">{userData["User Name"]}</h1>
                <p className="text-blue-100 text-base break-all">{userData["User Email"]}</p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-8 py-6 text-center border-2 border-white/20">
                <div className="text-4xl font-bold text-white mb-1">{userData["# of Skill Badges Completed"]}</div>
                <div className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Skill Badges</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          {/* Status Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Profile Status</h3>
              <span
                className={getStatusBadge(
                  userData["Profile URL Status"],
                  userData["Profile URL Status"].toLowerCase() === "all good",
                )}
              >
                {userData["Profile URL Status"]}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Access Code</h3>
              <span
                className={getStatusBadge(
                  userData["Access Code Redeemed"],
                  userData["Access Code Redeemed"].toLowerCase() === "yes",
                )}
              >
                {userData["Access Code Redeemed"] === "Yes" ? "✓ Redeemed" : "✗ Not Redeemed"}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">All Badges</h3>
              <span
                className={getStatusBadge(
                  userData["All Skill Badges"],
                  userData["All Skill Badges"].toLowerCase() === "yes",
                )}
              >
                {userData["All Skill Badges"] === "Yes" ? "✓ Complete" : "✗ In Progress"}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Arcade Games</h3>
              <div className="text-2xl font-bold text-gray-900">{userData["# of Arcade Games Completed"]}</div>
              <div className="text-sm text-gray-600 mt-1">Completed</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-10 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-900">Overall Progress</h3>
              <span className="text-sm font-semibold text-gray-600">
                {getProgressPercentage().toFixed(0)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-300">
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-4 transition-all duration-500 ease-out"
                style={{ width:` ${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Google Cloud Skills Link */}
          <div className="mb-10">
            <a
              href={userData["Google Cloud Skill"]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
            >
              <svg className="w-5 h-5 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Google Cloud Profile
            </a>
          </div>

          {/* Skill Badges Section */}
          <div className="mb-10">
            <div className="flex items-center mb-5 pb-3 border-b-2 border-gray-200">
              <svg className="w-7 h-7 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">
                Completed Skill Badges
                <span className="ml-3 text-lg text-gray-600 font-semibold">({skillBadges.length})</span>
              </h3>
            </div>

            {skillBadges.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <ol className="space-y-4">
                  {skillBadges.map((badge, index) => (
                    <li
                      key={index}
                      className="flex items-start bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <span className="flex-shrink-0 w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-base font-semibold text-gray-900 break-words leading-relaxed">{badge}</p>
                      </div>
                      <span className="flex-shrink-0 text-green-600 ml-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                  />
                </svg>
                <p className="text-gray-600 font-semibold text-lg">No skill badges completed yet</p>
                <p className="text-sm text-gray-500 mt-2">Start your Google Cloud journey to earn badges</p>
              </div>
            )}
          </div>

          {/* Arcade Games Section */}
          {arcadeGames.length > 0 && (
            <div>
              <div className="flex items-center mb-5 pb-3 border-b-2 border-gray-200">
                <svg className="w-7 h-7 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">
                  Completed Arcade Games
                  <span className="ml-3 text-lg text-gray-600 font-semibold">({arcadeGames.length})</span>
                </h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <ol className="space-y-4">
                  {arcadeGames.map((game, index) => (
                    <li
                      key={index}
                      className="flex items-start bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <span className="flex-shrink-0 w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-base font-semibold text-gray-900 break-words leading-relaxed">{game}</p>
                      </div>
                      <span className="flex-shrink-0 text-green-600 ml-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentProfile