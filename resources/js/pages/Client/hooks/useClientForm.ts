import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import type { Client } from '@/types'
import { clientCreateSchema } from '../validation.schema'
import * as yup from 'yup'

export function useClientForm() {
    const createForm = useForm({ name: '', phone: '', email: '', description: '', status: 1 })
    const editForm = useForm({ name: '', phone: '', email: '', description: '', status: 1 })
    const deleteForm = useForm({})

    const [editingClient, setEditingClient] = useState<Client | null>(null)
    const [deletingClient, setDeletingClient] = useState<Client | null>(null)

    const [createErrors, setCreateErrors] = useState<Record<string, string>>({})

    const fillEditForm = (client: Client) => {
        editForm.setData({
            name: client.name,
            phone: client.phone,
            email: client.email,
            description: client.description || '',
            status: client.status,
        })
    }

    const submitCreate = async (onSuccess?: () => void) => {
        try {
            await clientCreateSchema.validate(createForm.data, { abortEarly: false });
            setCreateErrors({});
            createForm.post('/clients', {
                onSuccess: () => {
                    createForm.reset()
                    onSuccess?.()
                },
            })
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const errors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        errors[error.path] = error.message;
                    }
                });
                setCreateErrors(errors);
            }
        }

    }

    const submitEdit = (onSuccess?: () => void) => {
        if (!editingClient) return;
        editForm.put(`/clients/${editingClient.id}`, {
            onSuccess,
        })
    }

    const submitDelete = (onSuccess?: () => void) => {
        if (!deletingClient) return;
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

        createErrors,
        setCreateErrors,

        fillEditForm,
        submitCreate,
        submitEdit,
        submitDelete,
    }
}
