'use client';

import React, { useRef, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Embed, models, Report } from 'powerbi-client';
import { Button, message } from 'antd';
import '@/style/report.css';

const AdminReport: React.FC = () => {
  const [refreshLoading, setRefreshLoading] = useState(false);
  const reportRef = useRef<Report>();

  const handleEmbeddedComponent = (embedComponent: Embed) => {
    reportRef.current = embedComponent as Report;
  };

  const refreshReportData = async () => {
    const response = await fetch(
      `https://api.powerbi.com/v1.0/myorg/datasets/${process.env.NEXT_POWER_BI_DATASET_ID}/refreshes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_POWER_BI_ACCESS_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to refresh report data');
    }
  };

  const handleRefreshReport = async () => {
    setRefreshLoading(true);
    try {
      await refreshReportData();
      await reportRef.current?.refresh();
      message.success('Report refreshed successfully');
    } catch (error) {
      message.error('An error occurred while refreshing the report');
    } finally {
      setRefreshLoading(false);
    }
  };

  return (
    <div className='p-8'>
      <Header />
      <RefreshButton onClick={handleRefreshReport} loading={refreshLoading} />
      <PowerBIReport getEmbeddedComponent={handleEmbeddedComponent} />
    </div>
  );
};

const Header: React.FC = () => (
  <div className='text-center *:leading-8'>
    <h1 className='text-3xl font-bold'>Admin Report</h1>
    <p className='opacity-60'>
      This report is only visible to users with the admin role. It contains sensitive information and should not be
      shared with non-admin users.
    </p>
  </div>
);

const RefreshButton: React.FC<{ onClick: () => void; loading: boolean }> = ({ onClick, loading }) => (
  <div className='text-right mb-6'>
    <Button onClick={onClick} loading={loading} type='primary'>
      Refresh
    </Button>
  </div>
);

const PowerBIReport: React.FC<{ getEmbeddedComponent: (embedComponent: Embed) => void }> = ({
  getEmbeddedComponent,
}) => (
  <div className='h-fit'>
    <PowerBIEmbed
      getEmbeddedComponent={getEmbeddedComponent}
      cssClassName='report__container'
      embedConfig={{
        type: 'report',
        id: process.env.NEXT_POWER_BI_REPORT_ID,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${process.env.NEXT_POWER_BI_REPORT_ID}&groupId=${process.env.NEXT_POWER_BI_GROUP_ID}&w=2&config=${process.env.NEXT_POWER_BI_EMBED_CONFIG}`,
        accessToken: process.env.NEXT_POWER_BI_ACCESS_TOKEN,
        tokenType: models.TokenType.Aad,
        height: 1680,
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          background: models.BackgroundType.Transparent,
          layoutType: models.LayoutType.Custom,
          customLayout: {
            displayOption: models.DisplayOption.FitToWidth,
          },
        },
      }}
    />
  </div>
);

export default AdminReport;
