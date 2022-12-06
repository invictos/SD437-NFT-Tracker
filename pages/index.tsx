import { useEffect, useState } from "react";
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
        const apicall = fetch('/mcgill/sd-nft/api/trackedAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: address,
                receiverType: type,
                receiverPayload: email
            })
        }).then(res => {
            if (res.status !== 200){
                throw null;
            }
        });
        
        toast.promise(apicall, {
            pending: 'Adding address...',
            success: 'Address added successfully',
            error: 'Error adding address'
        });
    };

    useEffect(() => {
        setEmail('');
    }, [type]);

    return <>
        <div>
            <h1>Register an ethereum address for tracking</h1>
            <h3>Notification method</h3>
            <select onChange={e => setType(e.target.value)}>
                <option value="EMAIL">Email</option>
                <option value="SMS">SMS</option>
            </select>
            <input type={type == 'EMAIL' ? 'email' : 'tel'} placeholder={type == 'EMAIL' ? 'foo@mail.org' : '+15141234321'} value={email} onChange={e => setEmail(e.target.value)} />
            <h3>Ethereum address</h3>
            <input type="text" placeholder="address" value={address} onChange={e => setAddress(e.target.value)}/>
            <br/>
            <button onClick={handleSubmit}>Register Tracking</button>
        </div>
    </>
}