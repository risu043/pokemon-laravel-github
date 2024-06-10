import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                zenKaku: ["Zen Kaku Gothic Antique", "sans-serif"],
                dela: ["Dela Gothic One", "sans-serif"],
            },
            colors: {
                transparent: "transparent",
                white: "#ffffff",
                glay: "#f5f5f5",
                red: "#f43f5e",
                blue: "#60a5fa",
                black: "#262626",
            },
        },
    },

    plugins: [forms],
};
