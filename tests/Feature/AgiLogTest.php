<?php

namespace Tests\Feature;

use Tests\TestCase;

class AgiLogTest extends TestCase
{
    public function testlistAgiLogSuccessfully()
    {
        $this->json('GET', 'api/v1/agilogs/115/logCount', ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        "id",
                        "vehicle_name",
                        "count",
                        "year",
                        "month",
                        "day"
                    ]
                ]
            ]);
    }

    public function testthisAgiLogNotFound()
    {
        $this->json('GET', 'api/v1/agilogs/1/logCount', ['Accept' => 'application/json'])
            ->assertStatus(404);
    }

    public function testlistAgiLastInfoSuccessfully()
    {
        $this->json('GET', 'api/v1/agilogs/115/lastInfo', ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    "vehicle_id",
                    "local_time",
                    "lat",
                    "lng",
                    "speed",
                    "direction",
                    "vehicle_name",
                    "address"
                ]
            ]);
    }

    public function testthisAgiLogLastInfoNotFound()
    {
        $this->json('GET', 'api/v1/agilogs/1/lastInfo', ['Accept' => 'application/json'])
            ->assertStatus(404);
    }
}
