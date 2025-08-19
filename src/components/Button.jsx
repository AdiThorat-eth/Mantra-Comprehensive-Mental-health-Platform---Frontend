import React from "react";

function Button({ title, id, rightIcon, leftIcon, containerClass, onClick }) {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black flex items-center transition-all duration-300 hover:bg-violet-500 border-2 hover:border-white ${containerClass}`}
      onClick={onClick}
    >
      {leftIcon}
      <span className="relative flex overflow-hidden font-General text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

export default Button;
