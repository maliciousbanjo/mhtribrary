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
          className={`sharpness-cell sharp${index}`}
          style={{
            width: `${sharpnessLength * 4}px`
          }}
        />
      ))}
    </div>
  );
}
