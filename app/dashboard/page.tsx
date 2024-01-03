'use client';
import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import EditWorkshops from '@/components/dashboard/EditWorkshop/EditWorkshops';
import EditOurTeam from '@/components/dashboard/EditOurTeam';
import EditAlumni from '@/components/dashboard/EditAlumni';
import EditInterviews from '@/components/dashboard/EditInterviews';
import EditGallery from '@/components/dashboard/EditGallery';
import EditContactus from '@/components/dashboard/EditContactus';
import EditSponsorUs from '@/components/dashboard/EditSponsorUs';
import EditHome from '@/components/dashboard/EditHome';

const DashboardPage = () => {
  let tabs = [
    {
      id: 'Home',
      label: 'Home',
    },
    {
      id: 'workshops',
      label: 'Workshops',
    },
    {
      id: 'team',
      label: 'Our Team',
    },
    {
      id: 'alumni',
      label: 'Alumni',
    },
    {
      id: 'interviews',
      label: 'Interviews',
    },
    {
      id: 'gallery',
      label: 'Gallery',
    },
    {
      id: 'contact',
      label: 'Contact Us',
    },
    {
      id: 'sponsor',
      label: 'Sponsor Us',
    },
  ];
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'Home':
        return <EditHome />;
      case 'workshops':
        return <EditWorkshops />;
      case 'team':
        return <EditOurTeam />;
      case 'alumni':
        return <EditAlumni />;
      case 'interviews':
        return <EditInterviews />;
      case 'gallery':
        return <EditGallery />;
      case 'contact':
        return <EditContactus />;
      case 'sponsor':
        return <EditSponsorUs />;
      default:
        return null;
    }
  };
  return (
    <div className="flex w-full flex-col items-center">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>{renderTabContent(item.id)}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default DashboardPage;
