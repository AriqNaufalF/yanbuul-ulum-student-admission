import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

export type ChipVariants = VariantProps<typeof chipVariants>;

const chipVariants = cva('rounded-md px-2 py-1.5 text-xs font-medium inline-flex items-center', {
    variants: {
        variant: {
            success: 'bg-green-600 text-white',
            danger: 'bg-red-600 text-white',
            warning: 'bg-amber-600 text-white',
            info: 'bg-blue-600 text-white',
        },
    },
});

export function Chip({ className, variant, children }: React.ComponentProps<'div'> & ChipVariants) {
    return <div className={cn(chipVariants({ variant, className }))}>{children}</div>;
}
