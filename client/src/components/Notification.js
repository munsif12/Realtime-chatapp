import { notification, } from 'antd';

const openNotificationWithIcon = (type, title) => {
    notification.config({
        placement: 'topRight',
        duration: 3,
        closeIcon: false,
    });
    notification[type]({
        message: title,
    });
};

export default openNotificationWithIcon