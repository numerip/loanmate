<?php

namespace App\Http\Controllers;

use App\Models\Collateral;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollateralController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Inertia::render('Collaterals/Index', [
            'collaterals' => Collateral::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Collateral $collateral)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Collateral $collateral)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Collateral $collateral)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collateral $collateral)
    {
        //
    }
}
