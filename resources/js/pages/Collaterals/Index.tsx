import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface CollateralItem {
    id: string;
    userName: string;
    itemName: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Collaterals',
        href: '#',
    },
];

const collateralItems: CollateralItem[] = [
    { id: '1', userName: 'John Doe', itemName: 'Vehicle' },
    { id: '2', userName: 'Jane Smith', itemName: 'Property' },
    { id: '3', userName: 'Mike Johnson', itemName: 'Equipment' },
    { id: '4', userName: 'Sarah Williams', itemName: 'Jewelry' },
    { id: '5', userName: 'Tom Brown', itemName: 'Electronics' },
    { id: '6', userName: 'Emma Davis', itemName: 'Furniture' },
];

export default function Collateral() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Collaterals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* {collateralItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            <div className="relative z-10 space-y-2">
                                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                    {item.userName}
                                </p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {item.itemName}
                                </p>
                            </div>
                        </div>
                    ))} */}


                </div>
            </div>
        </AppLayout>
    );
}