import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';

interface Props {
    initialSearch?: string;
}

export default function ClientSearch({ initialSearch = '' }: Props) {
    const { data, setData, get } = useForm({
        search: initialSearch,
    });

    const hasSearch = Boolean(initialSearch);

    return (
        <div className="flex items-center gap-2">
            {hasSearch && (
                <Button
                    title="Reset search"
                    variant="outline"
                    onClick={() => {
                        setData('search', '');
                        router.get('/clients', {}, { replace: true });
                    }}
                    size={'icon'}
                >
                    <RefreshCw className="font-extrabold text-blue-700" />
                </Button>
            )}
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
        </div>
    );
}
