import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import CollateralCard from '@/components/collateral_card';

interface CollateralItem {
    loan_id:  number;
    collateral_id: number;
    name: string;
    description: string;
    value: number;
    image_url: string;
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

export default function Collateral({collaterals}: {collaterals: CollateralItem[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Collaterals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">



                </div> */}

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {collaterals.map((c) => (
                            <CollateralCard
                            key={c.collateral_id}
                            imageUrl={c.image_url}
                            name={c.name}
                            value={c.value}
                            description={c.description}
                            />
                        ))}
            </div>

            </div>
        </AppLayout>
    );
}