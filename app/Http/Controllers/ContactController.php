<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Mail\ContactSendmail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    //
    public function create(): Response
    {
        // return Inertia::render('Contact', [
        //     'status' => session('status'),
        // ]);
        return Inertia::render('Contact/Contact');
    }

    public function store(Request $request): RedirectResponse
    {
        $contact = $request->all();

        // 環境変数からメールアドレスを取得
        // $fromAddress = env('MAIL_FROM_ADDRESS');
        $fromAddress = 'info@risu-3-pokemon.net';

        // メールを送信
        Mail::to($fromAddress)->send(new ContactSendmail($contact));

        // セッションのトークンを再生成
        $request->session()->regenerateToken();

        return redirect()->route('contact.request');
    }
}

