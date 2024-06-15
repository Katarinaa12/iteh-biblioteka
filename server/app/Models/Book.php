<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['isbn', 'writter', 'name', 'description', 'pages', 'published_year', 'preview', 'content', 'genre_id'];

    protected $casts = [
        'id' => 'integer',
        'genre_id' => 'integer',
        'isbn' => 'string',
        'name' => 'string',
        'writter' => 'string',
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
    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
