<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        Log::info('Profile update request received.');

        $request->user()->fill($request->safe()->only(['name', 'email']));

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($request->hasFile('picture')) {
            Log::info('Picture file is present.');
            Log::info('Picture file size: ' . $request->file('picture')->getSize());

            $path = $request->file('picture')->store('images', 'public');
            Log::info('File stored at: ' . $path);

            $request->user()->profile_photo_path = $path;
        } else {
            Log::warning('No picture file found in the request.');
        }

        $request->user()->save();

        Log::info('Profile updated successfully.');

        return Redirect::route('profile.edit')->with('status', 'Profile updated successfully!');
    }
//     public function update(ProfileUpdateRequest $request): RedirectResponse
// {
//     $request->user()->fill($request->safe()->only(['name', 'email']));

//     if ($request->user()->isDirty('email')) {
//         $request->user()->email_verified_at = null;
//     }

//     if ($request->hasFile('picture')) {
//         $path = $request->file('picture')->store('images', 'public');
//         $request->user()->profile_photo_path = $path;
//     }

//     $request->user()->save();

//     return Redirect::route('profile.edit');
// }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
