"use server";

import { calculatePowerless } from "@/lib/calculation";
import { getPowerless, savePowerless } from "@/lib/supabase";

export async function calculatePowerlessAction(name: string) {
  if (!name || name.trim() === "") {
    return { error: "Name is required" };
  }
  
  const normalized = name.toLowerCase().trim();
  
  // Try to get from "database" first
  const existingResult = await getPowerless(normalized);
  
  if (existingResult !== null) {
    return { 
      name: normalized.charAt(0).toUpperCase() + normalized.slice(1), 
      percentage: existingResult, 
      fromDb: true 
    };
  }
  
  // Calculate new percentage
  const percentage = calculatePowerless(normalized);
  
  // Save to "database"
  await savePowerless(normalized, percentage);
  
  return { 
    name: normalized.charAt(0).toUpperCase() + normalized.slice(1), 
    percentage, 
    fromDb: false 
  };
}
