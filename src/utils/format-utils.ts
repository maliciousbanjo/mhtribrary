/**
 * Capitalize the first letter of a string
 */
export function capitalize(input: string) {
  return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
}
