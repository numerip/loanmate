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
import {useForm} from '@inertiajs/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parse } from 'path';


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





const {data, setData, post, processing, errors, progress} = useForm({

    borrower_name: '',
    borrower_phone: '',
    amount: 0,
    interest_rate: '',
    max_months: '',
     payable: 0,
     collateral_name: '',
     collateral_value: '',
     description: '',
     image_url: null as File | null

});

useEffect(() => {

    const payableAmount = (parseFloat(amount.toString()) * (1 + parseFloat(interestRate.toString()) / 100));
    // setPayable(parseFloat(payableAmount.toFixed(2)));
    setData('payable', parseFloat(payableAmount.toFixed(2)));
    // console.log("Something has changed");

}, [amount, interestRate, months]);

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', data);
    post(loans.store().url, {
            forceFormData: true,
    });
}


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Loan" />
            <div className="flex h-full flex-1 items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-xl border bg-white p-8 shadow-sm">

                <form
                    // action={loans.store().url}
                    // method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >

                        <div className="grid gap-6">

                            {/* ================= Loan Section ================= */}
                            <h2 className="text-xl font-semibold">Loan Details</h2>

                            <div className="grid gap-4 md:grid-cols-2">

                                <div className="grid gap-2">
                                    <Label htmlFor="borrower_name">Borrower Name</Label>
                                    <Input
                                        id="borrower_name"
                                        type="text"
                                        value={data.borrower_name}
                                        onChange={(e)=>setData('borrower_name', e.target.value || '')}
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
                                        value={data.borrower_phone}
                                        onChange={(e)=>setData('borrower_phone', e.target.value)}
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
                                        value={data.amount}
                                        name="amount"
                                        onChange={(e) =>
                                                {setData('amount', parseFloat(e.target.value));
                                                 setAmount(parseFloat(e.target.value) || 0)
                                                }
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
                                    <Select  value={data.interest_rate ?? ""}
                                        onValueChange={(value) => {setData("interest_rate", value); setInterestRate(parseFloat(value) || 0)}}
                                    >
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Select interest rate" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Interest Rate</SelectLabel>

                                                {interestRateItems.map((item) => (
                                                    <SelectItem
                                                        key={item.value}
                                                        value={String(item.value)}   // ✅ MUST be string
                                                    >
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

                                      <Select
                                                value={data.max_months ?? ""}
                                                onValueChange={(value) => {setData("max_months", value);setMonths(parseInt(value) || 0)}}
                                            >
                                                <SelectTrigger className="w-full max-w-48">
                                                    <SelectValue placeholder="Select months" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Months</SelectLabel>

                                                        {monthsItems.map((item) => (
                                                            <SelectItem
                                                                key={item.value}
                                                                value={String(item.value)}   // ✅ force string
                                                            >
                                                                {item.label}
                                                            </SelectItem>
                                                        ))}

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                    <InputError message={errors.max_months} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="payable">
                                        Payable amount / month (MWK)
                                    </Label>
                                    <Input
                                        id="payable"
                                        type="number"
                                        name="payable"
                                        value={data.payable}
                                        onChange={(e)=>setData('payable', parseFloat(e.target.value) || 0)}
                                        required
                                        readOnly
                                        placeholder="Payable amount"
                                    />
                                    <InputError message={errors.payable} />
                                </div>
{/*
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
                                </div> */}
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
                                        value={data.collateral_name}
                                        onChange={(e)=>setData('collateral_name', e.target.value)}
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
                                        value={data.collateral_value}
                                        name="collateral_value"
                                        required
                                        onChange={(e)=>setData('collateral_value', e.target.value)}
                                        placeholder="Enter value"
                                    />
                                    <InputError message={errors.collateral_value} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image_url">
                                        Collateral Image
                                    </Label>
                                    <Input
                                        id="image_url"
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files?.[0] ?? null;
                                            setData("image_url", file);
                                        }}
                                        name="image_url"
                                        accept="image/*"
                                    />
                                    <InputError message={errors.image_url} />
                                </div>
                              <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        name="description"
                                        value ={data.description}
                                        onChange={(e)=>setData('description', e.target.value)}
                                        placeholder="Additional details about the collateral"

                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>

                            {/* ================= Submit ================= */}

                            {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                                  )}
                            <Button
                                type="submit"
                                className="mt-6 w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Create Loan
                            </Button>

                        </div>
                </form>

            </div>
        </div>
        </AppLayout>
    );
}