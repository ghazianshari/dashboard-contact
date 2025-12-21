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
                // !prevent request if search is empty
                if (!data.search) return;
                get('/clients', {
                    preserveState: true,
                    replace: true,
                });
            }}
            className="relative w-64"
        >
            <Input
                placeholder="Search client..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                className="pr-5"
            />
            {/* x button when data is not empty to clear the search */}
            {data.search && (
                <button
                    type="button"
                    className="absolute top-[5px] right-2 cursor-pointer font-bold text-red-500 hover:text-gray-600"
                    onClick={() => setData('search', '')}
                >
                    x
                </button>
            )}
        </form>
    );
}
