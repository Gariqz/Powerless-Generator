/**
 * Calculates how "Powerless" a name is based on a specific algorithm.
 * 
 * 1. ASCII Mapping: The alphabets are each given an individual numeric code.
 * 2. Character Sum: The sum of all the letters in the names is added up.
 * 3. Modulo Operation: Result = (Sum % 61) + 40 (Minimum 40% base match).
 * 4. Match Factor: The presence of common vowels and the consonants adds weight to the outcome.
 */
export function calculatePowerless(name: string): number {
  if (!name || name.trim() === "") return 0;
  
  const normalized = name.toLowerCase().trim();
  let sum = 0;
  let vowelCount = 0;
  let consonantCount = 0;
  
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const code = char.charCodeAt(0);
    sum += code;
    
    if (vowels.includes(char)) {
      vowelCount++;
    } else if (consonants.includes(char)) {
      consonantCount++;
    }
  }
  
  // Modulo Operation: (Sum % 61) + 40
  let baseScore = (sum % 61) + 40;
  
  /**
   * Match Factor:
   * Presence of common vowels (a, e, i, o, u) and specific consonants 
   * add weight. This reflects the "uniqueness" of the name's composition.
   */
  const vowelsBonus = vowelCount * 1.2;
  const consonantsBonus = consonantCount * 0.4;
  
  // Also consider name length as a factor
  const lengthBonus = normalized.length * 0.2;
  
  let finalScore = baseScore + vowelsBonus + consonantsBonus + lengthBonus;
  
  // Cap it at 100, but allow for some variety near the top
  if (finalScore > 100) {
    // If it exceeds 100, we apply a small dampening factor instead of hard capping
    // to keep it feeling varied even for high scores
    finalScore = 95 + (finalScore % 6); 
  }
  
  return Math.round(finalScore);
}
