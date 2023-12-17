<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['isbn', 'name', 'description', 'pages', 'published_year', 'preview', 'content'];

    protected $casts = [
        'id' => 'integer',
        'isbn' => 'string',
        'name' => 'string',
        'description' => 'string',
        'pages' => 'integer',
        'published_year' => 'integer',
        'preview' => 'string',
        'content' => 'string'
    ];

    public function subscriptionTypes()
    {
        return $this->hasMany(SubscriptionType::class);
    }
}
