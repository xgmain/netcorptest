<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AgiLog;
use App\Http\Resources\AgiLogResource;
use App\Http\Resources\AgiLogAddressResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AgiLogController extends Controller
{
    /**
     * retrieve the monthly log count with the most recent month at the top
     * 
     * @param int $id
     * @return ResourceCollection $collection
     */
    public function logCount(int $id, Request $request): ResourceCollection
    {
        $logs = AgiLog::where('vehicle_id', $id)
            ->selectRaw('
                year(local_time) year, 
                monthname(local_time) month, 
                day(local_time) day, 
                count(*) count, 
                vehicle_id id,
                (select name from vehicles where id = ?) vehicle_name,
                local_time
            ', [$id])
            ->groupBy('year', 'month', 'day');

        if ($request->input('latest')) {
            $logs = $logs->orderBy('local_time', 'DESC');
        }

        return AgiLogResource::collection($logs->paginate(10));
    }

    /**
     * Find the last/latest agi_log, it has lat&lng
     * 
     * @param int $id
     * @return AgiLogResource $reourse
     */
    public function lastInfo(int $id): AgiLogAddressResource
    {
        $log = AgiLog::where('vehicle_id', $id)
            ->selectRaw('vehicle_id, local_time, lat, lng, speed, direction,
                (select name from vehicles where id = ?) vehicle_name
            ', [$id])
            ->last();

        $data = $log->first();

        return new AgiLogAddressResource($data);
    }
}
