<?php

namespace App\Http\Controllers;

use App\Models\Button;
use App\Http\Requests\StoreButtonRequest;
use App\Http\Requests\UpdateButtonRequest;

class ButtonsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buttons = Button::all();
        return response()->json($buttons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreButtonRequest $request)
    {
        $button = Button::create($request->all());
        return response()->json($button, 201);
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
        $button->update($request->all());
        return response()->json($button);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Button $button)
    {
        $button->delete();
        return response()->noContent();
    }
}
