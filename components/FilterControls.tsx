"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  setSearchQuery,
  setStatusFilters,
  setCategoryFilters,
  setPricingModelFilter,
  clearAllFilters,
} from "@/lib/store/agentsSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, X } from "lucide-react";

export function FilterControls() {
  const dispatch = useDispatch();
  const {
    searchQuery,
    statusFilters,
    categoryFilters,
    pricingModelFilter,
    agents,
  } = useSelector((state: RootState) => state.agents);

  // Get unique values for filter options
  const uniqueStatuses = [...new Set(agents.map((agent) => agent.status))];
  const uniqueCategories = [...new Set(agents.map((agent) => agent.category))];
  const uniquePricingModels = [
    ...new Set(agents.map((agent) => agent.pricingModel)),
  ];

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      dispatch(setStatusFilters([...statusFilters, status]));
    } else {
      dispatch(setStatusFilters(statusFilters.filter((s) => s !== status)));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      dispatch(setCategoryFilters([...categoryFilters, category]));
    } else {
      dispatch(
        setCategoryFilters(categoryFilters.filter((c) => c !== category))
      );
    }
  };

  const handlePricingModelChange = (model: string) => {
    if (pricingModelFilter === model) {
      dispatch(setPricingModelFilter(""));
    } else {
      dispatch(setPricingModelFilter(model));
    }
  };

  const hasActiveFilters =
    searchQuery ||
    statusFilters.length > 0 ||
    categoryFilters.length > 0 ||
    pricingModelFilter;

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search agents by name or description..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Status Filter */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Status
            </Label>
            <div className="space-y-2">
              {uniqueStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={statusFilters.includes(status)}
                    onCheckedChange={(checked) =>
                      handleStatusChange(status, checked as boolean)
                    }
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Category
            </Label>
            <div className="space-y-2">
              {uniqueCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={categoryFilters.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Model Filter */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Pricing Model
            </Label>
            <div className="space-y-2">
              {uniquePricingModels.map((model) => (
                <div key={model} className="flex items-center space-x-2">
                  <Checkbox
                    id={`pricing-${model}`}
                    checked={pricingModelFilter === model}
                    onCheckedChange={() => handlePricingModelChange(model)}
                  />
                  <Label htmlFor={`pricing-${model}`} className="text-sm">
                    {model}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => dispatch(clearAllFilters())}
              disabled={!hasActiveFilters}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
