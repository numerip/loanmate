import { Form, Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import loans from '@/routes/loans';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {useState, useEffect} from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


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
     {
        title: 'Add Loan',
        href: loans.create().url,
    },
];


export default function Loan() {

    const monthsItems = [
  { label: "Select a months", value: null },
  { label: "1 month", value: "1" },
    { label: "2 months", value: "2" },
      { label: "3 months", value: "3" },
        { label: "4 months", value: "4" },
          { label: "5 months", value: "5" },
            { label: "6 months", value: "6" },
    ];

    const interestRateItems=[
    { label: "Select an interest rate", value: null },
    { label: "5%", value: "5" },
    { label: "10%", value: "10" },
    { label: "15%", value: "15" },
    { label: "20%", value: "20" },
    { label: "25%", value: "25" },
    { label: "30%", value: "30" },
    {label: "35%", value: "35" },
    {label: "40%", value: "40" },
     {label: "45%", value: "45" },
      {label: "50%", value: "50" },
    ]

const [amount, setAmount] = useState(0);
const [interestRate, setInterestRate] = useState(0);
const [months, setMonths] = useState(0);
const [payable, setPayable] = useState(0);

useEffect(() => {

    const payableAmount = (amount * (1 + interestRate / 100));
    setPayable(parseFloat(payableAmount.toFixed(2)));

}, [amount, interestRate, months]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Loan" />
            <div className="flex h-full flex-1 items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-xl border bg-white p-8 shadow-sm">

                <Form
                    action={loans.store().url}
                    method="post"
                    encType="multipart/form-data"
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-6">

                            {/* ================= Loan Section ================= */}
                            <h2 className="text-xl font-semibold">Loan Details</h2>

                            <div className="grid gap-4 md:grid-cols-2">

                                <div className="grid gap-2">
                                    <Label htmlFor="borrower_name">Borrower Name</Label>
                                    <Input
                                        id="borrower_name"
                                        type="text"
                                        name="borrower_name"
                                        required
                                        autoFocus
                                        placeholder="Enter borrower name"
                                    />
                                    <InputError message={errors.borrower_name} />
                                </div>
                                 <div className="grid gap-2">
                                    <Label htmlFor="borrower_phone">Borrower Phone</Label>
                                    <Input
                                        id="borrower_phone"
                                        type="text"
                                        name="borrower_phone"
                                        required
                                        autoFocus
                                        placeholder="Enter borrower phone number"
                                    />
                                    <InputError message={errors.borrower_phone} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Loan Amount (MWK)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        name="amount"
                                        onChange={(e) =>
                                                setAmount(parseFloat(e.target.value) || 0)
                                            }
                                        required
                                        placeholder="Enter loan amount"
                                    />
                                    <InputError message={errors.amount} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="interest_rate">
                                        Interest Rate
                                    </Label>
                                    {/* <Input
                                        id="interest_rate"
                                        type="number"
                                        step="0.01"
                                        onChange={(e) =>
                                                setInterestRate(parseFloat(e.target.value) || 0)
                                            }
                                        name="interest_rate"
                                        required
                                        placeholder="Interest rate"
                                    /> */}
                                    <Select items={interestRateItems} onValueChange={(value) => setInterestRate(parseInt(value) || 40)}>
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Interest Rate</SelectLabel>
                                            {interestRateItems.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                                </SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                        </Select>
                                    <InputError message={errors.interest_rate} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="months">
                                        Repayment Period (Months)
                                    </Label>
                                    {/* <Input
                                        id="months"
                                        type="number"
                                        name="months"
                                        min={1}
                                        value={months}
                                        onChange={(e) =>
                                                setMonths(parseInt(e.target.value) || 1)
                                            }
                                        required
                                        placeholder="Number of months"
                                    /> */}

                                     <Select items={monthsItems} onValueChange={(value) => setMonths(parseInt(value) || 1)}>
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            <SelectLabel>Months</SelectLabel>
                                            {monthsItems.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                                </SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                        </Select>
                                    <InputError message={errors.months} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="payable">
                                        Payable amount / month (MWK)
                                    </Label>
                                    <Input
                                        id="payable"
                                        type="number"
                                        name="payable"
                                        value={payable}
                                        required
                                        readOnly
                                        placeholder="Payable amount"
                                    />
                                    <InputError message={errors.payable} />
                                </div>

                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="date_of_borrowing">
                                        Date of Borrowing
                                    </Label>
                                    <Input
                                        id="date_of_borrowing"
                                        type="date"
                                        name="date_of_borrowing"
                                        required
                                    />
                                    <InputError message={errors.date_of_borrowing} />
                                </div>
                            </div>

                            {/* ================= Collateral Section ================= */}
                            <h2 className="pt-6 text-xl font-semibold">
                                Collateral Details
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">

                                <div className="grid gap-2">
                                    <Label htmlFor="collateral_name">
                                        Collateral Name
                                    </Label>
                                    <Input
                                        id="collateral_name"
                                        type="text"
                                        name="collateral_name"
                                        required
                                        placeholder="Car, House, Land..."
                                    />
                                    <InputError message={errors.collateral_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="collateral_value">
                                        Collateral Value (MWK)
                                    </Label>
                                    <Input
                                        id="collateral_value"
                                        type="number"
                                        step="0.01"
                                        name="collateral_value"
                                        required
                                        placeholder="Enter value"
                                    />
                                    <InputError message={errors.collateral_value} />
                                </div>

                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="image_url">
                                        Collateral Image
                                    </Label>
                                    <Input
                                        id="image_url"
                                        type="file"
                                        name="image_url"
                                        accept="image/*"
                                    />
                                    <InputError message={errors.image_url} />
                                </div>

                            </div>

                            {/* ================= Submit ================= */}
                            <Button
                                type="submit"
                                className="mt-6 w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Create Loan
                            </Button>

                        </div>
                    )}
                </Form>

            </div>
        </div>
        </AppLayout>
    );
}