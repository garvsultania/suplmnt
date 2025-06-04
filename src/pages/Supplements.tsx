import React, { useState, useMemo, useEffect } from 'react';
import { useSupplements } from '../contexts/SupplementsContext';
import { SupplementCard } from '../components/supplements/SupplementCard';
import { SupplementCardSkeleton } from '../components/supplements/SupplementCardSkeleton';
import { SupplementDetailsModal } from '../components/supplements/SupplementDetailsModal';
import { Filter, SortAsc, SortDesc, Search, Plus, AlertCircle, Grid, List, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import SupplementListItem from '../components/supplements/SupplementListItem';
import { icons } from 'lucide-react';

type SortOption = 'name' | 'status' | 'lastTaken';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'grid' | 'list';

export function Supplements() {
  const { supplements, toggleFavorite, markAsTaken } = useSupplements();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort supplements
  const filteredSupplements = useMemo(() => {
    return supplements
      .filter(supplement => {
        const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplement.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter.size === 0 || statusFilter.has(supplement.status);
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'status':
            comparison = a.status.localeCompare(b.status);
            break;
          case 'lastTaken':
            const dateA = a.lastTaken ? new Date(a.lastTaken).getTime() : 0;
            const dateB = b.lastTaken ? new Date(b.lastTaken).getTime() : 0;
            comparison = dateA - dateB;
            break;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [supplements, searchQuery, sortBy, sortDirection, statusFilter]);

  const handlePurchase = (id: string, link: any) => {
    window.open(link.url, '_blank');
    toast.success(`Opening ${link.name} for purchase`);
  };

  const handleViewDetails = (id: string) => {
    const supplement = supplements.find(s => s.id === id);
    if (supplement) {
      setSelectedSupplement(supplement);
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  const categories = [
    { id: 'all', label: 'All Supplements' },
    { id: 'featured', label: 'Featured' },
    { id: 'recommended', label: 'Recommended' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' }
  ];

  const renderSupplementsList = () => {
    const baseList = filteredSupplements;
    switch (activeCategory) {
      case 'featured':
        return baseList.filter(s => s.isFavorite);
      case 'recommended':
        return baseList.filter(s => !s.lastTaken);
      case 'active':
        return baseList.filter(s => s.status === 'active');
      case 'completed':
        return baseList.filter(s => s.status === 'completed');
      default:
        return baseList;
    }
  };

  const displayedSupplements = renderSupplementsList();

  return (
    <div className="min-h-screen bg-gradient-main pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-mint/10 to-blue-50 rounded-b-3xl p-8 mb-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Personalized Supplement Plan</h1>
          <p className="text-gray-600 mb-6">
            Based on your health profile and lab results, we've curated a selection of supplements to help you achieve your wellness goals.
          </p>
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-1">Potential Deficiencies</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-700 mt-2">
              <span className="font-medium">• Vitamin D</span>
              <span className="font-medium">• Iron</span>
              <span className="font-medium">• Magnesium</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Categories */}
        {/* Removed Categories Tabs */}

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex-1 relative min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search supplements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {/* Removed Filter text */}
            </Button>
            <Button
              variant="outline"
              onClick={toggleSortDirection}
              className="inline-flex items-center px-3"
            >
              {sortDirection === 'asc' ? (
                <SortAsc className="w-5 h-5" />
              ) : (
                <SortDesc className="w-5 h-5" />
              )}
              {/* Removed Sort text */}
            </Button>
            {/* Removed List/Grid Button */}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Status</h3>
              <div className="flex flex-wrap gap-2">
                {['active', 'paused', 'completed'].map(status => (
                  <Button
                    key={status}
                    variant={statusFilter.has(status) ? "default" : "outline"}
                    onClick={() => toggleStatusFilter(status)}
                    className={cn(
                      "capitalize",
                      statusFilter.has(status) && "bg-mint text-white hover:bg-mint/90"
                    )}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Supplements List/Grid */}
        <div className={cn(
          "space-y-4",
          viewMode === 'grid' && "grid grid-cols-1 md:grid-cols-2 gap-4"
        )}>
          {isLoading ? (
            // Show skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <SupplementCardSkeleton key={index} />
            ))
          ) : displayedSupplements.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No supplements found</h3>
              <p className="text-gray-500">
                {searchQuery || statusFilter.size > 0 || activeCategory !== 'all'
                  ? 'Try adjusting your search, filters, or category'
                  : 'Get started by requesting supplement recommendations'}
              </p>
            </div>
          ) : (
            displayedSupplements.map(supplement => (
              viewMode === 'grid' ? (
                <SupplementCard
                  key={supplement.id}
                  supplement={supplement}
                  onToggleFavorite={toggleFavorite}
                  onMarkAsTaken={markAsTaken}
                  onViewDetails={handleViewDetails}
                  onPurchase={handlePurchase}
                  viewMode={viewMode}
                />
              ) : ( // Render list item
                (() => {
                  const Icon = supplement.icon ? icons[supplement.icon as keyof typeof icons] : null;
                  const itemColor = supplement.purchaseLinks?.[0]?.name.toLowerCase().includes('amazon') ? 'mint' : 'coral';
                  return (
                    <SupplementListItem
                      key={supplement.id}
                      supplement={supplement}
                      onMarkTaken={() => markAsTaken(supplement.id)}
                      onViewDetails={handleViewDetails}
                      icon={Icon ? <Icon className="w-6 h-6" /> : null}
                      color={itemColor}
                    />
                  );
                })()
              )
            ))
          )}
        </div>
      </div>

      {/* Details Modal */}
      <SupplementDetailsModal
        supplement={selectedSupplement}
        onClose={() => setSelectedSupplement(null)}
        onPurchase={handlePurchase}
      />
    </div>
  );
}
