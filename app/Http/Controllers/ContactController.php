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
    public function request(): Response
    {
        return Inertia::render('ContactForm');
    }

    public function send(Request $request): RedirectResponse
    {
        $contact = $request->all();

        // ユーザーのメールアドレスを取得
        $userEmail = $contact['email'];

        // メールを送信
        Mail::to($userEmail)->send(new ContactSendmail($contact));

        // セッションのトークンを再生成
        $request->session()->regenerateToken();

        return redirect()->route('contact.request');
    }
}

