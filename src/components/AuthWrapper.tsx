'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const routePath = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAndRedirect = async () => {
      await checkAuth();

      // TODO: Remove rotePath "/" when production DB is running again
      if (!isAuthenticated && routePath !== '/SignIn' && routePath !== '/SignUp' && routePath !== '/') {
        router.push('/SignIn');
      } else {
        setLoading(false);
      }
    };

    checkAndRedirect();
  }, [mounted, isAuthenticated, checkAuth, routePath, router]);

  if (loading) {
    // TODO: Add a loading spinner
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
