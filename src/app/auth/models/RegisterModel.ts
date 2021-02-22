import { TeamMember } from "./TeamMember";

export class RegisterModel {
    Email: string;
    Password: string;
    TeamName: string;
    Logo: File;
    TeamPicture: File;
    TeamMembers: TeamMember[]
}