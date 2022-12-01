import { useState } from "react";
import { toast } from "react-toastify";

const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // eslint-disable-line no-useless-escape
const telRegex = /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/;

export default function Register() {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('EMAIL');

    const handleSubmit = () => {
        if (type === 'EMAIL' && !emailRegex.test(email)) {
            toast.warn('Please enter a valid email address');
            return;
        }
        if (type === 'SMS' && !telRegex.test(email)) {
            toast.warn('Please enter a valid phone number');
            return;
        }
        if (!addressRegex.test(address)) {
            toast.warn('Please enter a valid Ethereum address');
            return;
        }

        console.log(email, address);
        fetch('/mcgill/sd-nft/api/trackedAddress', {
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