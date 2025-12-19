import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Props {
    open: boolean;
    value: string;
    error?: string;
    processing?: boolean;
    onClose: () => void;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export default function AddClientDialog({
    open,
    value,
    error,
    processing,
    onClose,
    onChange,
    onSubmit,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Client</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Client Name</label>
                        <Input
                            id="name"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={processing}>
                            Add
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
