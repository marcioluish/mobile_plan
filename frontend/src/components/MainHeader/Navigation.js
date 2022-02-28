import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = () => {
    const ctx = useContext(AuthContext);

    return (
        <nav className="classes.nav">
            <nav className={classes.nav}>
                <ul>
                    {ctx.isLoggedIn && (
                        <li>
                            <button onClick={ctx.onLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </nav>
    );
};

export default Navigation;
