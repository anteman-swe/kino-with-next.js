import * as React from 'react';

export interface StarRatingProps {
  value: number;
  onChange: (_value: number) => void;
  maxStars?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  readOnly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  maxStars = 5,
  size = 24,
  color = 'gold',
  emptyColor = '#d3d3d3',
  readOnly = false,
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const handleClick = (starValue: number) => {
    if (!readOnly) onChange(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    if (!readOnly) setHoverValue(starValue);
  };

  const handleMouseLeave = () => setHoverValue(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    starValue: number
  ) => {
    if (readOnly) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(starValue);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '4px' }} role="radiogroup">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((starValue) => {
        const isFilled = starValue <= (hoverValue || value);

        return (
          <button
            key={starValue}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onKeyDown={(e) => handleKeyDown(e, starValue)}
            style={{
              background: 'none',
              border: 'none',
              cursor: readOnly ? 'default' : 'pointer',
              fontSize: `${size}px`,
              color: isFilled ? color : emptyColor,
              padding: 0,
              lineHeight: 1,
            }}
            aria-checked={starValue <= value}
            role="radio"
            tabIndex={readOnly ? -1 : 0}
            disabled={readOnly}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};