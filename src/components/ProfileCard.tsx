
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const profileSchema = z.object({
  first_name: z.string().min(1, 'Nome é obrigatório'),
  last_name: z.string().min(1, 'Sobrenome é obrigatório'),
  avatar_url: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileCard = () => {
  const { user, profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      avatar_url: profile?.avatar_url || '',
    },
    values: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      avatar_url: profile?.avatar_url || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Foto</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://exemplo.com/foto.jpg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
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
              <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
