import { CardProps } from "@/types/CardProps";

const Card = ({ title, value, icon, content, className = "" }: CardProps) => {
  if (content) {
    return <div className={`rounded-lg p-6 ${className}`}>{content}</div>;
  }

  return (
    <div className={`rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default Card;
