import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UserCard from "../../Components/UserCard";
import { UsersPageProps } from "../../types";

export default function Index({ auth, users, favorites }: UsersPageProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="おともだち" />
            <div className="container mx-auto w-full max-w-2xl py-16 px-4">
                {users.map((user, i) => {
                    return (
                        <UserCard key={i} user={user} favorites={favorites} />
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
