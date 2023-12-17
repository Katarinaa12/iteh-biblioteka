<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionType extends Model
{
    use HasFactory;
    protected $fillable = ['book_id', 'name', 'price', 'duration'];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'book_id' => 'integer',
        'price' => 'decimal:2',
        'duration' => 'string'
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
