const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">{title}</h2>
      {subtitle && <p className="text-text-muted text-lg">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
