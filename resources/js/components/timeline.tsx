import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export function Timeline({ className, children, lineOffset = 40 }: React.ComponentProps<'div'> & { lineOffset?: number }) {
    const timelineRef = useRef<HTMLDivElement>(null);
    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (timelineRef.current && timelineRef.current.lastElementChild) {
                // Set the height of the timeline based on the height of the container
                // and the height of the last child element
                // Adjust the height to account for the padding and margin
                setInnerHeight(timelineRef.current.lastElementChild.clientHeight - lineOffset);
            }
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(() => {
            updateHeight();
        });

        if (timelineRef.current && timelineRef.current.lastElementChild) {
            resizeObserver.observe(timelineRef.current.lastElementChild);
        }

        return () => {
            if (timelineRef.current && timelineRef.current.lastElementChild) {
                resizeObserver.unobserve(timelineRef.current.lastElementChild);
            }
        };
    }, []);
    return (
        <div
            className={cn(
                'before:bg-secondary/50 relative space-y-8 before:absolute before:top-6 before:bottom-[var(--timeline-bottom)] before:left-1.5 before:-z-1 before:w-1',
                className,
            )}
            style={
                {
                    '--timeline-bottom': `${innerHeight}px`,
                } as React.CSSProperties
            }
            ref={timelineRef}
        >
            {children}
        </div>
    );
}

export function TimelineItem({ className, children, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex gap-6', className)} {...props}>
            {children}
        </div>
    );
}

export function TimelinePoint({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('bg-secondary mt-6 h-4 w-4 rounded-full', className)} {...props}></div>;
}

export function TimelineContent({ className, children, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('bg-primary text-primary-foreground flex-1 rounded-lg px-6 py-4', className)} {...props}>
            {children}
        </div>
    );
}
