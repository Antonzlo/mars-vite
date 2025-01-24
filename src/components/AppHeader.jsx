import { Avatar, Cell, FixedLayout } from "@telegram-apps/telegram-ui";


import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";


const AppHeader = () => {
    const { user } = useContext( UserContext );
    return (
        <FixedLayout vertical="top" style={ { zIndex: 10 } }>
            <Cell
                before={ <Avatar src={ user.photo_url } /> }
                description={ "@"+user.username }
                title={ user.first_name }
            />
        </FixedLayout>
    );
};

export default AppHeader;
