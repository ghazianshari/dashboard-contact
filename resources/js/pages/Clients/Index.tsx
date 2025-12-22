import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useClientForm } from '@/pages/Clients/hooks/useClientForm';
import type { Client, PaginatedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AddClientDialog from './components/AddClientDialog';
import ClientSearch from './components/ClientSearch';
import ClientTable from './components/ClientTable';
import DeleteClientDialog from './components/DeleteClientDialog';
import EditClientDialog from './components/EditClientDialog';

interface BreadcrumbItem {
    title: string;
    href: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/clients',
    },
];

interface Props {
    items: PaginatedData<Client>;
    filters: {
        search?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
    };
}

export default function Index({ items, filters }: Props) {
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const {
        createForm,
        editForm,
        deleteForm,
        // editingClient,
        deletingClient,
        setEditingClient,
        setDeletingClient,
        createErrors,
        fillEditForm,
        submitCreate,
        submitEdit,
        submitDelete,
    } = useClientForm();

    const handleSort = (column: string) => {
        let nextDirection: 'asc' | 'desc' = 'asc';
        if (filters.sort === column) {
            nextDirection = filters.direction === 'asc' ? 'desc' : 'asc';
        }
        router.get(
            '/clients',
            {
                search: filters.search,
                sort: column,
                direction: nextDirection,
            },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {/* ADD CLIENT */}
                    <div className="mb-4 flex items-center justify-between p-3">
                        <h1 className="text-xl font-bold">Clients</h1>
                        <div className="flex items-center gap-4">
                            <ClientSearch initialSearch={filters.search} />
                            <Button onClick={() => setAddOpen(true)}>
                                Add Client
                            </Button>
                        </div>
                    </div>
                    {/* TABLE */}
                    <ClientTable
                        items={items}
                        sort={filters.sort}
                        direction={filters.direction}
                        onSort={handleSort}
                        onEdit={(client) => {
                            setEditingClient(client);
                            fillEditForm(client);
                            setEditOpen(true);
                        }}
                        onDelete={(client) => {
                            setDeletingClient(client);
                            setDeleteOpen(true);
                        }}
                    />

                    {items.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-4 text-sm">
                            {items.current_page > 1 && (
                                <Link
                                    href={`/clients?page=${items.current_page - 1}`}
                                    className="rounded border px-3 py-1 hover:bg-gray-100"
                                >
                                    Previous
                                </Link>
                            )}

                            <span className="px-3 py-1">
                                Page {items.current_page} of {items.last_page}
                            </span>

                            {items.current_page < items.last_page && (
                                <Link
                                    href={`/clients?page=${items.current_page + 1}`}
                                    className="rounded border px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                    {/* ADD CLIENT DIALOG */}
                    <AddClientDialog
                        open={addOpen}
                        value={createForm.data}
                        error={{ ...createErrors, ...createForm.errors }}
                        processing={createForm.processing}
                        onClose={() => setAddOpen(false)}
                        onChange={(field, value) =>
                            createForm.setData(field, value)
                        }
                        onSubmit={() => submitCreate(() => setAddOpen(false))}
                    />

                    {/* EDIT DIALOG */}
                    <EditClientDialog
                        open={editOpen}
                        value={editForm.data}
                        error={editForm.errors}
                        processing={editForm.processing}
                        onClose={() => setEditOpen(false)}
                        onChange={(field, value) =>
                            editForm.setData(field, value)
                        }
                        onSubmit={() =>
                            submitEdit(() => {
                                setEditOpen(false);
                                setEditingClient(null);
                            })
                        }
                    />

                    {/* DELETE DIALOG */}
                    <DeleteClientDialog
                        open={deleteOpen}
                        client={deletingClient}
                        processing={deleteForm.processing}
                        onClose={() => setDeleteOpen(false)}
                        onConfirm={() =>
                            submitDelete(() => {
                                setDeleteOpen(false);
                                setDeletingClient(null);
                            })
                        }
                    />
                </div>
            </div>
        </AppLayout>
    );
}
