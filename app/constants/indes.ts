export const HEADER_HEIGHT = 4;

export type JobExperience = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
};

export const JOB_EXPERIENCE: Array<JobExperience> = [
  {
    id: '1',
    title: 'Front-End Software Engineer',
    company: 'GfK - NIQ company',
    startDate: 'Jun 2021',
    endDate: 'Present',
    description: [
      'Work with project managers, business analysts, and developers to get issues found during development cycle resolved and re-delivered to QA team for retest',
      'Successfully collaborated as part of product teams for the launch of various projects that involved both front-end applications and back-end servers',
      'Researched and articulated business requirements into Business requirement documents',
      'Developed 4+ web applications by using responsive UI elements and shadcn/ui components library via React concepts for smooth performance',
      'Build user interfaces of web applications with React.js and JavaScript based on the approved designs',
      'Analyzed user requirements and developed 50+ responsive and functional UI components via React concepts',
    ],
  },
  {
    id: '2',
    title: 'Junior Software Engineer .NET',
    company: 'GfK',
    startDate: 'Oct 2019',
    endDate: 'Jun 2021',
    description: [
      'Migrated project for matching product groups from VB.NET ASP Classic to newer technology stack such as: ASP.NET Core 3.1, Angular, Angular Material, State management Akita',
      'Involved in the design and implementation of enhancements and customizations',
      'Executed SQL queries to ensure the data integrity by checking various kinds of constraints',
      'Work with various teams to setup and conduct Sharable Components Library',
    ],
  },
  {
    id: '3',
    title: 'Magento Developer',
    company: 'Smile Ukraine',
    startDate: 'Oct 2018',
    endDate: 'Oct 2019',
    description: ['Development of e-commerce web shops based on the Magento eCommerce platform.'],
  },
  {
    id: '4',
    title: 'Engineer–Developer',
    company: 'Region “Ternopiloblenergo”',
    startDate: 'Jan 2017',
    endDate: 'Oct 2018',
    description: [
      'Developer. Support of billing software “SunFlower”. Setting up servers, db, developing client and server side. Support of Act of breach of contract accounting and circulation program. Support of Electric counters accounting and circulation program.',
      'Maintenance (both development and administration) of the existing billing system “SunFlower”. Support the system, developing new features, modifying business rules (stored procedures МS SQL). Microsoft Visual Studio 2017, C# has been used to develop user interface.',
      'Development web application PortalTOE for adding data of employees, using ASP.NET Core on backend and HTML, CSS, JQuery, AngularJS on frontend.',
    ],
  },
  {
    id: '5',
    title: 'System administrator 1С',
    company: 'ТЕRКО Auto Ternopil',
    startDate: 'Jan 2016',
    endDate: 'Jan 2017',
    description: [
      'Administration of 1C:Enterprise 8.3. Maintenance of the existing accounting system. Development of new features, modifying business rules (stored procedures MS SQL).',
      'Development of the reports for CarCleaning application connecting to 1C database.',
    ],
  },
  {
    id: '6',
    title: 'Junior developer',
    company: 'REM Zbarazh',
    startDate: 'Mar 2012',
    endDate: 'Jan 2016',
    description: [
      'Run and terminated low voltage cable, voice and data structured cabling, fiber and coaxial.',
      'Installed Internet, cable, and telephone inside office rooms.',
      'Analize billing reports',
      'Created and maintained Database clients of the electricity company in 0.4kV networks in\n' +
        'MSSQL.',
    ],
  },
  {
    id: '7',
    title: 'Junior developer',
    company: 'IIT Ternopil – PAT “ISKRA” Lviv',
    startDate: 'Sep 2009',
    endDate: 'Mar 2012',
    description: ['JavaScript, HTML, CSS.', 'Development of the web application for the company.'],
  },
];

export const SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'REST API',
  'PostgreSQL',
  'Git',
  'Jest',
  'React Testing Library',
  'Agile',
  'Scrum',
  'Jira',
  'Confluence',
  'GitHub',
  'GitLab',
];
