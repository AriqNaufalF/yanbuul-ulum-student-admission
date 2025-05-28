import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

type DocumentItemProps = {
    label: string;
    url?: string;
    onClick?: () => void;
};

export default function DocumentItem({ label, url, onClick }: DocumentItemProps) {
    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }

        if (!url) {
            toast.error('Dokumen tidak tersedia!');
            return;
        }
        window.open(url, '_blank');
    };

    return (
        <div className="flex items-center gap-4 rounded-md border p-4">
            <FileText className="text-muted-foreground h-8 w-8" />
            <div>
                <p className="font-medium">{label}</p>
            </div>
            <Button variant="outline" className="ml-auto" onClick={handleClick}>
                Lihat
            </Button>
        </div>
    );
}
