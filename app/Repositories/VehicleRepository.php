<?php

namespace App\Repositories;

use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class VehicleRepository
{
    private $vehicle;

    public function __construct()
    {
        $this->vehicle = new Vehicle;
    }

    /**
     * retrieve conditional vehicles
     * 
     * @param Request $request
     * @return Illuminate\Database\Eloquent\Collection $collection
     */
    public function index(Request $request): Collection
    {
        if ($request->input('active')) { // retrieve active vehicles
            $this->vehicle->active();
        }

        if ($request->input('isAgidrive')) { // agi drive on top
            $this->vehicle->agidriveFirst();
        }

        return $this->vehicle->get();
    }
}
