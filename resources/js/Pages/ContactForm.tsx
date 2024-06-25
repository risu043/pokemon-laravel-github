import GuestLayout from "../Layouts/GuestLayout";
import InputError from "../Components/InputError";
import PrimaryButton from "../Components/PrimaryButton";
import TextInput from "../Components/TextInput";
import Textarea from "../Components/Textarea";
import InputLabel from "../Components/InputLabel";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Transition } from "@headlessui/react";

export default function ContactForm() {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            content: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("contact.send"));
    };

    return (
        <GuestLayout>
            <Head title="お問い合わせ" />

            <div className="my-4 text-2xl text-center text-gray-600">
                お問い合わせフォーム
            </div>
            <form onSubmit={submit}>
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
                <InputError message={errors.name} className="mt-2 text-red" />
                <InputLabel
                    htmlFor="email"
                    value="メールアドレス"
                    className="mt-4"
                />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2 text-red" />
                <InputLabel
                    htmlFor="content"
                    value="お問い合わせ内容"
                    className="mt-4"
                />
                <Textarea
                    id="content"
                    name="content"
                    value={data.content}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("content", e.target.value)}
                />
                <InputError
                    message={errors.content}
                    className="mt-2 text-red"
                />
                <div className="flex items-center justify-end mt-8">
                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">送信しました！</p>
                    </Transition>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        送信する
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
function route(routeName: string): string {
    switch (routeName) {
        case "contact.send":
            return "/contact";
        default:
            throw new Error(`Undefined route: ${routeName}`);
    }
}
