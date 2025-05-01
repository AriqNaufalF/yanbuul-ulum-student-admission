import { cn } from "@/lib/utils";

export function FormItem({children, className, ...props}: React.ComponentProps<'div'>) {
    return (
        <div className={cn("grid gap-2 content-start", className)} {...props}>
            {children}
        </div>
    )
}

export function FormTitle({children, className, ...props}: React.ComponentProps<'h2'>) {
    return (
        <h2 className={cn("mb-2 text-xl font-medium md:text-2xl", className)} {...props}>
            {children}
        </h2>
    )
}
