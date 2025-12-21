import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    open: boolean;
    value: {
        name: string;
        phone: string;
        email: string;
        description?: string;
        status: number;
    };
    error?: {
        name?: string;
        phone?: string;
        email?: string;
        description?: string;
        status?: string;
    };
    processing?: boolean;
    onClose: () => void;
    onChange: (field: keyof Props['value'], value: string | number) => void;
    onSubmit: () => void;
}

export default function EditClientDialog({
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
                <DialogHeader className="mb-3">
                    <DialogTitle>Edit Client</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="flex flex-col gap-2.5">
                        {/* NAME */}
                        <Label htmlFor="edit-name">Client Name</Label>
                        <Input
                            id="edit-name"
                            value={value.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500">{error.name}</p>}

                        {/* PHONE */}
                        <Label htmlFor="edit-phone">Client Phone</Label>
                        <Input
                            id="edit-phone"
                            value={value.phone}
                            onChange={(e) => onChange('phone', e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500">{error.phone}</p>}

                        {/* EMAIL */}
                        <Label htmlFor="edit-email">Client Email</Label>
                        <Input
                            id="edit-email"
                            value={value.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500">{error.email}</p>}

                        {/* DESCRIPTION */}
                        <Label htmlFor="edit-description">
                            Client Description
                        </Label>
                        <Input
                            id="edit-description"
                            value={value.description}
                            onChange={(e) =>
                                onChange('description', e.target.value)
                            }
                            required
                        />
                        {error && (
                            <p className="text-red-500">{error.description}</p>
                        )}
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={processing}>
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
