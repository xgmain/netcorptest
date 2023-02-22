<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\VehicleResource;

class VehicleController extends Controller
{
    /**
     * retrieve conditional vehicles
     * 
     * @param Request $request
     * @return ResourceCollection $collection
     */
    public function index(Request $request): ResourceCollection
    {
        $vehicles = new Vehicle;

        if ($request->input('active')) { // retrieve active vehicles
            $vehicles = $vehicles->active();
        }

        if ($request->input('isAgidrive')) {
            $vehicles = $vehicles->agidriveFirst();
        }

        // $vehicle = $vehicle->where('is_agidrive', 'on');

        return VehicleResource::collection($vehicles->get());
    }
}
