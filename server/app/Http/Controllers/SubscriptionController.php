<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;
use App\Models\SubscriptionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionController extends Controller
{


    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (!$user->admin) {
            return response()->json(SubscriptionResource::collection(Subscription::query()->where('user_id', $user->id)->get()));
        }
        return response()->json(SubscriptionResource::collection(Subscription::all()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subscriptionTypeId' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $subscriptionType = SubscriptionType::find($request->subscriptionTypeId);
        if (!$subscriptionType) {
            return response()->json(['error' => 'Missing subscription type'], 400);
        }
        $user = $request->user();
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'name' => $subscriptionType->name,
            'duration' => $subscriptionType->duration,
            'book_id' => $subscriptionType->book_id,
            'price' => $subscriptionType->price,
            'status' => 'pending'
        ]);
        return response()->json(new SubscriptionResource($subscription));
    }

    public function accept(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(["error" => "Missing permissions"], 403);
        }
        $subscription = Subscription::find($id);
        if (!$subscription) {
            return response()->json(['error' => 'Missing subscription'], 404);
        }
        if ($subscription->status != 'pending') {
            return response()->json(['error' => 'Subscription is in invalid status'], 400);
        }
        $now = date('Y-m-d H:i:s');
        $subscription->update([
            'start_time' =>  $now,
            'end_time' => date('Y-m-d H:i:s', time() + $subscription->duration * 24 * 60 * 60),
            'status' => 'accepted'
        ]);
        return response()->json(new SubscriptionResource($subscription));
    }

    public function reject(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(["error" => "Missing permissions"], 403);
        }
        $subscription = Subscription::find($id);
        if (!$subscription) {
            return response()->json(['error' => 'Missing subscription'], 404);
        }
        if ($subscription->status != 'pending') {
            return response()->json(['error' => 'Subscription is in invalid status'], 400);
        }
        $subscription->update([
            'status' => 'rejected'
        ]);
        return response()->json(new SubscriptionResource($subscription));
    }
}
