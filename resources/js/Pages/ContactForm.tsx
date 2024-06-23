import GuestLayout from "../Layouts/GuestLayout";
import InputError from "../Components/InputError";
import PrimaryButton from "../Components/PrimaryButton";
import TextInput from "../Components/TextInput";
import InputLabel from "../Components/InputLabel";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import React from "react";

export default function ContactForm() {
    // const { data, setData, post, processing, errors } = useForm({
    //     name: "",
    //     email: "",
    //     content: "",
    // });

    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault();

    //     post(route("contact.send"));
    // };

    return (
        <GuestLayout>
            <Head title="お問い合わせ" />

            <div className="mb-4 text-sm text-gray-600">otoiawase form</div>

            {/* <form onSubmit={submit}>
                <InputLabel htmlFor="name" value="お名前" />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
                <InputLabel htmlFor="email" value="メールアドレス" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
                <InputLabel htmlFor="content" value="お問い合わせ内容" />
                <TextInput
                    id="content"
                    type="text"
                    name="content"
                    value={data.content}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("content", e.target.value)}
                />
                <InputError message={errors.content} className="mt-2" />
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        送信する
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
// function route(routeName: string): string {
//     switch (routeName) {
//         case "contact.send":
//             return "/contact";
//         default:
//             throw new Error(`Undefined route: ${routeName}`);
//     }
// }
