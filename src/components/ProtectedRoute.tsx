
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isConfigured } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Alert className="mb-6">
            <AlertTitle>Configuração necessária</AlertTitle>
            <AlertDescription>
              Para utilizar a autenticação do Supabase, você precisa configurar as variáveis de ambiente:
              <ul className="mt-2 list-disc pl-6">
                <li>VITE_SUPABASE_URL</li>
                <li>VITE_SUPABASE_ANON_KEY</li>
              </ul>
            </AlertDescription>
          </Alert>
          <p className="text-sm text-gray-500 mb-4">
            Estas informações podem ser encontradas no painel do Supabase, na seção "Project Settings" &gt; "API".
          </p>
          <Button 
            onClick={() => window.open("https://docs.lovable.dev/integrations/supabase/", "_blank")}
            className="w-full"
          >
            Como configurar o Supabase
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
