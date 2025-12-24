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
        Schema::create('flowcashes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flowcash_category_id')->constrained()->onUpdate('cascade')->onDelete('cascade');; 
            $table->date('date');
            $table->decimal('amount', 15, 2);
            $table->text('description')->nullable();
            $table->enum('type', ['income', 'expense']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flowcashes');
    }
};
