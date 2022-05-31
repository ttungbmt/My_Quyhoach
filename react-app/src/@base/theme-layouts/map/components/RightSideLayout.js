import { memo } from 'react';
import QuickPanel from 'app/theme-layouts/shared-components/quickPanel/QuickPanel';
import NotificationPanel from 'app/theme-layouts/shared-components/notificationPanel/NotificationPanel';

function RightSideLayout(props) {
  return (
    <>
      <QuickPanel />

      <NotificationPanel />
    </>
  );
}

export default memo(RightSideLayout);
