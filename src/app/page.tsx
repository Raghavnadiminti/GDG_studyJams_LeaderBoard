import Image from "next/image";
import Leaderboard from "@/components/leaderboard";
import StudentProfile from "@/components/profile";
interface Participant {
  'User Name': string;
  'User Email': string;
  'Google Cloud Skill': string;
  'Profile URL Status': string;
  'Access Code Redeemed': string;
  'All Skill Badges': string;
  '# of Skill Badges Completed': number;
  'Names of Completed Skill Badges': string;
  '# of Arcade Games Completed': number;
  'Names of Completed Arcade Games': string;
}
const mockData: Participant[] = [
   {
    "User Name": "Raghavendra",
    "User Email": "raghave999gskb@gmail.com",
    "Google Cloud Skill": "https://www.cloudskillsboost.google/",
    "Profile URL Status": "All Good",
    "Access Code Redeemed": "Yes",
    "All Skill Badges": "No",
    "# of Skill Badges Completed": 0,
    "Names of Completed Skill Badges": "",
    "# of Arcade Games Completed": 0,
    "Names of Completed Arcade Games": ""
  },
  {
    "User Name": "S.V.KISHORE REDDY",
    "User Email": "kishore56234@gmail.com",
    "Google Cloud Skill": "https://www.cloudskillsboost.google/",
    "Profile URL Status": "All Good",
    "Access Code Redeemed": "Yes",
    "All Skill Badges": "No",
    "# of Skill Badges Completed": 0,
    "Names of Completed Skill Badges": "",
    "# of Arcade Games Completed": 0,
    "Names of Completed Arcade Games": ""
  },
  {
    "User Name": "Alen Alexander",
    "User Email": "alenalexander001@gmail.com",
    "Google Cloud Skill": "https://www.cloudskillsboost.google/",
    "Profile URL Status": "All Good",
    "Access Code Redeemed": "Yes",
    "All Skill Badges": "No",
    "# of Skill Badges Completed": 8,
    "Names of Completed Skill Badges": "The Basics of Google Cloud",
    "# of Arcade Games Completed": 0,
    "Names of Completed Arcade Games": ""
  },
  {
    "User Name": "Pakalapati Deekshith",
    "User Email": "deekshithpakalapati@gmail.com",
    "Google Cloud Skill": "https://www.cloudskillsboost.google/",
    "Profile URL Status": "All Good",
    "Access Code Redeemed": "No",
    "All Skill Badges": "No",
    "# of Skill Badges Completed": 0,
    "Names of Completed Skill Badges": "",
    "# of Arcade Games Completed": 0,
    "Names of Completed Arcade Games": ""
  },
  {
    "User Name": "Gandi Komali",
    "User Email": "gandikomali0410@gmail.com",
    "Google Cloud Skill": "https://www.cloudskillsboost.google/",
    "Profile URL Status": "All Good",
    "Access Code Redeemed": "No",
    "All Skill Badges": "No",
    "# of Skill Badges Completed": 0,
    "Names of Completed Skill Badges": "",
    "# of Arcade Games Completed": 0,
    "Names of Completed Arcade Games": ""
  },
  {
    "User Name": "Murali Lakshmi Sai",
    "User Email": "saipatnala248@gmail.com",
    "Google Cloud Skill": "https://www.cloudskillsboost.google/",
    "Profile URL Status": "All Good",
    "Access Code Redeemed": "No",
    "All Skill Badges": "No",
    "# of Skill Badges Completed": 0,
    "Names of Completed Skill Badges": "",
    "# of Arcade Games Completed": 0,
    "Names of Completed Arcade Games": ""
  },
  {
    "User Name": "DUDDU RAVI KUMAR",
    "User Email": "rkumarduddu@gmail.com",
    "Google Cloud Skill": "https://www.cloudskillsboost.google/",
    "Profile URL Status": "All Good",
    "Access Code Redeemed": "Yes",
    "All Skill Badges": "No",
    "# of Skill Badges Completed": 1,
    "Names of Completed Skill Badges": "The Basics of Google Cloud",
    "# of Arcade Games Completed": 0,
    "Names of Completed Arcade Games": ""
  }
  // Add more data as needed
];

const mockData2: Participant =  {

  "User Name": "Bhargav Krishna",
  "User Email": "bhargavjams@gmail.com",
  "Google Cloud Skill": "https://www.cloudskillsboost.google/public_profiles/a763192e-a4ee-43f9-8433-1c5a092cdfa2",
  "Profile URL Status": "All Good",
  "Access Code Redeemed": "Yes",
  "All Skill Badges": "No",
  "# of Skill Badges Completed": 12,
  "Names of Completed Skill Badges": "The Basics of Google Cloud Compute [Skill Badge] | Get Started with Cloud Storage [Skill Badge] | Get Started with Pub/Sub [Skill Badge] | Get Started with API Gateway [Skill Badge] | Get Started with Looker [Skill Badge] | Get Started with Dataplex [Skill Badge] | Get Started with Google Workspace Tools [Skill Badge] | Develop with Apps Script and AppSheet [Skill Badge] | Build a Website on Google Cloud [Skill Badge] | Set Up a Google Cloud Network [Skill Badge] | Store, Process, and Manage Data on Google Cloud - Console [Skill Badge] | App Engine: 3 Ways [Skill Badge]",
  "# of Arcade Games Completed": 0,
  "Names of Completed Arcade Games": ""
}
export default function Home() {
  return (
    <div >
      <Leaderboard data={mockData}/>
    </div>
  );
}
