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
            animation: {
                pulse: "pulse 0.3s ease-in-out",
                rotation: "rotation 3s linear infinite",
            },
            keyframes: {
                pulse: {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.2)" },
                    "100%": { transform: "scale(1)" },
                },
                rotation: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
        },
    },

    plugins: [forms],
};
