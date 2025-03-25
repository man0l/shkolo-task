import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-full p-4 md:p-6">
            <Header />
            {children}
        </div>
    )
}

export default Layout;