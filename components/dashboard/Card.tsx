import React from "react";

/**
 * Card Component
 *
 * A reusable UI card that displays a title, value, and an optional icon.
 * Typically used for displaying summary metrics or statistics.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {string | number} props.value - The main value or statistic displayed.
 * @param {React.ReactElement} [props.icon] - An optional icon to be displayed alongside the value.
 * @returns {React.ReactElement} A stylized card component.
 */
const Card: React.FC<{ title: string; value: string | number; icon?: React.ReactElement }> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
      {/* Card Title */}
      <h3 className="mb-4 text-sm font-semibold text-gray-700">{title}</h3>

      {/* Card Content: Value and Optional Icon */}
      <div className="flex items-center justify-center gap-3 rounded-lg bg-white p-5">
        <p className="text-xl font-bold text-gray-600">{value}</p>
      </div>
    </div>
  );
};

export default Card;
