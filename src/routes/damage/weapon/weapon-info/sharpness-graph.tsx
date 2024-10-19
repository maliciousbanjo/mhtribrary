import { v3 as uuidv3 } from 'uuid';

interface SharpnessGraphProps {
  sharpness: number[];
}

/**
 * Represents a weapon's sharpness as a colored bar
 */
export function SharpnessGraph({ sharpness }: SharpnessGraphProps) {
  return (
    <div className="weapon-info__sharpness">
      {sharpness.map((sharpnessLength, index) => (
        <div
          key={uuidv3(JSON.stringify(sharpness) + index, uuidv3.URL)}
          className={`sharpness-cell sharp${index}`}
          style={{
            width: `${sharpnessLength * 4}px`
          }}
        />
      ))}
    </div>
  );
}
