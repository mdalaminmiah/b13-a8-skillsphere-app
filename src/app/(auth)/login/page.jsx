import { Suspense } from 'react';
import AuthForm from '@/components/Shared/Auth/AuthForm';

export const metadata = {
    title: 'Login | SkillSphere',
};

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <AuthForm type="login" />
        </Suspense>
    );
}
