import { notification } from 'antd';

const notificationError = (title: string, message: string) => {
  const [api, contextHolder] = notification.useNotification();
  const noti = () => {
    api.error({
      message: title,
      description: message,
    });
  };
  return {
    contextHolder,
    noti,
  };
};

export default notificationError;
