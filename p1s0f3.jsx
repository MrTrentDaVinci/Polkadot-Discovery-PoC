/**
 * File: p1s0f3.jsx
 * Components: Cp1s0f3.1 (FilterPanel), Cp1s0f3.2 (FilterCheckbox)
 * Purpose: Dynamic filter panel that adapts based on search topic
 * Dependencies: React, lucide-react
 */

import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

// Cp1s0f3.1 - FilterPanel Component
export function FilterPanel({ filters, activeFilters, onFilterChange, topic }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Group filters by category
  const groupedFilters = filters.reduce((acc, filter) => {
    const category = filter.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(filter);
    return acc;
  }, {});

  // Initialize all groups as expanded
  useEffect(() => {
    const groups = {};
    Object.keys(groupedFilters).forEach((category) => {
      groups[category] = true;
    });
    setExpandedGroups(groups);
  }, [filters]);

  const toggleGroup = (category) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const activeCount = Object.keys(activeFilters).length;

  const handleClearAll = () => {
    onFilterChange({});
  };

  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className="filter-panel bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <h3 className="font-bold text-gray-900">
            Filters
            {topic && (
              <span className="ml-2 text-sm text-gray-600">for {topic}</span>
            )}
          </h3>
          {activeCount > 0 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {activeCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label={isExpanded ? "Collapse filters" : "Expand filters"}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Filter Groups */}
      {isExpanded && (
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(groupedFilters).map(([category, categoryFilters]) => (
            <FilterGroup
              key={category}
              category={category}
              filters={categoryFilters}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
              isExpanded={expandedGroups[category]}
              onToggle={() => toggleGroup(category)}
            />
          ))}
        </div>
      )}

      {/* Newsletter hint */}
      {isExpanded && activeCount > 0 && (
        <div className="px-4 py-3 bg-blue-50 border-t border-blue-100">
          <p className="text-sm text-blue-800">
            💡 Selected filters will customize your newsletter content
          </p>
        </div>
      )}
    </div>
  );
}

// Filter Group Component
function FilterGroup({
  category,
  filters,
  activeFilters,
  onFilterChange,
  isExpanded,
  onToggle,
}) {
  return (
    <div className="filter-group">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-2 text-left"
      >
        <h4 className="font-semibold text-gray-700 capitalize">{category}</h4>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-2 pl-2">
          {filters.map((filter) => (
            <FilterControl
              key={filter.id}
              filter={filter}
              isActive={activeFilters[filter.id] !== undefined}
              value={activeFilters[filter.id]}
              onChange={(value) => {
                const newFilters = { ...activeFilters };
                if (value === null || value === false) {
                  delete newFilters[filter.id];
                } else {
                  newFilters[filter.id] = value;
                }
                onFilterChange(newFilters);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Filter Control Component (decides which type to render)
function FilterControl({ filter, isActive, value, onChange }) {
  switch (filter.type) {
    case "checkbox":
      return (
        <FilterCheckbox
          filter={filter}
          isActive={isActive}
          onChange={(checked) => onChange(checked || null)}
        />
      );
    case "slider":
      return (
        <FilterSlider
          filter={filter}
          value={value ?? filter.default}
          onChange={onChange}
        />
      );
    case "multi_select":
      return (
        <FilterMultiSelect
          filter={filter}
          value={value ?? []}
          onChange={onChange}
        />
      );
    case "single_select":
      return (
        <FilterSingleSelect
          filter={filter}
          value={value ?? filter.default}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}

// Cp1s0f3.2 - FilterCheckbox Component
export function FilterCheckbox({ filter, isActive, onChange }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-start gap-2 py-2">
      <input
        type="checkbox"
        id={filter.id}
        checked={isActive}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <div className="flex-1">
        <label
          htmlFor={filter.id}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          {filter.name}
          {filter.newsletter_specific && (
            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
              Newsletter
            </span>
          )}
          {filter.requires_location && (
            <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
              Location
            </span>
          )}
          <button
            type="button"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative"
          >
            <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
            {showTooltip && (
              <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                {filter.description}
              </div>
            )}
          </button>
        </label>
        <p className="text-xs text-gray-500 mt-0.5">{filter.description}</p>
      </div>
    </div>
  );
}

// Filter Slider Component
function FilterSlider({ filter, value, onChange }) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          {filter.name}
        </label>
        <span className="text-sm font-bold text-blue-600">
          {value}
          {filter.name.toLowerCase().includes("price") && "$"}
        </span>
      </div>

      <input
        type="range"
        min={filter.min}
        max={filter.max}
        step={filter.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{filter.min}</span>
        <span>{filter.max}</span>
      </div>

      <p className="text-xs text-gray-500 mt-1">{filter.description}</p>
    </div>
  );
}

// Filter Multi-Select Component
function FilterMultiSelect({ filter, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (option) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue.length > 0 ? newValue : null);
  };

  return (
    <div className="py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">
          {filter.name}
          {value.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
              {value.length}
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-1 pl-2">
          {filter.options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 py-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => handleToggle(option)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-1">{filter.description}</p>
    </div>
  );
}

// Filter Single-Select Component
function FilterSingleSelect({ filter, value, onChange }) {
  return (
    <div className="py-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {filter.name}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        {filter.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <p className="text-xs text-gray-500 mt-1">{filter.description}</p>
    </div>
  );
}

export default { FilterPanel, FilterCheckbox };
