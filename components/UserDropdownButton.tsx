import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { forwardRef } from "react";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";

export default function UserDropdownButton({
    handleLink,
    signOut,
}: {
    handleLink: string;
    signOut: () => void;
}) {
    const profileLink = handleLink && handleLink !== "" ? handleLink : "/app";
    return (
        <div className="top-16 w-56 text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="headerButton px-2 flex items-center justify-center">
                        <PersonIcon />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href={profileLink}
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-somhakohr2"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        My Account
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-somhakohr2"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={signOut}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
