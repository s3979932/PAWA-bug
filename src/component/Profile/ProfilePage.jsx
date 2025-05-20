import React, { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import useProfile from "../../auth/state/useProfile";
import useWallet from "../../auth/state/useWallet";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/state/AuthContext";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { state } = useContext(AuthContext);
    const rawToken = state?.token || localStorage.getItem("token");
    let userId = null;
    let redirectFlag = false;

    if (!rawToken) {
        redirectFlag = true;
    } else {
        try {
            ({ userId } = jwtDecode(rawToken));
            if (!userId) redirectFlag = true;
        } catch {
            redirectFlag = true;
        }
    }

    const { data, save } = useProfile(userId);
    const { balance } = useWallet(userId);
    const [form, setForm] = useState({
        email: "",
        residenceAddress: "",
        phoneNumber: "",
        password: ""
    });

    if (redirectFlag) return <Navigate to="/login" replace />;

    if (!data) return <p className="p-8">Loading...</p>

    const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async e => {
        e.preventDefault();

        const body = {};
        if (form.email) body.email = form.email;
        if (form.residenceAddress) body.residenceAddress = form.residenceAddress;
        if (form.phoneNumber) body.phoneNumber = form.phoneNumber;
        if (form.password) body.password = form.password

        if (Object.keys(body).length === 0) return;

        await save(body);
        if (body.email || body.password) {
            return navigate("/login", { replace: true });
        }
        setForm({ email: "", residenceAddress: "", phoneNumber: "", password: ""});
    };

    return (
        <div className = "max-w-2x1 mx-auto p-6 space-y-6">
            <a href="/dashboard" className= "text-indigo-600">← Dashboard</a>

            <h2 className = "text-3x1 font-semibold text-center">Profile</h2>

            <dl className = "grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">
                <dt>Name</dt>
                <dd>{data.firstName} {data.middleName} {data.lastName}</dd>
                <dt>Email</dt><dd>{data.email}</dd>
                <dt>National ID</dt><dd>{data.nationalId}</dd>
                <dt>Date of Birth</dt><dd>{data.dateOfBirth}</dd>
                <dt>Address</dt><dd>{data.residenceAddress}</dd>
                <dt>Phone Number</dt><dd>{data.phoneNumber}</dd>
                <dt>Student ID</dt><dd>{data.studentId || "-"}</dd>
                <dt>Disability</dt><dd>{data.disabilityStatus ? "Yes" : "No"}</dd>
                <dt>Revolutionary Contribution</dt><dd>{data.revolutionaryContributionStatus ? "Yes" : "No"}</dd>
                <dt>Wallet Balance</dt>
                <dd>{balance === null ? "…" : 
                    Intl.NumberFormat("vi-VN").format(balance) + " đ"}
                </dd>
            </dl>

            <form onSubmit={submit} className="space-y-4 bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold text-center mb-4">Update Details</h3>
                
                <div className="flex flex-col gap-2">
                    <label className="self-center font-bold">Email</label>
                    <input name="email" type="email" value={form.email} placeholder="New Email" className="w-full border p-2" onChange={handle}/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="self-center font-semibold">Address</label>
                    <input name="residenceAddress" value={form.residenceAddress} placeholder="New Address" className="w-full border p-2" onChange={handle}/>
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="self-center font-semibold">Phone Number</label>
                    <input name="phoneNumber" value={form.phoneNumber} placeholder="New Phone Number" className="w-full border p-2" onChange={handle}/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="self-center font-semibold">Password</label>        
                    <input name="password" type="password" value={form.password} placeholder="New password" className="w-full border p-2" onChange={handle}/>
                </div>

                <button className="bg-indigo-600 text-black px-4 py-2 rounded">Save</button>
            </form>
        </div>
    );
}