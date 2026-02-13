<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class loan extends Model
{
    protected $primaryKey = 'loan_id';

    protected $fillable = [
        'borrower_name',
        'borrower_phone',
        'amount',
        'interest_rate',
        'max_months',
        'date_of_borrowing',
    ];
}
