import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Client } from '@/types';

interface Props {
    open: boolean;
    client: Client | null;
    processing?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteClientDialog({
    open,
    client,
    processing,
    onClose,
    onConfirm,
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Client</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <strong>{client?.name}</strong>?
                        <br />
                        This action can be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        disabled={processing}
                        onClick={onConfirm}
                    >
                        Delete
                    </AlertDialogAction>
                    <AlertDialogCancel onClick={onClose}>
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
