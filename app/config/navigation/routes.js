import { FontIcons } from '../../assets/icons';
import * as Screens from '../../screens/index';

export const MainRoutes = [
  {
    id: 'Invoice',
    title: 'Invoice',
		code: '#9b59b6',
    icon: FontIcons.invoice,
    screen: Screens.InvoicePage,
    children: [],
  },
  {
    id: 'Students',
    title: 'Student(s)',
		code: '#16a085',
    icon: FontIcons.student,
    screen: Screens.StudentPage,
    children: [],
  },
	  {
    id: 'TBD',
    title: 'School Enrollment',
		code: '#16a085',
    icon: FontIcons.tbd,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
	,
	  {
    id: 'TBD',
    title: 'Field Trips',
		code: '#16a085',
    icon: FontIcons.tbd,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
	,
	  {
    id: 'TBD',
    title: 'School Policy',
		code: '#16a085',
    icon: FontIcons.tbd,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
	,
	  {
    id: 'TBD',
    title: 'Extracurr Activities',
		code: '#16a085',
    icon: FontIcons.extra,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
	,
	  {
    id: 'TBD',
    title: 'Emergency Policy',
		code: '#16a085',
    icon: FontIcons.tbd,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
	,
	  {
    id: 'TBD',
    title: 'TBD',
		code: '#16a085',
    icon: FontIcons.tbd,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
	,
	  {
    id: 'TBD',
    title: 'TBD',
		code: '#16a085',
    icon: FontIcons.tbd,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
	{
    id: 'TBD',
    title: 'TBD',
		code: '#16a085',
    icon: FontIcons.tbd,
    screen: Screens.ToBeDeterminedPage,
    children: [],
  },
];

export const MenuRoutes = MainRoutes;
