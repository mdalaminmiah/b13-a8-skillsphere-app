import { Suspense } from 'react';
import AuthForm from '@/components/Shared/Auth/AuthForm';

export const metadata = {
    title: 'Register | SkillSphere',
};

export default function RegisterPage() {
    return (
        <Suspense fallback={null}>
            <AuthForm type="register" />
        </Suspense>
    );
}
