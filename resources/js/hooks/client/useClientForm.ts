import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import type { Client } from '@/types'

export function useClientForm() {
    const createForm = useForm({ name: '', phone: '', email: '', description: '', status: 1 })
    const editForm = useForm({ name: '', phone: '', email: '', description: '', status: 1 })
    const deleteForm = useForm({})

    const [editingClient, setEditingClient] = useState<Client | null>(null)
    const [deletingClient, setDeletingClient] = useState<Client | null>(null)

    const submitCreate = (onSuccess?: () => void) => {
        createForm.post('/clients', {
            onSuccess: () => {
                createForm.reset()
                onSuccess?.()
            },
        })
    }

    const submitEdit = (onSuccess?: () => void) => {
        if (!editingClient) return;
        editForm.put(`/clients/${editingClient.id}`, {
            onSuccess: () => {
                setEditingClient(null);
                onSuccess?.();
            },
        })
    }

    const submitDelete = (onSuccess?: () => void) => {
        if (!deletingClient) return
        deleteForm.delete(`/clients/${deletingClient.id}`, {
            onSuccess,
        })
    }

    return {
        createForm,
        editForm,
        deleteForm,

        editingClient,
        setEditingClient,

        deletingClient,
        setDeletingClient,

        submitCreate,
        submitEdit,
        submitDelete,
    }
}
