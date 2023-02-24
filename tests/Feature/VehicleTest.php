<?php

namespace Tests\Feature;

use Tests\TestCase;

class VehicleTest extends TestCase
{
    public function testListVehicleSuccessfully()
    {        
        $this->json('GET', 'api/v1/vehicles', ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        "id",
                        "name",
                        "is_agidrive"
                    ]
                ]
            ]);
    }

    public function testListActiveVehicleTopSuccessfully()
    {        
        $this->json('GET', 'api/v1/vehicles?active=true', ['Accept' => 'application/json'])
            ->assertStatus(200);

        $this->assertDatabaseHas('vehicles',
            [
                "id" => 33,
                "name" => "OBD 10919",
                "is_agidrive" => null
            ]
        );
    }
}
