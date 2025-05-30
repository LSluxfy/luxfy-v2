
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const Register = () => {
  const { t } = useTranslation();
  
  const registerSchema = z.object({
    firstName: z.string().min(1, t('auth.validation.firstNameRequired')),
    lastName: z.string().min(1, t('auth.validation.lastNameRequired')),
    email: z.string().email(t('auth.validation.emailInvalid')),
    company: z.string().optional(),
    password: z.string().min(6, t('auth.validation.passwordMinLength')),
    confirmPassword: z.string().min(6, t('auth.validation.confirmPasswordRequired')),
    terms: z.boolean().refine(value => value === true, {
      message: t('auth.validation.termsRequired'),
    }),
  }).refine(data => data.password === data.confirmPassword, {
    message: t('auth.validation.passwordsDoNotMatch'),
    path: ["confirmPassword"],
  });

  type RegisterFormValues = z.infer<typeof registerSchema>;

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.firstName, data.lastName);
      // Auth context will handle navigation after signup
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-md bg-luxfy-purple flex items-center justify-center text-white font-bold text-2xl">L</div>
            <span className="text-3xl font-bold text-luxfy-dark">Luxfy</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">{t('auth.register.title')}</h2>
          <p className="mt-2 text-gray-600">
            {t('auth.register.subtitle')}
          </p>
          <div className="mt-4 flex justify-center">
            <LanguageSelector />
          </div>
        </div>
        
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>{t('auth.register.cardTitle')}</CardTitle>
            <CardDescription>
              {t('auth.register.cardDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.register.firstName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('auth.register.firstNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('auth.register.lastName')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('auth.register.lastNamePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.register.email')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('auth.register.emailPlaceholder')} type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.register.company')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('auth.register.companyPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.register.password')}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder={t('auth.register.passwordPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.register.confirmPassword')}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder={t('auth.register.confirmPasswordPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm leading-none">
                          {t('auth.register.agreeToTerms')}{' '}
                          <Link to="/terms" className="text-luxfy-purple hover:underline">
                            {t('auth.register.termsOfService')}
                          </Link>
                          {' '}{t('auth.register.and')}{' '}
                          <Link to="/privacy" className="text-luxfy-purple hover:underline">
                            {t('auth.register.privacyPolicy')}
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple"
                  disabled={isLoading}
                >
                  {isLoading ? t('auth.register.createAccountButtonLoading') : t('auth.register.createAccountButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">{t('auth.register.orContinueWith')}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16" className="mr-2"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                {t('auth.register.google')}
              </Button>
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16" className="mr-2"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
                {t('auth.register.facebook')}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              {t('auth.register.hasAccount')}{' '}
              <Link to="/login" className="text-luxfy-purple hover:underline font-medium">
                {t('auth.register.loginLink')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
