import { supabase } from "./supabase";

export async function loadUserProfile(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, grade, xp, level, streak, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error loading profile:", error.message);
    return null;
  }

  return data;
}

export async function saveUserProgress(userID, {grade, xp, level, streak}) {
    if (!userID) return null;
        const payload = {
            id: userID,
            updated_at: new Date().toISOString(),
        };
    
    if (typeof grade === "number") payload.grade = Math.max(1, grade);
    if (typeof xp === "number") payload.xp = Math.max(0, xp);
    if (typeof level === "number") payload.level = Math.max(1, level);
    if (typeof streak === "number") payload.streak = Math.max(0, streak);

    const { data, error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "id" })
        .select("id, full_name, email, grade, xp, level, streak, updated_at")
        .single();
    
    if (error) {
        console.error("Error saving progress:", error.message);
        return null;
    }
    return data;
}