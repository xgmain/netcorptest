<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgiLogAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'vehicle_id' => $this->vehicle_id,
            "local_time" => $this->local_time,
            "lat" => $this->lat,
            "lng" => $this->lng,
            "speed" => $this->speed,
            "direction" => $this->direction,
            "vehicle_name" => $this->vehicle_name,
            'address' => $this->address,
        ];
    }
}
