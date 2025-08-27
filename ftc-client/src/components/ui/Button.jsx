const Button = ({
  children,
  onClick,
  onDoubleClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "font-medium rounded-md transition-all duration-200 focus:outline-none";

  const variantStyles = {
    contained: "bg-sky-600 text-white hover:bg-sky-700",
    success: "bg-green-700 text-white hover:bg-green-900",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    "secondary-outlined": "border border-gray-400 hover:bg-gray-200",
    outlined: "border border-sky-600 text-sky-600 hover:bg-sky-100",
    transparent: "bg-transparent",
    danger: "bg-red-500 text-white hover:bg-red-600",
    "danger-outlined": "border border-red-500 text-red-500 hover:bg-red-500/80 hover:text-white",
  };

  const sizeStyles = {
    xs: "text-sm px-3 py-1",
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-2.5",
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
      onDoubleClick={onDoubleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
