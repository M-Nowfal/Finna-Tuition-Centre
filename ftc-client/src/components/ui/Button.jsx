const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...rest
}) => {
  const baseStyles = "font-medium rounded-md transition-all duration-200 focus:outline-none";

  const variantStyles = {
    contained: "bg-sky-600 text-white hover:bg-sky-700",
    outlined: "border border-sky-600 text-sky-600 hover:bg-sky-100",
    transparent: "bg-transparent",
    danger: "bg-red-500 text-white hover:bg-red-600",
    "danger-outlined": "border border-red-500 text-red-500 hover:bg-red-100/50"
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  const finalClassName = `
    ${baseStyles} ${variantStyles[variant]} 
    ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
    ${className} cursor-pointer flex items-center justify-center
  `;

  return (
    <button
      type={type}
      className={finalClassName}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
