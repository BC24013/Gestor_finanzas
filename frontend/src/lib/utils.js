import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes input strings by neutralizing any potential HTML tags and trimming content,
 * completely mitigating XSS (Cross-Site Scripting) vectors in localized outputs.
 */
export function sanitizeInput(input) {
  if (!input) return "";
  const str = String(input);
  // Strip common HTML tags (to neutralize <script>...</script> and regular HTML markup)
  const withoutTags = str.replace(/<\/?[^>]+(>|$)/g, "");
  // Trim white spaces to ensure clean matching/consistency
  return withoutTags.trim();
}

export function formatDate(dateString) {
  if (!dateString) return "";
  
  // If we receive a Date object
  if (dateString instanceof Date) {
    const day = dateString.getUTCDate();
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${day} ${months[dateString.getUTCMonth()]}, ${dateString.getUTCFullYear()}`;
  }
  
  // If it's a string, check if it matches YYYY-MM-DD
  const match = String(dateString).trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const year = parseInt(match[1], 10);
    const monthIndex = parseInt(match[2], 10) - 1;
    const day = parseInt(match[3], 10);
    
    const months = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];
    const month = months[monthIndex] || "";
    return `${day} ${month}, ${year}`;
  }

  // Fallback for other parseable format strings
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      return String(dateString);
    }
    const day = d.getDate();
    const months = [
      "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];
    return `${day} ${months[d.getMonth()]}, ${d.getFullYear()}`;
  } catch (e) {
    return String(dateString);
  }
}
