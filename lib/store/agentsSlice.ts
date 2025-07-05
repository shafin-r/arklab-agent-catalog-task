import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Beta" | "Archived";
  category: string;
  pricingModel: "Free Tier" | "Subscription" | "Per-Use";
  initials: string;
}

interface AgentsState {
  agents: Agent[];
  filteredAgents: Agent[];
  searchQuery: string;
  statusFilters: string[];
  categoryFilters: string[];
  pricingModelFilter: string;
  loading: boolean;
}

const initialState: AgentsState = {
  agents: [],
  filteredAgents: [],
  searchQuery: "",
  statusFilters: [],
  categoryFilters: [],
  pricingModelFilter: "",
  loading: false,
};

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
      state.filteredAgents = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setStatusFilters: (state, action: PayloadAction<string[]>) => {
      state.statusFilters = action.payload;
      applyFilters(state);
    },
    setCategoryFilters: (state, action: PayloadAction<string[]>) => {
      state.categoryFilters = action.payload;
      applyFilters(state);
    },
    setPricingModelFilter: (state, action: PayloadAction<string>) => {
      state.pricingModelFilter = action.payload;
      applyFilters(state);
    },
    clearAllFilters: (state) => {
      state.searchQuery = "";
      state.statusFilters = [];
      state.categoryFilters = [];
      state.pricingModelFilter = "";
      state.filteredAgents = state.agents;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

function applyFilters(state: AgentsState) {
  let filtered = state.agents;

  // Apply search filter
  if (state.searchQuery) {
    filtered = filtered.filter(
      (agent) =>
        agent.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        agent.description
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
    );
  }

  // Apply status filter
  if (state.statusFilters.length > 0) {
    filtered = filtered.filter((agent) =>
      state.statusFilters.includes(agent.status)
    );
  }

  // Apply category filter
  if (state.categoryFilters.length > 0) {
    filtered = filtered.filter((agent) =>
      state.categoryFilters.includes(agent.category)
    );
  }

  // Apply pricing model filter
  if (state.pricingModelFilter) {
    filtered = filtered.filter(
      (agent) => agent.pricingModel === state.pricingModelFilter
    );
  }

  state.filteredAgents = filtered;
}

export const {
  setAgents,
  setSearchQuery,
  setStatusFilters,
  setCategoryFilters,
  setPricingModelFilter,
  clearAllFilters,
  setLoading,
} = agentsSlice.actions;

export default agentsSlice.reducer;
