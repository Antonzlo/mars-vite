import { createContext, useState, useMemo, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { Placeholder } from '@telegram-apps/telegram-ui';

export const UserContext = createContext();

export const UserProvider = ( { children } ) => {
    const [ user, setUser ] = useState( {} );

    const authenticateUser = ( userData ) => {
        if ( userData ) {
            fetch( '/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { user: userData } ),
            } )
                .then( response => response.json() )
                .then( data => {
                    if ( data.token ) {
                        // Store the JWT token as needed, e.g., in local storage
                        localStorage.setItem( 'jwtToken', data.token );
                        setUser( userData );
                    }
                } )
                .catch( error => console.error( 'Error authenticating user:', error ) );
        }
    };

    useEffect( () => {
        WebApp.ready();
        const userData = WebApp.initDataUnsafe?.user;
        authenticateUser( userData );
    }, [] );

    const value = useMemo( () => ( { user } ), [ user ] );

    return user ? (
        <UserContext.Provider value={ value }>
            { children }
        </UserContext.Provider>
    ) : (
        <Placeholder description="Loading..."/>
    );
};
