import React, { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import useProfile from "../../auth/state/useProfile";
import useWallet from "../../auth/state/useWallet";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/state/AuthContext";

export default function ProfilePage() {
    const { state } = useContext(AuthContext);
    const rawToken = state?.token || localStorage.getItem("token");
    let userId = null;
    let redirectFlag = false;

    if (!rawToken) {
        redirectFlag = true;
    } else {
        try {
            ({ userId } = jwtDecode(rawToken));
        } catch {
            redirectFlag = true;
        }
    }

    const { data, save } = useProfile(userId);
    const { balance } = useWallet(userId);
    const [form, setForm] = useState({});

    if (redirectFlag) return <Navigate to="/login" replace />;

    if (!data) return <p className="p-8">Loading...</p>

    const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async e => {
        e.preventDefault();
        await save(form);
        setForm({});
    };

    return (
        <div className = "max-w-2x1 mx-auto p-6 space-y-6">
            <a href="/dashboard" className= "text-indigo-600">← Dashboard</a>

            <h2 className = "text-3x1 font-semibold">Profile</h2>

            <dl className = "grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">
                <dt>Name</dt>
                <dd>{data.firstName} {data.middleName} {data.lastName}</dd>
                <dt>Email</dt><dd>{data.email}</dd>
                <dt>National ID</dt><dd>{data.nationalId}</dd>
                <dt>Wallet</dt>
                <dd>{balance === null ? "…" : 
                    Intl.NumberFormat("vi-VN").format(balance) + " đ"}
                </dd>
            </dl>

            <form onSubmit={submit} className="space-y-4 bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold">Update Details</h3>

                <input name="email" placeholder="New Email" className="w-full border p-2" onChange={handle}/>
                <input name="residenceAddress" placeholder="New Address" className="w-full border p-2" onChange={handle}/>
                <input name="phoneNumber" placeholder="New Phone Number" className="w-full border p-2" onChange={handle}/>
                <input name="password" type="password" placeholder="New password" className="w-full border p-2" onChange={handle}/>

                <button className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
            </form>
        </div>
    );
}