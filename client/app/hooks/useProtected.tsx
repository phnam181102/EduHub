import { redirect } from 'next/navigation';
import useAuth from './useAuth';
import { ReactNode } from 'react';

interface ProtectedProps {
    children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    const isAuthenticated = useAuth();

    return isAuthenticated ? children : redirect('/');
}
