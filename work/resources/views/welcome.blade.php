<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ env('APP_NAME', 'Laravel') }}</title>

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- css -->
        @if(app('env')=='local')
            <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        @endif
        @if(app('env')=='production')
            <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
        @endif

         <!-- Scripts -->
        @if(app('env')=='local')
            <script src="{{ asset('js/app.js') }}" defer></script>
        @endif
        @if(app('env')=='production')
            <script src="{{ secure_asset('js/app.js') }}" defer></script>
        @endif
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>