"use client";

import { Agent } from "@/lib/store/agentsSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Beta":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case "Free Tier":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Subscription":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Per-Use":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {agent.initials}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                  {agent.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{agent.category}</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className={`${getStatusColor(agent.status)} text-xs`}
            >
              {agent.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {agent.description}
          </p>

          <div className="flex justify-between items-center">
            <Badge
              variant="outline"
              className={`${getPricingColor(agent.pricingModel)} text-xs`}
            >
              {agent.pricingModel}
            </Badge>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Learn More →
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
