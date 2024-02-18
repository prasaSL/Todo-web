<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class ToDoControler extends Controller
{
    protected $todo;
    public function __construct()
    {
        $this->todo = new Todo();
    }
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        return $this->todo::where('user_id', $id)->get();
    }

    //


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = [
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'is_completed' => false
        ];
        return $this->todo->create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->todo->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $todo = $this->todo->find($id);
        $todo->update($request->all());
        return $todo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $todo = $this->todo->find($id);
        $todo->delete();
        return $todo;
    }

    public function complete(Request $request, string $id)
    {
        $todo = $this->todo->find($id);

        $todo->save();
        return $todo;
    }
}
