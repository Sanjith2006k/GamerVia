const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary drop-shadow-[0_0_10px_rgba(188,111,241,0.5)]"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 8V10M8 9H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="8.5" r="0.5" fill="currentColor" />
        <circle cx="15.5" cy="9.5" r="0.5" fill="currentColor" />
      </svg>
      <span className="font-heading font-bold text-xl tracking-wide text-white">
        Gamer<span className="text-accent">Via</span>
      </span>
    </div>
  );
};

export default Logo;
