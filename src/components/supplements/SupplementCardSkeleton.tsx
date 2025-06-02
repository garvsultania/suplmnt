import React from 'react';

export function SupplementCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4 flex flex-col gap-3 animate-pulse">
      {/* Header / Basic Info */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-200" />
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
      </div>

      {/* Key Details */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>

      {/* Dietary Info */}
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded w-16" />
        <div className="h-6 bg-gray-200 rounded w-16" />
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded w-20" />
          <div className="h-8 bg-gray-200 rounded w-20" />
          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-24" />
      </div>

      {/* Purchase & Actions */}
      <div className="flex flex-col items-center space-y-3 pt-3 border-t border-gray-100">
        <div className="text-center w-full">
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2" />
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-1" />
          <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-full" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
} 