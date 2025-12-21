import { Badge } from '@/components/ui/badge';
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
import { statusConverter } from '@/function/statusConverter';
import { cn } from '@/lib/utils';
import type { badgeVariant, Client, PaginatedData } from '@/types';
import { MoreVertical } from 'lucide-react';

interface Props {
    items: PaginatedData<Client>;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
}

export default function ClientTable({ items, onEdit, onDelete }: Props) {
    const header = ['ID', 'Name', 'Phone', 'Email', 'Status', 'Created At'];

    return (
        <Table>
            <TableCaption>A list of your Clients.</TableCaption>
            <TableHeader>
                <TableRow>
                    {header.map((head, index) => (
                        <TableHead
                            key={head}
                            className={cn(head === 'ID' && 'w-[100px]')}
                            colSpan={
                                index === header.length - 1 ? header.length : 1
                            }
                        >
                            {head}
                        </TableHead>
                    ))}
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
                        <TableCell>
                            <Badge
                                variant={
                                    statusConverter(
                                        client.status,
                                    ) as badgeVariant
                                }
                            >
                                {statusConverter(client.status)}
                            </Badge>
                        </TableCell>
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
                    <TableCell colSpan={header.length}>
                        {items.total} Clients
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
