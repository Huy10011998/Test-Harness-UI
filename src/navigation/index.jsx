import {
  MdLaptopChromebook,
  MdOutlineInsights,
  MdAssignment,
  MdAccountBox,
} from "react-icons/md";
import { URL_PAGE } from "../common/constants";

export const navigation = [
  {
    icon: <MdOutlineInsights className="sidebar__icon" />,
    link: URL_PAGE.WEBSITE,
    text: "Website Monitoring",
  },
  {
    icon: <MdLaptopChromebook className="sidebar__icon" />,
    link: URL_PAGE.CHECK,
    text: "Link Checks",
  },
  {
    icon: <MdAssignment className="sidebar__icon" />,
    link: URL_PAGE.SMOKE_TESTING,
    text: "Smoke Testing",
  },
  {
    icon: <MdAccountBox className="sidebar__icon" />,
    link: URL_PAGE.PROFILE,
    text: "My Account",
  },

  // {
  //   icon: <MdAssignment className="sidebar__icon" />,
  //   link: URL_PAGE.FUNCTIONALITY_TESTING,
  //   text: "Functionality Testing",
  // },
  // {
  //   icon: <MdAssignment className="sidebar__icon" />,
  //   link: URL_PAGE.BOOK_A_TESTER,
  //   text: "Book A Tester",
  // },
  // {
  //   icon: <MdAssignment className="sidebar__icon" />,
  //   link: URL_PAGE.TEST_EXECUTION_REPORTS,
  //   text: "Test Execution Reports",
  // },
  // {
  //   icon: <MdAssignment className="sidebar__icon" />,
  //   link: URL_PAGE.TEST_CASES,
  //   text: "Test Cases",
  // },
  // {
  //   icon: <MdAssignment className="sidebar__icon" />,
  //   link: URL_PAGE.BUGS,
  //   text: "Bugs",
  // },
];
