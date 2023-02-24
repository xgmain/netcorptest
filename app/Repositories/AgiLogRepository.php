<?php

namespace App\Repositories;

use App\Models\AgiLog;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDOException;
use Throwable;

class AgiLogRepository
{
    private $log;

    public function __construct()
    {
        $this->log = new AgiLog;
    }

    /**
     * retrieve the monthly log count with the most recent month at the top
     * 
     * @param int $id
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Database\Eloquent\Collection $collection
     */
    public function logCount(int $id, Request $request): Collection
    {
        try {
            $logs = $this->log->selectRaw('
                year(local_time) year, 
                monthname(local_time) month, 
                day(local_time) day, 
                count(*) count, 
                vehicle_id id,
                (select name from vehicles where id = ?) vehicle_name,
                local_time
            ', [$id])
            ->where('vehicle_id', $id)
            ->groupBy('year', 'month', 'day');

            if ($request->input('latest')) {
                $logs = $logs->orderBy('local_time', 'DESC');
            }

        } catch (\Illuminate\Database\QueryException $e) {
            dd($e->getMessage());
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            dd($e->getMessage());
        } catch (PDOException $e) {
            dd($e->getMessage());
        } catch (Throwable $e) {
            dd($e->getMessage());
        }

        $response = $logs->get();

        if ($response->count() === 0) {
            throw new \Exception('Data not found', 404);
        }

        return $response;
    }

    /**
     * Find the last/latest agi_log, it has lat&lng
     * 
     * @param int $id
     * @return AgiLog $log
     */
    public function lastInfo(int $id): AgiLog
    {
        try {
            $log = $this->log->selectRaw('
                vehicle_id, 
                local_time, 
                lat, 
                lng, 
                speed, 
                direction,
                (select name from vehicles where id = ?) vehicle_name
            ', [$id])
            ->where('vehicle_id', $id)
            ->last();

        } catch (\Illuminate\Database\QueryException $e) {
            dd($e->getMessage());
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            dd($e->getMessage());
        } catch (PDOException $e) {
            dd($e->getMessage());
        } catch (Throwable $e) {
            dd($e->getMessage());
        }

        $response = $log->first();

        if (!$response) {
            throw new \Exception('Data not found', 404);
        }

        return $response; 
    }
}
