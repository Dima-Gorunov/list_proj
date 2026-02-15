import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ISideBarItem } from "../../../5_entities/SideBar";

type SideBarItemProps = {
    item: ISideBarItem;
};

export const SideBarItem: React.FC<SideBarItemProps> = ({ item }) => {
    const { link, selected, text } = item;
    return (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
                component={Link}
                to={link}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                    }}
                >
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                        style: {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        },
                    }}
                    sx={{ opacity: open ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
    );
};
