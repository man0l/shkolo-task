<?php

use App\Models\Button;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('get all buttons returns empty array when no buttons exist', function () {
    $response = $this->get('/api/buttons');
    
    $response->assertStatus(200);
    $response->assertJson([]);
});

test('get all buttons returns all buttons', function () {
    // Create some test buttons
    Button::create([
        'title' => 'Test Button 1',
        'link' => 'https://example.com/1',
        'color' => '#FF0000',
        'order' => 1,
    ]);
    
    Button::create([
        'title' => 'Test Button 2',
        'link' => 'https://example.com/2',
        'color' => '#00FF00',
        'order' => 2,
    ]);
    
    $response = $this->get('/api/buttons');
    
    $response->assertStatus(200);
    $response->assertJsonCount(2);
    $response->assertJsonPath('0.title', 'Test Button 1');
    $response->assertJsonPath('1.title', 'Test Button 2');
});

test('create a button', function () {
    $buttonData = [
        'title' => 'New Button',
        'link' => 'https://example.com/new',
        'color' => '#0000FF',
        'order' => 3,
    ];
    
    $response = $this->postJson('/api/buttons', $buttonData);
    
    $response->assertStatus(201);
    $response->assertJsonPath('title', 'New Button');
    
    // Check if it exists in the database
    $this->assertDatabaseHas('buttons', $buttonData);
});

test('get a specific button', function () {
    // Create a button
    $button = Button::create([
        'title' => 'Test Button',
        'link' => 'https://example.com/test',
        'color' => '#FFFF00',
        'order' => 4,
    ]);
    
    $response = $this->get('/api/buttons/' . $button->id);
    
    $response->assertStatus(200);
    $response->assertJsonPath('title', 'Test Button');
});

test('update a button', function () {
    // Create a button
    $button = Button::create([
        'title' => 'Original Button',
        'link' => 'https://example.com/original',
        'color' => '#123456',
        'order' => 5,
    ]);
    
    $updatedData = [
        'title' => 'Updated Button',
        'link' => 'https://example.com/updated',
        'color' => '#654321',
        'order' => 6,
    ];
    
    $response = $this->putJson('/api/buttons/' . $button->id, $updatedData);
    
    $response->assertStatus(200);
    $response->assertJsonPath('title', 'Updated Button');
    
    // Check if it was updated in the database
    $this->assertDatabaseHas('buttons', $updatedData);
});

test('delete a button', function () {
    // Create a button
    $button = Button::create([
        'title' => 'Button to Delete',
        'link' => 'https://example.com/delete',
        'color' => '#999999',
        'order' => 7,
    ]);
    
    $response = $this->delete('/api/buttons/' . $button->id);
    
    $response->assertStatus(204);
    
    // Check if it was removed from the database
    $this->assertDatabaseMissing('buttons', ['id' => $button->id]);
});
