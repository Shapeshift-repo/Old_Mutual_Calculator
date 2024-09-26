'use client';

import React, { useState } from 'react';

import Link from 'next/link'
import Button from './Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
};

export default function Footer() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <footer className="bg-[#252525] pt-[55px] pb-[40px]">
        <div className="container">
            <div className="flex gap-[40px] items-center justify-center lg:justify-between">
                <div className="copy-right-section w-[280px] lg:w-full text-[12px] leading-[18px] lg:text-[14px] lg:leading-[23px] text-white font-light [&>p]:mb-[10px]">
                    <p>Copyright Old Mutual Limited 2024</p>
                    <p>Old Mutual Life Assurance Company (SA) Limited is a licensed FSP and Life Insurer.</p>
                    <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-[10px] [&>li>a:hover]:underline">
                        <li>
                            <Link className="link" href="/">
                                Disclaimer
                            </Link>
                        </li>
                        <li className="hidden lg:inline-block">|</li>
                        <li>
                            <Link className="link" href="/">
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="hidden lg:inline-block">|</li>
                        <li>
                            <Link className="link" href="/">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                    <Button label="ASSUMPTIONS" onClick={handleOpen} className="h-[35px] w-[184px] text-[13px] leading-[15px] mt-[15px]" />
                </div>
            </div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-primary text-[20px] leading-[20px] mb-[34px]">
                Assumptions
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className='text-[16px] leading-[24px] [&>h6]:mb-[30px] [&>h6]:font-bold'>
                    <h6>Lorem ipsum dolor sit amet</h6>
                    <p>Consectetur adipiscing elit. Vivamus pretium egestas aliquam. Proin sed est lorem. Etiam vel felis ac odio hendrerit tempus. Maecenas luctus vitae felis id tempor. Nulla sit amet ligula et lacus elementum consectetur id ut arcu. Donec facilisis orci malesuada, convallis velit scelerisque, porta velit. Ut commodo diam lectus, sit amet malesuada orci finibus et. Donec ut egestas nunc. Aenean et felis auctor, pellentesque libero at, iaculis tellus.</p>
                    <h6>Lorem ipsum dolor sit amet</h6>
                    <p>Consectetur adipiscing elit. Vivamus pretium egestas aliquam. Proin sed est lorem. Etiam vel felis ac odio hendrerit tempus. Maecenas luctus vitae felis id tempor. Nulla sit amet ligula et lacus elementum consectetur id ut arcu. Donec facilisis orci malesuada, convallis velit scelerisque, porta velit. Ut commodo diam lectus, sit amet malesuada orci finibus et. Donec ut egestas nunc. Aenean et felis auctor, pellentesque libero at, iaculis tellus.</p>
                </div>
            </Typography>
            </Box>
      </Modal>
    </footer>
  )
}