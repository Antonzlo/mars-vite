import { Image, Tabbar } from "@telegram-apps/telegram-ui";

export default function BottomNavigation() {
    const path = window.location.pathname;
    return (
        <Tabbar>
            <Tabbar.Item text="Map" selected={path=="/map"} >
                <Image src="/images/icons/map.svg" size={28} />
                </Tabbar.Item>
            <Tabbar.Item text="Wallet" to="/wallet" >
                <Image src="/images/icons/wallet.svg" size={ 28 } />
            </Tabbar.Item>
            <Tabbar.Item text="Profile" to="/profile" >
                <Image src="/images/icons/profile.svg" size={ 28 } />
            </Tabbar.Item>
        </Tabbar>
    );
}
