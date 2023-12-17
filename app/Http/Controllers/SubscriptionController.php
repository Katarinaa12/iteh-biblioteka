<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\SubscriptionType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionController extends Controller
{


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
        if (!$validator->fails()) {
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
            'book_id' => $subscriptionType->book_id,
            'price' => $subscriptionType->price,
            'status' => 'pending',
        ]);
    }
}
