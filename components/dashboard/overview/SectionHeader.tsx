import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string | null;
  viewAllText?: string | null;
  className?: string;
}

const SectionHeader = ({
  title,
  viewAllLink,
  viewAllText = "View All",
  className = "",
}: SectionHeaderProps) => {
  return (
    <div className={`mb-4 flex items-center justify-between ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {viewAllText}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;