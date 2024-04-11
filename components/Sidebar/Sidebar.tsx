"use client"

import styles from "./Sidebar.module.scss";
import React, { useState } from 'react';
import Image from "next/image";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import LogoFullImage from '@/images/logoFull.svg'
import LogoImage from '@/images/logo.svg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function Sidebar() {

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <nav className={styles.container}>
            <a href="/" className={styles.logoLink}>
                <Image
                    src={LogoImage}
                    alt="Connective Logo"
                    width={55}
                />
            </a>
            <IconButton aria-label="infoModal" onClick={handleDialogOpen} sx={{ color: '#27374D' }}>
                <InfoIcon fontSize="medium" />
            </IconButton>

            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md" className={styles.modal} PaperProps={{
                sx: {
                    padding: '24px'
                }
            }}>
                <DialogContent>
                    <DialogContentText sx={{ color: '#1C1C1C' }}>
                        <div className={styles.logoContainer}>
                            <div className={styles.logoWrapper}>
                                <Image
                                    src={LogoFullImage}
                                    alt="Connective Logo"
                                    width={300}
                                />
                                {/* <h1>Connective</h1> */}
                            </div>
                            <p>visualising the rise of global connections</p>
                        </div>
                        <p>
                            Welcome to Connective, a web dashboard where we visualize and showcase the rise of positive global connections. Dive into dynamic charts illustrating the surge in internet usage worldwide.
                        </p>
                        <p>
                            Explore our interactive charts to gain insights into the evolving digital landscape. Delve into comprehensive data representations highlighting trends in internet usage. Uncover the stories behind the numbers and chart a course towards a more connected future.
                        </p>
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="contained" onClick={handleDialogClose}>
                            Continue
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </nav>
    );
}