import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
  } from '@chakra-ui/react'

export default function SideDrawer({ children, isOpen, onClose, btnRef }) {
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add Filters</DrawerHeader>

                    <DrawerBody>
                        {children}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            
        </>
    )
}
