"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import EditWorkshops from "@/components/dashboard/EditWorkshop/EditWorkshops";
import EditOurTeam from "@/components/dashboard/EditOurTeam";
import EditAlumni from "@/components/dashboard/EditAlumni";
import EditInterviews from "@/components/dashboard/EditInterviews";
import EditGallery from "@/components/dashboard/EditGallery";
import EditSponsorUs from "@/components/dashboard/EditSponsorUs";
import EditHome from "@/components/dashboard/EditHome";
import EditProjectPrograms from "@/components/dashboard/EditProjectPrograms";

const DashboardPage = () => {
  let tabs = [
    {
      id: "Home",
      label: "Home",
    },
    {
      id: "workshops",
      label: "Workshops",
    },
    {
      id: "projectPrograms",
      label: "Project Programs",
    },
    {
      id: "team",
      label: "Our Team",
    },
    {
      id: "alumni",
      label: "Alumni",
    },
    {
      id: "interviews",
      label: "Interviews",
    },
    {
      id: "gallery",
      label: "Gallery",
    },

    {
      id: "sponsor",
      label: "Sponsor Us",
    },
  ];
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "Home":
        return <EditHome />;
      case "workshops":
        return <EditWorkshops />;
      case "projectPrograms":
        return <EditProjectPrograms />;
      case "team":
        return <EditOurTeam />;
      case "alumni":
        return <EditAlumni />;
      case "interviews":
        return <EditInterviews />;
      case "gallery":
        return <EditGallery />;
      case "sponsor":
        return <EditSponsorUs />;
      default:
        return null;
    }
  };
  return (
    <div className='flex w-full flex-col items-center'>
      <Tabs aria-label='Dynamic tabs' items={tabs}>
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
