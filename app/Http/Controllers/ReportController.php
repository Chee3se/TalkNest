<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::with('post')
            ->orderBy('status', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Reports/Index', ['reports' => $reports]);
    }

    public function store()
    {
        $data = request()->validate([
            'type' => 'required',
            'content' => 'required',
            'post_id' => 'nullable',
            'comment_id' => 'nullable',
        ]);

        if (is_null($data['post_id']) && is_null($data['comment_id'])) {
            return redirect()->back()->withErrors(['post_id' => 'Either post_id or comment_id must be provided.']);
        }

        $data['user_id'] = auth()->id();
        $data['status'] = 0;

        Report::create($data);

        return redirect()->back();
    }

    public function resolve(Request $request, Report $report)
    {
        $report->update(['status' => 1]);

        if ($request->delete_post) {
            $report->post->delete();
        }

        return redirect()->back();
    }
}
