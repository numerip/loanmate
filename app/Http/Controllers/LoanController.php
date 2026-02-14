<?php

namespace App\Http\Controllers;

use App\Models\loan;
use App\Models\Collateral;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          return Inertia::render('Loans/Index', [
            'loans' => Loan::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Loans/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $loan = Loan::create($request->only([
            'user_id',
            'borrower_name',
            'borrower_phone',
            'amount',
            'interest_rate',
            'max_months',
            'payable',
            'date_of_borrowing'
        ]));

        $imagePath = null;

        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')
                                ->store('collaterals', 'public');
        }

        Collateral::create([
            'loan_id' => $loan->loan_id,
            'name' => $request->input('collateral_name'),
            'value' => $request->input('collateral_value'),
            'description' => $request->input('description'),
            'image_url' => $imagePath,
        ]);
// dd($request->all(), $request->file('image_url'));

        return redirect()->route('loans.index')
            ->with('success', 'Loan created successfully!');

    }

    /**
     * Display the specified resource.
     */
    public function show(loan $loan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(loan $loan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, loan $loan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(loan $loan)
    {
        //
    }
}
