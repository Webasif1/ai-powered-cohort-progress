import { recommendService } from "./cat.service.ts";
import { generateAiResponse } from "./gemini.service.ts";

export const aiRecommendService = async (
  kidsFriendly: boolean,
  apartmentFriendly: boolean,
) => {
  const matchCatsFromDb = await recommendService(
    kidsFriendly,
    apartmentFriendly,
  );

  const prompt = `
  You are a professional feline expert, veterinarian, and cat breed consultant with extensive knowledge of cat breeds, behavior, temperament, health, and lifestyle compatibility.

  Your task is to analyze the following cat recommendation data and provide a detailed comparison and recommendation.

  ## User Requirements
  - Kids Friendly: ${kidsFriendly}
  - Apartment Friendly: ${apartmentFriendly}

  ## Instructions
  1. Compare all matching cat breeds based on the user's requirements.
  2. Explain why each breed is suitable or unsuitable.
  3. Compare their:
   - Temperament
   - Energy Level
   - Lifespan
   - Personality
   - Grooming Needs
   - Apartment Compatibility
   - Compatibility with Children
  4. Mention the pros and cons of each breed.
  5. Recommend the single best breed and clearly explain why it is the best choice.
  6. If no breed perfectly matches the requirements, recommend the closest alternatives and explain the trade-offs.
  7. Keep the explanation beginner-friendly and easy to understand.

  Return your answer in the following Markdown format:

  # 🐱 Cat Recommendation

  ## Best Match
  ...

  ## Comparison Table

  | Breed | Kids Friendly | Apartment Friendly | Energy | Lifespan | Pros | Cons |
  |-------|---------------|--------------------|--------|----------|------|------|

  ## Detailed Comparison
  ...

  ## Final Recommendation
  ...
  `;

  const aiResponse = await generateAiResponse(prompt);

  return aiResponse;
};
