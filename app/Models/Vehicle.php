<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Vehicle extends Model
{
    use HasFactory;

    public function agiLogs()
    {
        return $this->hasMany(AgiLog::class, 'vehicle_id');
    }

    public function scopeActive(Builder $query)
    {
        return $query->whereNotNull('deleted_at');
    }

    public function scopeAgidriveFirst(Builder $query)
    {
        return $query->orderBy('is_agidrive', 'DESC');
    }
}
