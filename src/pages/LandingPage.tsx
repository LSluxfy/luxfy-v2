
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Kanban, Calendar, BarChart, Users, Shield, Check, Star } from 'lucide-react';
import LandingNavbar from '@/components/LandingNavbar';
import LandingFooter from '@/components/LandingFooter';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Bot,
      titleKey: 'features.aiAgent.title',
      descriptionKey: 'features.aiAgent.description',
      features: [
        t('features.aiAgent.features.0'),
        t('features.aiAgent.features.1'),
        t('features.aiAgent.features.2')
      ]
    },
    {
      icon: Kanban,
      titleKey: 'features.crm.title',
      descriptionKey: 'features.crm.description',
      features: [
        t('features.crm.features.0'),
        t('features.crm.features.1'),
        t('features.crm.features.2')
      ]
    },
    {
      icon: Calendar,
      titleKey: 'features.schedule.title',
      descriptionKey: 'features.schedule.description',
      features: [
        t('features.schedule.features.0'),
        t('features.schedule.features.1'),
        t('features.schedule.features.2')
      ]
    },
    {
      icon: BarChart,
      titleKey: 'features.analytics.title',
      descriptionKey: 'features.analytics.description',
      features: [
        t('features.analytics.features.0'),
        t('features.analytics.features.1'),
        t('features.analytics.features.2')
      ]
    },
    {
      icon: Users,
      titleKey: 'features.team.title',
      descriptionKey: 'features.team.description',
      features: [
        t('features.team.features.0'),
        t('features.team.features.1'),
        t('features.team.features.2')
      ]
    },
    {
      icon: Shield,
      titleKey: 'features.security.title',
      descriptionKey: 'features.security.description',
      features: [
        t('features.security.features.0'),
        t('features.security.features.1'),
        t('features.security.features.2')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-luxfy-light via-white to-blue-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-luxfy-dark mb-6 leading-tight">
            {t('hero.title', { interpolation: { escapeValue: false } })}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-luxfy-purple hover:bg-luxfy-darkPurple text-white px-8 py-4 text-lg">
              {t('hero.startFree')}
            </Button>
            <Button size="lg" variant="outline" className="border-luxfy-purple text-luxfy-purple hover:bg-luxfy-purple hover:text-white px-8 py-4 text-lg">
              {t('hero.login')}
            </Button>
          </div>
          <p className="text-gray-500 text-sm">
            {t('hero.companiesUsing')}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-luxfy-dark mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-luxfy-purple bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-luxfy-purple" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-luxfy-dark">
                    {t(feature.titleKey)}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {t(feature.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((featureItem, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{featureItem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-luxfy-dark mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-luxfy-dark">
                  {t('pricing.starter.name')}
                </CardTitle>
                <div className="text-3xl font-bold text-luxfy-purple">
                  {t('pricing.starter.price')}
                </div>
                <CardDescription>
                  {t('pricing.starter.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  {t('pricing.starter.button')}
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-luxfy-purple border-2 relative hover:shadow-xl transition-shadow duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-luxfy-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t('pricing.pro.popular')}
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-luxfy-dark">
                  {t('pricing.pro.name')}
                </CardTitle>
                <div className="text-3xl font-bold text-luxfy-purple">
                  {t('pricing.pro.price')}
                </div>
                <CardDescription>
                  {t('pricing.pro.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  {t('pricing.pro.button')}
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-luxfy-dark">
                  {t('pricing.premium.name')}
                </CardTitle>
                <div className="text-3xl font-bold text-luxfy-purple">
                  {t('pricing.premium.price')}
                </div>
                <CardDescription>
                  {t('pricing.premium.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-luxfy-purple text-luxfy-purple hover:bg-luxfy-purple hover:text-white">
                  {t('pricing.premium.button')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-luxfy-dark mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-luxfy-dark mb-6">
                {t('contact.form.title')}
              </h3>
              <p className="text-gray-600 mb-8">
                {t('contact.form.subtitle')}
              </p>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <Input placeholder={t('contact.form.namePlaceholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input type="email" placeholder={t('contact.form.emailPlaceholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <Input placeholder={t('contact.form.subjectPlaceholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea placeholder={t('contact.form.messagePlaceholder')} rows={5} />
                </div>
                <Button className="w-full bg-luxfy-purple hover:bg-luxfy-darkPurple">
                  {t('contact.form.send')}
                </Button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-luxfy-dark mb-2">
                  {t('contact.phone')}
                </h4>
                <p className="text-gray-600">+55 (11) 99999-9999</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-luxfy-dark mb-2">
                  {t('contact.email')}
                </h4>
                <p className="text-gray-600">contato@luxfy.com</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-luxfy-dark mb-2">
                  {t('contact.address')}
                </h4>
                <p className="text-gray-600">
                  Rua da Inovação, 123<br />
                  São Paulo, SP - Brasil
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
