import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const chipVariants = cva('rounded-md px-2 py-1.5 text-xs font-medium inline-flex items-center', {
    variants: {
        variant: {
            success: 'bg-green-100 text-green-900',
            danger: 'bg-red-100 text-red-900',
            warning: 'bg-yellow-100 text-yellow-900',
        },
    },
});

export function Chip({ className, variant, children }: React.ComponentProps<'div'> & VariantProps<typeof chipVariants>) {
    return <div className={cn(chipVariants({ variant, className }))}>{children}</div>;
}
