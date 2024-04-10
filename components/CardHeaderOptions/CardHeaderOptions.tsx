"use client"

import styles from "./CardHeaderOptions.module.scss";
import React, { useState } from 'react';
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function CardHeaderOptions({ title, paragraphText, link, sourceText }: { title: string, paragraphText: string, link: string, sourceText: string }) {

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div className={styles.headerArea}>
            <h2>{title}</h2>
            <IconButton aria-label="expand" sx={{ color: '#1C1C1C' }} onClick={handleDialogOpen}>
                <MoreHorizIcon fontSize="medium" />
            </IconButton>
            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md" className={styles.modal} PaperProps={{
                sx: {
                    padding: '16px'
                }
            }}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#1C1C1C' }}>
                        <p>
                            {paragraphText}
                        </p>
                        <p>
                            <b>Source:</b> <Link href={link} target="_blank" >{sourceText}</Link>
                        </p>
                    </DialogContentText>
                    <DialogActions>
                        <Button variant="contained" onClick={handleDialogClose}>
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}