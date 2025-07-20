
export const BouncingDots = () => {
  return (
    <div className={`flex items-center justify-center space-x-1.5`}>
      <div className={`w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
      <div className={`w-1.5 h-1.5 bg-white rounded-full animate-bounce`}></div>
      <div className={`w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.15s]`}></div>
    </div>
  );
};
