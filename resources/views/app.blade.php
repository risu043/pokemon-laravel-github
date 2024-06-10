<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <meta
        name="description"
        content="りすさんのポケモン図鑑"
        />
        <meta property="og:url" content="https://example.com/index.html" />
        <meta property="og:title" content="ポケモン図鑑" />
        <meta
          property="og:description"
          content="りすさんのポケモン図鑑"
        />
        <meta
          property="og:image"
          content="https://example.com/images/ogp.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ポケモン図鑑" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
