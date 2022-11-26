import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('EMAIL');

    const handleSubmit = () => {
        console.log(email, address);
        fetch('http://localhost:3000/api/trackedAddress/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: address,
                receiverType: type,
                receiverPayload: email
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
            toast.success('Address added successfully');
        }).catch(err => {
            console.log(err);
            toast.error('Error adding address');
        });
    };

    return <>
        <div>
            <h1>Register</h1>
            <select onChange={e => setType(e.target.value)}>
                <option value="EMAIL">Email</option>
                <option value="SMS">SMS</option>
            </select>
            <input type="text" placeholder={type} value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="address" value={address} onChange={e => setAddress(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </>
}