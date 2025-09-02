interface QazCloudLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'auto';
}
export const QazCloudLogo = ({
  className = "h-6 w-6",
  variant = 'auto'
}: QazCloudLogoProps) => {
  // Use the new main logo - manual path reference
  const logoSrc = "/lovable-uploads/27d21bd9-8292-4c57-a0ab-d84707ef7d3e.png";

  return (
    <div className={`${className} relative overflow-hidden`}>
      <img
        src={logoSrc}
        alt="QazCloud Logo"
        className="h-full w-auto object-contain"
      />
    </div>
  );
};