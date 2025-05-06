'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { checkAuth } = useAuthStore();
  const routePath = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
      const authStatus = await checkAuth();

      if (authStatus === "unauthorized") {
        if (PUBLIC_ROUTES.includes(routePath)) {
          setLoading(false);
          return;
        }

        localStorage.setItem('redirectPath', routePath);
        router.push('/sign-in');
      } else {
        setLoading(false);

        const redirectPath = localStorage.getItem('redirectPath');
        if (redirectPath) {
          localStorage.removeItem('redirectPath');
          router.push(redirectPath);
        }
      }
    };

    checkAndRedirect();
  }, [checkAuth, routePath, router]);

  if (loading) {
    // TODO: Add a loading spinner
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
