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
import { Textarea } from '@/components/ui/textarea';

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
                <DialogHeader className='mb-3'>
                    <DialogTitle>Add Client</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="flex flex-col gap-2.5">
                        {/* NAME */}
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={value.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            required
                        />
                        {error?.name && (
                            <p className="text-red-500">{error.name}</p>
                        )}

                        {/* PHONE */}
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={value.phone}
                            onChange={(e) => onChange('phone', e.target.value)}
                            required
                        />
                        {error?.phone && (
                            <p className="text-red-500">{error.phone}</p>
                        )}

                        {/* EMAIL */}
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={value.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            required
                        />
                        {error?.email && (
                            <p className="text-red-500">{error.email}</p>
                        )}

                        {/* DESCRIPTION */}
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={value.description}
                            onChange={(e) =>
                                onChange('description', e.target.value)
                            }
                            required
                        />
                        {error?.description && (
                            <p className="text-red-500">{error.description}</p>
                        )}
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
