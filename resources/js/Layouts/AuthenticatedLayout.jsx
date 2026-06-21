import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 min-h-screen bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-700 flex flex-col">
                {/* Logo */}
                <div className="p-6">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto" />
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 flex flex-col space-y-8">
                    <div>
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </NavLink>
                    </div>
                    
                    <div>
                        <NavLink href={route('expenses.index')} active={route().current('expenses')}>
                        My Expenses
                    </NavLink>
                    </div>
                    
                    <div>
                        <NavLink href={route('categories.index')} active={route().current('categories')}>
                        Categories
                    </NavLink>
                    </div>
                    
                    <div>
                         <NavLink href={route('currencies.index')} active={route().current('currencies')}>
                        Currencies
                    </NavLink>
                    </div>
                   
                   <div>
                    <NavLink href={route('users')} active={route().current('users')}>
                        Users
                    </NavLink>
                   </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-zinc-700">

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
                                {user.name}
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content direction="up">
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 dark:text-white">
                {children}
            </main>
        </div>
    );
}