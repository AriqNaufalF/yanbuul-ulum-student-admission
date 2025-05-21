import { FileText } from 'lucide-react';
import { Button } from './ui/button';

type DocumentItemProps = {
    label: string;
    onClick?: () => void;
};

export default function DocumentItem({ label, onClick }: DocumentItemProps) {
    return (
        <div className="flex items-center gap-4 rounded-md border p-4">
            <FileText className="text-muted-foreground h-8 w-8" />
            <div>
                <p className="font-medium">{label}</p>
            </div>
            <Button variant="outline" className="ml-auto" onClick={onClick}>
                Lihat
            </Button>
        </div>
    );
}
