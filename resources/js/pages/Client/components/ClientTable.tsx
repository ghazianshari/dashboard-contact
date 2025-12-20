import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/function/formatDateTime';
import type { Client, PaginatedData } from '@/types';
import { MoreVertical } from 'lucide-react';

interface Props {
    items: PaginatedData<Client>;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
}

export default function ClientTable({ items, onEdit, onDelete }: Props) {
    return (
        <Table>
            <TableCaption>A list of your Clients.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.data.map((client: Client) => (
                    <TableRow key={client.id}>
                        <TableCell className="font-medium">
                            {client.id}
                        </TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.status}</TableCell>
                        <TableCell>
                            {formatDateTime(client.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => onEdit(client)}
                                    >
                                        Edit
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => onDelete(client)}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell colSpan={3}>{items.total} Clients</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
