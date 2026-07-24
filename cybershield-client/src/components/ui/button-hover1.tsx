import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonHover1Props {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  width?: string;
  className?: string;
}

const ButtonHover1: React.FC<ButtonHover1Props> = ({
  text = "Schedule Call",
  icon = <ArrowRight />,
  onClick,
  width = "w-[180px]",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`group cursor-pointer slide-anime px-5 py-3 rounded-full ${width}
                 dark:bg-white bg-primary-base text-white dark:text-black
                 flex justify-between items-center font-semibold transition-all duration-300 ${className}`}
    >
      {text}
      <div className="group-hover:translate-x-2 transition-transform">{icon}</div>
    </button>
  );
};

export default ButtonHover1;
