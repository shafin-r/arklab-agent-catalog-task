import { Metadata } from "next";
import { AgentsCatalog } from "@/components/AgentsCatalog";
import { Agent } from "@/lib/store/agentsSlice";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "ArkLab AI Agents Catalog - Discover AI Solutions",
  description:
    "Browse our comprehensive catalog of AI agents for customer service, marketing, development, and more. Find the perfect AI solution for your business needs.",
  keywords:
    "AI agents, artificial intelligence, customer service, marketing automation, development tools",
};

async function getAgents(): Promise<Agent[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const filePath = path.join(process.cwd(), "public", "mock-agents.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading agents data:", error);
    return [];
  }
}

export default async function Home() {
  const agents = await getAgents();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Arklab AI Agents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and explore our comprehensive collection of AI agents
            designed to enhance your business operations.
          </p>
        </div>

        <AgentsCatalog initialAgents={agents} />
      </div>
    </main>
  );
}
