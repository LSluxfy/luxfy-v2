
import React from 'react';
import ProfileCard from '@/components/ProfileCard';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import StatsCards from '@/components/dashboard/StatsCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share, Users, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">{t('dashboard.title')}</h1>
        <Button className="bg-gradient-to-r from-luxfy-blue to-luxfy-purple hover:from-luxfy-darkBlue hover:to-luxfy-darkPurple text-white shadow-lg">
          <Share className="mr-2 h-4 w-4" />
          {t('dashboard.affiliateProgram')}
        </Button>
      </div>
      
      <Card className="bg-gradient-to-br from-luxfy-blue/10 via-luxfy-purple/10 to-luxfy-blue/5 border-luxfy-blue/20 dark:from-luxfy-blue/20 dark:via-luxfy-purple/20 dark:to-luxfy-blue/10 dark:border-luxfy-blue/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxfy-blue/5 via-transparent to-luxfy-purple/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-luxfy-purple/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-luxfy-blue/20 to-transparent rounded-full blur-xl"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-luxfy-blue dark:text-luxfy-blue">
            <DollarSign className="h-5 w-5" />
            {t('dashboard.luxfyAffiliate')}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-luxfy-blue to-luxfy-purple bg-clip-text text-transparent">50%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('dashboard.recurringCommission')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-luxfy-purple to-luxfy-blue bg-clip-text text-transparent">R$ 0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('dashboard.earningsThisMonth')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-luxfy-blue to-luxfy-purple bg-clip-text text-transparent">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('dashboard.referrals')}</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button className="bg-gradient-to-r from-luxfy-blue to-luxfy-purple hover:from-luxfy-darkBlue hover:to-luxfy-darkPurple shadow-lg">
              <Users className="mr-2 h-4 w-4" />
              {t('dashboard.startReferring')}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard />
        </div>
        <div className="md:col-span-2">
          <DashboardMetrics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
