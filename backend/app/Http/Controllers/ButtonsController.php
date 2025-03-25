<?php

namespace App\Http\Controllers;

use App\Models\Button;
use App\Http\Requests\StoreButtonRequest;
use App\Http\Requests\UpdateButtonRequest;
use Illuminate\Support\Facades\Log;
class ButtonsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buttons = Button::orderBy('order', 'asc')->get();
        return response()->json($buttons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreButtonRequest $request)
    {
        try {
            $button = Button::create($request->validated());
            return response()->json($button, 201);
        } catch (\Exception $e) {
            Log::error('Failed to create button', [
                'error' => $e->getMessage(),
                'data' => $request->validated()
            ]);
            throw $e;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Button $button)
    {
        return response()->json($button);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateButtonRequest $request, Button $button)
    {
        try {
            $button->update($request->validated());
            return response()->json($button);
        } catch (\Exception $e) {
            Log::error('Failed to update button', [
                'id' => $button->id,
                'error' => $e->getMessage(),
                'data' => $request->validated()
            ]);
            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Button $button)
    {
        try {
            $button->delete();
            return response()->noContent();
        } catch (\Exception $e) {
            Log::error('Failed to delete button', [
                'id' => $button->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }
}
