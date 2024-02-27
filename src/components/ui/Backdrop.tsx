import { cn } from "../../lib/utils";

type Props = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function Backdrop({
  children,
  className,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "fixed top-0 backdrop-blur-sm left-0 w-full h-full overflow-y-auto z-[5000] bg-black bg-opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Backdrop;
