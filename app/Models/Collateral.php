<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collateral extends Model
{
    protected $primaryKey = 'collateral_id';

    protected $fillable = [
        'loan_id',
        'name',
        'description',
        'value',
        'image_url',
    ];
}
