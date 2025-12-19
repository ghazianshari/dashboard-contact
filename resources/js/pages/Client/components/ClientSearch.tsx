import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';

interface Props {
    initialSearch?: string;
}

export default function ClientSearch({ initialSearch = '' }: Props) {
    const { data, setData, get } = useForm({
        search: initialSearch,
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                get('/clients', {
                    preserveState: true,
                    replace: true,
                });
            }}
            className="w-72"
        >
            <Input
                placeholder="Search client..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
            />
        </form>
    );
}
