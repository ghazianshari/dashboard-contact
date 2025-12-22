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
import { ArrowDown, ArrowUp, MoreVertical } from 'lucide-react';

interface Props {
    items: PaginatedData<Client>;
    sort?: string;
    direction?: 'asc' | 'desc';
    onSort: (column: string) => void;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
}

export default function ClientTable({
    items,
    sort,
    direction,
    onSort,
    onEdit,
    onDelete,
}: Props) {
    const header = [
        { label: 'ID', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Phone', key: 'phone' },
        { label: 'Email', key: 'email' },
        { label: 'Status', key: 'status' },
        { label: 'Created At', key: 'created_at' },
    ];

    return (
        <Table>
            <TableCaption>A list of your Clients.</TableCaption>
            <TableHeader>
                <TableRow className="hover:bg-muted/0">
                    {header.map((head, index) => {
                        const isActiveSort = sort === head.key;
                        return (
                            <TableHead
                                key={head.key}
                                className={cn(
                                    // head.label === 'ID' && 'w-[100px]',
                                    'cursor-pointer select-none',
                                    'hover:font-extrabold hover:underline',
                                )}
                                colSpan={
                                    index === header.length - 1
                                        ? header.length
                                        : 0
                                }
                                onClick={() => onSort(head.key)}
                            >
                                <div className="flex items-center gap-1">
                                    {head.label}
                                    {isActiveSort && (
                                        <span className="text-xs font-extrabold text-blue-500">
                                            {direction === 'asc' ? (
                                                <ArrowUp size={16} />
                                            ) : (
                                                <ArrowDown
                                                    className="text-red-500"
                                                    size={16}
                                                />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </TableHead>
                        );
                    })}
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
                <TableRow className="hover:bg-muted/0">
                    <TableCell>Total</TableCell>
                    <TableCell colSpan={header.length}>
                        {items.total} Clients
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
