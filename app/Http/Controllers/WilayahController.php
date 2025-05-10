<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WilayahController extends Controller
{
    private $baseUrl;

    public function __construct()
    {
        $this->baseUrl = env('WILAYAH_API_URL', 'https://emsifa.github.io/api-wilayah-indonesia/api');
    }
    /**
     * Get a list of provinces in Indonesia from API.
     */
    public function getProvinces(Request $request)
    {
        $response = Http::get("{$this->baseUrl}/provinces.json");

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch provinces'], 500);
        }

        return $response->json();
    }

    /**
     * Get a list of cities in a specific province from API.
     */

    public function getCities(Request $request, string $provinceId)
    {
        $response = Http::get("{$this->baseUrl}/regencies/$provinceId.json");

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch cities'], 500);
        }


        return $response->json();
    }
}
