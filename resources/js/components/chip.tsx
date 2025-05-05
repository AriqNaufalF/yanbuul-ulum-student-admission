import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const chipVariants = cva('rounded-md px-2 py-1.5 text-xs font-medium inline-flex items-center', {
    variants: {
        variant: {
            success: 'bg-primary text-primary-foreground',
            danger: 'bg-red-600 text-white',
            warning: 'bg-amber-600 text-white',
        },
    },
});

export function Chip({ className, variant, children }: React.ComponentProps<'div'> & VariantProps<typeof chipVariants>) {
    return <div className={cn(chipVariants({ variant, className }))}>{children}</div>;
}
