import { cn } from "@/lib/cn";

type Div = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: Div) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-elevated shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: Div) {
  return <div className={cn("px-5 pt-5", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-[15px] font-semibold text-fg", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1 text-[13px] text-fg-muted", className)} {...props} />
  );
}

export function CardBody({ className, ...props }: Div) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: Div) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t border-line px-5 py-3.5",
        className,
      )}
      {...props}
    />
  );
}
