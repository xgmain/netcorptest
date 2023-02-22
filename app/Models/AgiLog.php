<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Eloquent\Casts\Attribute;

class AgiLog extends Model
{
    use HasFactory;

    protected $table = 'agi_log';

    public function vehicles()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    public function scopeLast(Builder $query)
    {
        return $query->orderBy('local_time', 'DESC');
    }

    public function address(): Attribute
    {
        $basic = config('map.http_basic');
        $format = config('map.format');
        $key = config('map.map_key');
        $lat = $this->lat;
        $lng = $this->lng;

        $endpoint = $basic.$lat.','.$lng.'?o='.$format.'&key='.$key;

        $response = Http::get($endpoint);   

        $body = json_decode($response->getBody(), true);

        $address = $body['resourceSets'][0]['resources'][0]['name'];

        return Attribute::make(
            get: fn () => $address,
        );
    }
}
