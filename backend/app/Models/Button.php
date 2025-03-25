<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Button extends Model
{
    protected $fillable = ['title', 'link', 'color', 'order'];
}
