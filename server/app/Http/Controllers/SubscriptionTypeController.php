<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionTypeResource;
use App\Models\SubscriptionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionTypeController extends Controller
{


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(["error" => "Missing permissions"], 403);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'duration' => 'required|integer|min:0',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $subscriptionType = SubscriptionType::create($request->all());
        return response()->json(new SubscriptionTypeResource($subscriptionType));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubscriptionType  $subscriptionType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(["error" => "Missing permissions"], 403);
        }
        $subscriptionType = SubscriptionType::find($id);
        if (!$subscriptionType) {
            return  response()->json(["error" => "Missing subscription type"], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'price' => 'integer|min:0',
            'duration' => 'integer|min:0',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $subscriptionType->update($request->all());
        return response()->json(new SubscriptionTypeResource($subscriptionType));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubscriptionType  $subscriptionType
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(["error" => "Missing permissions"], 403);
        }
        $subscriptionType = SubscriptionType::find($id);
        if (!$subscriptionType) {
            return  response()->json(["error" => "Missing subscription type"], 404);
        }
        $subscriptionType->delete();
        return response()->noContent();
    }
}
