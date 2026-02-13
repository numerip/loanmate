import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import loans from '@/routes/loans';

interface LoanItem {
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
        title: 'Loans',
        href: loans.index().url,
    },
];


export default function Loan() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Loans" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
<div className="flex justify-end">
    <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={() => window.location.href = loans.create().url}>
        + New Loan
    </button>
</div>


                </div>
            </div>
        </AppLayout>
    );
}