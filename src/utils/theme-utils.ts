/**
 * Update dark mode preferences in localStorage
 */
export function updateDarkModePreference(active: boolean) {
  const boolToString = active ? 'true' : 'false'; // localStorage must use strings
  localStorage.setItem('darkMode', boolToString);
}

/**
 * @returns true if dark mode should be active
 */
export function getDarkModePreference(): boolean {
  const preference = localStorage.getItem('darkMode');
  return preference === 'true';
}
