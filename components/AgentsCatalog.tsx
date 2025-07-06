"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setAgents, Agent } from "@/lib/store/agentsSlice";
import { FilterControls } from "./FilterControls";
import { AgentCard } from "./AgentCard";
import { motion } from "framer-motion";

interface AgentsCatalogProps {
  initialAgents: Agent[];
}

export function AgentsCatalog({ initialAgents }: AgentsCatalogProps) {
  const dispatch = useDispatch();
  const { filteredAgents, loading } = useSelector(
    (state: RootState) => state.agents
  );

  useEffect(() => {
    dispatch(setAgents(initialAgents));
  }, [dispatch, initialAgents]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FilterControls />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            <AgentCard agent={agent} />
          </motion.div>
        ))}
      </motion.div>

      {filteredAgents.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No agents found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search criteria
          </p>
        </motion.div>
      )}
      <div className="text-center text-gray-600">
        Showing {filteredAgents.length} of {initialAgents.length} agents
      </div>
    </div>
  );
}
