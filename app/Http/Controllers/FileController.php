<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{

    public function uploadFile(Request $request)
    {
        $user = $request->user();
        if (!$user->admin) {
            return response()->json(["error" => "Missing permissions"], 403);
        }
        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:doc,docx,pdf,txt,csv|max:2048',
        ]);

        if ($validator->fails()) {

            return response()->json(['error' => $validator->errors()], 401);
        }


        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = $file->getClientOriginalName();
            Storage::disk('local')->put($filename, $file);
        }
        return response()->noContent();
    }

    public function getBookFile(Request $request, $bookId)
    {
        $book = Book::find($bookId);
        $user = $request->user();
        $fileName = $book->content;
        if ($user->admin) {
            return response(Storage::disk('local')->get($fileName));
        }
        $now = time();
        $subscription = Subscription::where('book_id', $bookId)->where('user_id', $user->id)
            ->where('status', 'accepted')
            ->where('start_time', '<=', $now)
            ->where('end_time', '>=', $now)
            ->first();
        if (!$subscription) {
            return response()->json(["error" => "Missing subscription"], 403);
        }
        return response(Storage::disk('local')->get($fileName));
    }
}
