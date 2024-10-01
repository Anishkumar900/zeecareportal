import React, { useEffect, useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { FcApproval } from "react-icons/fc";
import { GiExpandedRays } from "react-icons/gi";
import { format, parseISO } from 'date-fns';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default function AppointmentOne(props) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const {
        _id,
        AppointmentDate,
        Name,
        Gender,
        DoctorName,
        Specialty,
        AppointmentTime,
        Information,
        status,
        appointmentNumbar
        // onDelete,
    } = props;

    // Format the appointment date
    const formattedDate = AppointmentDate ? format(parseISO(AppointmentDate), 'yyyy-MM-dd') : 'Date not available';

    // Capitalize the first letter of the name
    const capitalizedName = capitalizeFirstLetter(Name);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleDelete = async () => {
        // console.log(_id);
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/deleteAppointment`, {
                _id: _id
            })
                .then((response) => {
                    // console.log(response.data);
                    setOpen(false);
                    navigate('/Auth/profile')

                })

        }
        catch (err) {
            // console.log(err);
        }
        setOpen(false);
    };

    // console.log(status);
    

    return (
        <div className='bg-purple-50 my-4 p-3'>
            <div className='flex w-full'>
                <div><GiExpandedRays size={28} color='orange' /></div>
                <p className='h-1 my-auto w-full border text-black mx-2'></p>

                <div><RxCrossCircled size={28} color='red' /></div>
                <p className='h-1 my-auto w-full border text-black mx-2'></p>

                <div><FcApproval size={28} /></div>
            </div>
            <div className='md:flex justify-between items-start md:mx-6 mx-2'>
                <div className='text-sm my-2 text-slate-700 font-serif'>
                    {
                        (status==='rejected') && <p className='text-base text-red-600 underline py-1'><span className='font-semibold'>Status: </span>{status}</p>
                    }
                    {
                        (status==='pending') && <p className='text-base text-amber-500 underline py-1'><span className='font-semibold'>Status: </span>{status}</p>
                    }
                    {
                        (status==='approved') && <p className='text-base text-green-600 underline py-1'><span className='font-semibold'>Status: </span>{status}</p>
                    }
                    {
                        !status && <p className='text-base text-sky-600 underline py-1'><span className='font-semibold'>Status: </span>under evaluation</p>
                    }
                    {/* <p className='text-base text-amber-500 underline py-1'><span className='font-semibold'>Status: </span>{status}</p> */}
                    <p className='font-medium py-1'><span className='font-semibold'>Appointment Numbar: </span>{appointmentNumbar}</p>
                    <p className='font-medium py-1'><span className='font-semibold'>Name: </span>{capitalizedName}</p>
                    <p className='py-1'><span className='font-semibold'>Gender: </span>{Gender}</p>
                    <p className='py-1'><span className='font-semibold'>Doctor Name: </span>{DoctorName}</p>
                    <p className='py-1'><span className='font-semibold'>Specialty: </span>{Specialty}</p>
                    <p className='py-1'><span className='font-semibold'>Appointment Time: </span>{AppointmentTime}</p>
                    <p className='py-1'><span className='font-semibold'>Appointment Date: </span>{formattedDate}</p>
                    <p className='py-1'><span className='font-semibold'>Notes: </span>{Information}</p>
                </div>
                <div className='flex gap-3 items-center'>
                    {/* <button className='p-2 text-blue-500 hover:text-blue-700'>
                        <FaEdit size={20} />
                    </button> */}
                    <button className='p-2 text-red-500 hover:text-red-700' onClick={handleClickOpen}>
                        <MdDelete size={20} />
                    </button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" className='text-lg font-bold text-slate-700 underline'>
                            {"Delete Appointment"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <span className='text-red-600'>Are you sure you want to delete this appointment?</span>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={handleDelete} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
