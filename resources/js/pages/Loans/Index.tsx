import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import loansRoute from '@/routes/loans';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontalIcon, Plus, ChevronLeft, ChevronRight, HandCoins, Trash2 } from "lucide-react";

interface LoanItem {
    loan_id: string;
    borrower_name: string;
    borrower_phone: string;
    amount: number;
    interest_rate: number;
    months: number;
    payable: number;
    date_of_borrowing: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Loans', href: loansRoute.index().url },
];

export default function Loan({ loans }: { loans: LoanItem[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentAmount, setPaymentAmount] = useState<string>("");

    // Control States for Dialogs
    const [openRepayId, setOpenRepayId] = useState<string | null>(null);
    const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(loans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = loans.slice(startIndex, startIndex + itemsPerPage);
    const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);

    const handleRepaySubmission = (loanId: string) => {
        // This sends the data to your Laravel controller
        router.post(`/loans/${loanId}/repay`, {
            amount: paymentAmount,
        }, {
            onSuccess: () => {
                setOpenRepayId(null);
                setPaymentAmount("");
            },
        });
    };

    const handleDelete = (loanId: string) => {
        router.delete(`/loans/${loanId}`, {
            onSuccess: () => setOpenDeleteId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Loans" />

            <div className="mx-auto w-full max-w-6xl flex h-full flex-1 flex-col gap-4 p-6">

                {/* Header Action Row */}
                <div className="flex justify-between items-center px-8">
                    <span className="text-sblack-foreground">
                        <b>Total ({loans.length ?? 0})</b>
                    </span>
                    <Button
                        onClick={() => window.location.href = loansRoute.create().url}
                        className="gap-2"
                    >
                        <Plus className="h-4 w-4" /> New Loan
                    </Button>
                </div>

                {/* Table Container */}
                <div className="rounded-md bg-card mx-8 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 border-none">
                                <TableHead>Borrower</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Principal</TableHead>
                                <TableHead className="text-right">Payable</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((loan) => (
                                <TableRow key={loan.loan_id} className="border-none hover:bg-muted/30 transition-colors">
                                    <TableCell className="font-medium">{loan.borrower_name}</TableCell>
                                    <TableCell>{loan.borrower_phone}</TableCell>
                                    <TableCell>{loan.date_of_borrowing}</TableCell>
                                    <TableCell className="text-right font-mono text-xs">
                                        MWK {loan.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold text-blue-600 font-mono text-xs">
                                        MWK {loan.payable.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontalIcon className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/loans/${loan.loan_id}`}>View Details</Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />

                                                {/* Repay Loan Dialog */}
                                                <Dialog
                                                    open={openRepayId === loan.loan_id}
                                                    onOpenChange={(open) => {
                                                        setOpenRepayId(open ? loan.loan_id : null);
                                                        if (!open) setPaymentAmount("");
                                                    }}
                                                >
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-green-600 focus:text-green-600">
                                                            <HandCoins className="mr-2 h-4 w-4" /> Repay Loan
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Record Payment</DialogTitle>
                                                            <DialogDescription>
                                                                Enter the amount collected from <strong>{loan.borrower_name}</strong>.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-4">
                                                            <Label htmlFor="amount" className="mb-2 block text-xs">Amount (MWK)</Label>
                                                            <Input
                                                                id="amount"
                                                                type="number"
                                                                placeholder={loan.payable.toString()}
                                                                value={paymentAmount}
                                                                onChange={(e) => setPaymentAmount(e.target.value)}
                                                            />
                                                        </div>
                                                        <DialogFooter>
                                                            <Button variant="outline" onClick={() => setOpenRepayId(null)}>Cancel</Button>
                                                            <Button
                                                                className="bg-green-600 hover:bg-green-700"
                                                                onClick={() => handleRepaySubmission(loan.loan_id)}
                                                            >
                                                                Confirm Payment
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Delete Confirmation */}
                                                <AlertDialog
                                                    open={openDeleteId === loan.loan_id}
                                                    onOpenChange={(open) => setOpenDeleteId(open ? loan.loan_id : null)}
                                                >
                                                    <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Loan
                                                        </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the loan record for {loan.borrower_name}.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                className="bg-red-600 hover:bg-red-700"
                                                                onClick={() => handleDelete(loan.loan_id)}
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter className="bg-transparent border-none">
                            {/* <TableRow>
                                <TableCell colSpan={4} className="font-bold">Total Principal</TableCell>
                                <TableCell className="text-right font-bold">MWK {totalAmount.toLocaleString()}</TableCell>
                                <TableCell colSpan={1}></TableCell>
                            </TableRow> */}
                        </TableFooter>
                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-end space-x-2 px-8 py-2">
                    <div className="text-sm text-muted-foreground mr-4">
                        Page {currentPage} of {totalPages || 1}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}