<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'post_id',
        'comment_id',
        'content',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 0);
    }

    public function scopeResolved($query)
    {
        return $query->where('status', 1);
    }
}
