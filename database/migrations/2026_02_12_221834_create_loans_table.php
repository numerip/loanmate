<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id('loan_id');
            // $table->foreignId('user_id')->constrained('users', 'id')->onDelete('cascade');
            $table->string('borrower_name');
            $table->string('borrower_phone');
            $table->decimal('amount', 15, 2);
            $table->decimal('interest_rate', 5, 2);
            $table->decimal('payable',15,2);
            $table->integer('max_months');
            $table->date('date_of_borrowing')->default(now());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
