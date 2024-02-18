<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $table = 'todo_list';
    protected $fillable = ['title', 'description', 'is_completed', 'due_date', 'user_id'];
}
