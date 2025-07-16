import type { MonsterLevelTypes } from 'mh3-data';

/** Predicate function for {@link Array.find} */
type FindPredicate<T> = Parameters<Array<T>['find']>[0];

/**
 * Null-safe version of {@link Array.find}
 */
export function findOrThrow<T>(list: T[], predicate: FindPredicate<T>) {
  const result = list.find(predicate);
  if (!result) throw new Error('Could not find item in list');

  return result;
}

/**
 * Null-safe version of {@link Array.at}
 */
export function atOrThrow<T>(list: T[], index: number) {
  const result = list.at(index);
  if (!result) throw new Error(`No item exists at index '${index}'`);

  return result;
}

/**
 * Quest boss monsters can be configured to have 1, 3, or 5 possible levels. This function will
 * return the median level in the given list.
 *
 * @param monsterLevels Must be of length 1, 3, or 5
 * @throws If list is not expected lengths 1, 3, or 5
 */
export function getMedianMonsterLevel(
  monsterLevels: MonsterLevelTypes.MonsterLevel[]
): MonsterLevelTypes.MonsterLevel {
  const length = monsterLevels.length;

  if (length !== 1 && length !== 3 && length !== 5) {
    throw new Error(
      `Expected monsterLevels list to be length 1, 3, or 5 but received '${length}'`
    );
  }

  // Median of an odd-numbered list can be found at (n+1)/2, -1 to account for 0-based indexing
  return atOrThrow(monsterLevels, (length + 1) / 2 - 1);
}
