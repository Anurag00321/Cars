'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';

interface ProfileButtonsProps {
    initialListingsOpen: boolean;
    initialReportOpen: boolean
}

export const ProfileButtons: React.FC<ProfileButtonsProps> = ({ initialListingsOpen, initialReportOpen}) => {
    

    const [listingsOpen, setListingsOpen] = useState(initialListingsOpen)
    const [reportOpen, setReportOpen] = useState(initialReportOpen)

    const router = useRouter();

    // const handleListingsClick = () => {
    //     setListingsOpen(true)
    // }
    
    const handleReportClick = () => {
        setReportOpen(true)
    }

    const handleListingsClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('', 'listings');
      
        router.push(`/profile/dashboard?${queryParams.toString()}`);
      };    

    return (
        <div>
            <button onClick={handleListingsClick} className="bg-slate-400 py-4 px-2 m-2">User listings</button>
            <button onClick={handleReportClick} className="bg-slate-400 py-4 px-2 m-2">Reports</button>
        </div>
    )
};

export default ProfileButtons