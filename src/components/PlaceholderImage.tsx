interface PlaceholderImageProps {
  text: string;
  subtext?: string;
  className?: string;
  icon?: string;
}

const PlaceholderImage = ({ text, subtext, className = "", icon = "🎨" }: PlaceholderImageProps) => {
  return (
    <div className={`bg-gradient-to-br from-royal-red to-royal-maroon flex items-center justify-center ${className}`}>
      <div className="text-center text-white">
        <div className="w-16 h-16 mx-auto mb-2 bg-royal-gold/20 rounded-full flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-royal-cream/80 text-sm font-medium">{text}</p>
        {subtext && <p className="text-royal-cream/60 text-xs mt-1">{subtext}</p>}
      </div>
    </div>
  );
};

export default PlaceholderImage;