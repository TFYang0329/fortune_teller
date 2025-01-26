// ./src/components/layout/topBar.tsx
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {ArrowRightStartOnRectangleIcon, ChevronDownIcon, UserCircleIcon} from "@heroicons/react/24/solid";

export default function TopBar() {
    return (
        <div className="fixed top-0 left-0 w-full bg-transparent flex justify-between items-center z-50 px-2">
            {/* Title */}
            <Link href="/home" className="flex items-center hover-scale-200">
                <Image
                    src="/icon.png"
                    alt="Logo"
                    width={60}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                    // className="animate-spinSlow"
                />
                <h1 className="text-3xl font-bold">玄門卜卦</h1>
            </Link>

            {/* Menu */}
            <Menu>
                <MenuButton
                    className="inline-flex items-center gap-2 text-sm px-2 py-1 button-orange-deep">
                    選單
                    <ChevronDownIcon className="size-4"/>
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute top-full right-0 w-48 rounded-xl px-2 py-2 shadow-lg bg-orange-300 border border-orange-700">
                    <MenuItem>
                        <button
                            className="group flex w-full items-center gap-2 rounded-xl hover:bg-orange-200">
                            <UserCircleIcon className="size-4"/>
                            個人檔案
                        </button>
                    </MenuItem>
                    <div className="my-1 h-px bg-gray-700"/>
                    <MenuItem>
                        <button
                            className="group flex w-full items-center gap-2 rounded-xl hover:bg-orange-200">
                            <ArrowRightStartOnRectangleIcon className="size-4"/>
                            登出
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}