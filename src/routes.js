import React from 'react';

const Dashboard = React.lazy(() => import('./component/Dashboard'));
const AdverTiser = React.lazy(() => import('./component/Advertiser/advertiser'));
const Publisher = React.lazy(() => import('./component/Publisher/publisher'));
const Application = React.lazy(() => import('./component/Application/application'));
const UserRole = React.lazy(() => import('./component/UserRole/userrole'));
const UserRight = React.lazy(() => import('./component/UserRight/userright'));
const UserRoleToRight = React.lazy(() => import('./component/UserRoleToRight/userroletoright'));
const Profile = React.lazy(() => import('./component/Profile/profile'));
const ChangePassword = React.lazy(() => import('./component/ChangePassword/changepassword'));
const CreateApp = React.lazy(() => import('./component/createapp/createapp'));
const ListApp = React.lazy(() => import('./component/listapp/listapp'));
const EditApp = React.lazy(() => import('./component/createapp/createapp'));
const ViewApp = React.lazy(() => import('./component/Viewapp/viewapp'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/Advertiser', name: 'Advertiser', component: AdverTiser },
  { path: '/Publisher', name: 'Publisher', component: Publisher },
  { path: '/Application', name: 'Application', component: Application },
  { path: '/UserRole', name: 'UserRole', component: UserRole },
  { path: '/UserRight', name: 'UserRight', component: UserRight },
  { path: '/UserRoleToRight', name: 'UserRoleToRight', component: UserRoleToRight },
  { path: '/Profile', name: 'Profile', component: Profile },
  { path: '/ChangePassword', name: 'ChangePassword', component: ChangePassword },
  { path: '/CreateApp', name: 'CreateApp', component: CreateApp },
  { path: '/ListApp', name: 'ListApp', component: ListApp },
  { path: '/EditApp/:id', name: 'EditApp', component: EditApp },
  { path: '/ViewApp/:id', name: 'ViewApp', component: ViewApp },
];

export default routes;
