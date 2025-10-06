
'use client';

import React from 'react';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  text = "Loading...", 
  size = 'md', 
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center space-y-4">
      {/* Spinning Circle */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className={`${textSizes[size]} font-medium text-gray-600`}>
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <LoadingSpinner />
    </div>
  );
};

// Skeleton Loading Components for different layouts
const SkeletonRow = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-12 gap-6 p-8 bg-white">
      <div className="col-span-1 flex items-center justify-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>
      <div className="col-span-4 flex items-center">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
      <div className="col-span-4 flex items-center">
        <div className="h-5 bg-gray-200 rounded w-64"></div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
      </div>
    </div>
  </div>
);

const LeaderboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50 pt-6">
    <div className="container mx-auto px-6">
      {/* Title Skeleton */}
      <div className="text-center mb-8">
        <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
      </div>

      {/* Search Skeleton */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-8 py-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-1 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-4 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-4 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-2 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-1 h-5 bg-blue-500 rounded"></div>
          </div>
        </div>

        {/* Skeleton Rows */}
        <div className="divide-y divide-gray-100">
          {[...Array(5)].map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-50 pt-6">
    <div className="container mx-auto px-6">
      {/* Back Button Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
      </div>

      {/* Title Skeleton */}
      <div className="text-center mb-8">
        <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
      </div>

      {/* Profile Card Skeleton */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="bg-blue-600 px-8 py-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-1 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-4 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-4 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-2 h-5 bg-blue-500 rounded"></div>
            <div className="col-span-1 h-5 bg-blue-500 rounded"></div>
          </div>
        </div>
        <div className="p-8 animate-pulse">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-1">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            </div>
            <div className="col-span-4 space-y-2">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="col-span-4">
              <div className="h-5 bg-gray-200 rounded w-64"></div>
            </div>
            <div className="col-span-2 flex justify-center">
              <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
            </div>
            <div className="col-span-1 flex justify-center">
              <div className="h-9 bg-gray-200 rounded-lg w-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Skeleton */}
      <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-40"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Export all components
export { Loading, LeaderboardSkeleton, ProfileSkeleton };
export default Loading;
