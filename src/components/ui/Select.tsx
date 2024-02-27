import { cn } from "../../lib/utils";
import * as React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    label: string;
    value: string | number | readonly string[] | undefined;
  }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "peer w-full p-2 font-light  bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400 dark:bg-slate-950",
          className
        )}
        {...props}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";

export { Select };
