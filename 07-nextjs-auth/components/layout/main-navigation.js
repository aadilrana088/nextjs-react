'use client';
import Link from 'next/link';

import classes from './main-navigation.module.css';
import { useSession, signOut } from 'next-auth/react';
function logoutHandler() {
    signOut();
}
function MainNavigation() {
    const { data: session, status: loading } = useSession();
    return (
        <header className={classes.header}>
            <Link href="/">
                <span className={classes.logo}>Next Auth</span>
            </Link>
            <nav>
                <ul>
                    {!session && !loading && (
                        <li>
                            <Link href="/auth">Login</Link>
                        </li>
                    )}
                    {session && (
                        <li>
                            <Link href="/profile">Profile</Link>
                        </li>
                    )}
                    {session && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
