import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from 'react-router-dom';


const ProfileCard = () => {
  const { user, profile } = useAuth();
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          {profile?.avatar_url ? (
            <AvatarImage src={profile.avatar_url} alt={`${profile.first_name} ${profile.last_name}`} />
          ) : null}
          <AvatarFallback className="text-lg bg-luxfy-purple/20 text-luxfy-purple">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>
            {profile ? `${profile.first_name} ${profile.last_name}` : user?.email}
          </CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nome</h3>
              <p>{profile?.first_name || 'Não informado'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Sobrenome</h3>
              <p>{profile?.last_name || 'Não informado'}</p>
            </div>
            <div className="flex justify-end">
              <NavLink to='/dashboard/settings'>
                <Button>Editar Perfil</Button>
              </NavLink>
            </div>
          </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
