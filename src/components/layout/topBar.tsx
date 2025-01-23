// ./src/components/layout/topBar.tsx
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
} from '@heroicons/react/16/solid'

export default function TopBar() {
    return (
        <div className="fixed top-0 left-0 w-full bg-transparent flex justify-between items-center z-50 px-2">
            {/* Logo */}
            <Link href="/home" className="flex items-center hover-scale-200">
                <Image src="/icon.png" alt="Logo" width={60} height={60} className="animate-spinSlow"/>
                <h1 className="text-3xl font-bold">玄門易經卜卦</h1>
            </Link>

            {/* Title */}

            {/* Menu */}
            <Menu>
                <MenuButton
                    className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
                    Options
                    <ChevronDownIcon className="size-4 fill-white/60"/>
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute top-full right-0 mt-2 w-48 rounded-xl border border-gray-700 bg-gray-800 p-2 shadow-lg">
                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-700">
                            <PencilIcon className="size-4 fill-white/30"/>
                            Edit
                        </button>
                    </MenuItem>
                    <div className="my-1 h-px bg-gray-700"/>
                    <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-700">
                            <ArchiveBoxXMarkIcon className="size-4 fill-white/30"/>
                            Archive
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}