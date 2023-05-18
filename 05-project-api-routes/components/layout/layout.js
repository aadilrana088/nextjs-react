import { Fragment } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';

function Layout(props) {
    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
            <Notification title="success" message="Data Inserted Successfully" status="success" />
        </Fragment>
    );
}

export default Layout;
