import type { Phase } from "./life/life";

/**
 * The light of the room, from the weather condition and the day phase.
 * `clear` is neutral light: no weather entity, a clear night, or an unknown condition.
 */
export type Sky = "clear" | "sun" | "partly" | "cloud" | "rain" | "pour" | "storm" | "snow" | "sleet" | "hail" | "fog" | "wind";

export const skyFrom = (condition: string | null | undefined, phase: Phase): Sky => {
  switch (condition) {
    case "sunny":
      return phase === "night" ? "clear" : "sun";
    case "clear-night":
      return "clear";
    case "partlycloudy":
      return "partly";
    case "cloudy":
    case "exceptional":
      return "cloud";
    case "rainy":
      return "rain";
    case "pouring":
      return "pour";
    case "lightning":
    case "lightning-rainy":
      return "storm";
    case "snowy":
      return "snow";
    case "snowy-rainy":
      return "sleet";
    case "hail":
      return "hail";
    case "fog":
      return "fog";
    case "windy":
    case "windy-variant":
      return "wind";
    default:
      return "clear";
  }
};
