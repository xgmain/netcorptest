<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AgiLog;
use App\Http\Resources\AgiLogResource;
use App\Http\Resources\AgiLogAddressResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Repositories\AgiLogRepository;

class AgiLogController extends Controller
{
    /**
     * retrieve the monthly log count with the most recent month at the top
     * 
     * @param int $id
     * @return ResourceCollection $collection
     */
    public function logCount(int $id, Request $request)
    {
        try {
            return AgiLogResource::collection((new AgiLogRepository)->logCount($id, $request));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getcode());
        }
    }

    /**
     * Find the last/latest agi_log, it has lat&lng
     * 
     * @param int $id
     * @return AgiLogResource $reourse
     */
    public function lastInfo(int $id)
    {
        try {
            return new AgiLogAddressResource((new AgiLogRepository)->lastInfo($id));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], $e->getcode());
        }
    }
}
