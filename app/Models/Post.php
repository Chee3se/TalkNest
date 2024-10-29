<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'category_id',
        'user_id',
    ];

    public function userRate()
    {
        return $this->hasOne(Rate::class)->where('user_id', auth()->id());
    }
}
