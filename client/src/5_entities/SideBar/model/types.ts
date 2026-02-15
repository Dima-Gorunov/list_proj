export type ISideBarItem = {
  id: string;
  text: string;
  link: string;
  selected: boolean;
  role:string[];
};

export type ISideBarItems = ISideBarItem[];
