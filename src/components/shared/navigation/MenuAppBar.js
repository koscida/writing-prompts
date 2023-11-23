import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import WifiIcon from "@mui/icons-material/Wifi";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import navigationLinks from "./navigationLinks";

// state init holds the initial menu states
let stateInit = {};

const navSectionLabels = Object.keys(navigationLinks);
stateInit = navSectionLabels.reduce((init, name) => {
	init[name] = true;
	return init;
}, stateInit);

stateInit["navigation"] = false;
stateInit["settings"] = false;

export default function MenuAppBar() {
	const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);

	const [openState, setOpenState] = React.useState(stateInit);

	// const [drawerState, setDrawerState] = React.useState({
	// 	navigation: false,
	// 	settings: false,
	// });
	// const [listOpen, setListOpen] = React.useState(listOpenInit);

	// ////
	// handlers

	const toggleDrawer = (listName, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		handleProfileClose();

		setOpenState({ ...openState, [listName]: open });
	};

	const toggleNavGroup = (navSection) => (event) => {
		setOpenState({
			...openState,
			[navSection]: !openState[navSection],
			navigation: true,
		});
	};

	const handleSettingsChange = (settingName, value) => (event) => {
		setOpenState({ ...openState, settings: true });
		if (value === null) value = event.target.value;
	};

	const handleProfileOpen = (event) => {
		setProfileAnchorEl(event.currentTarget);
	};

	const handleProfileClose = (event) => {
		setProfileAnchorEl(null);
	};

	// ////
	// reusable display elements

	// element itself
	const NavigationElements = ({ navigationLinks }) =>
		navigationLinks.map(({ to, label }) => (
			<ListItem key={label} sx={{ padding: "0 8px 0 16px" }}>
				<ListItemButton
					component="a"
					href={to}
					sx={{ padding: "4px 8px", lineHeight: "1rem" }}
				>
					<ListItemText primary={label} />
				</ListItemButton>
			</ListItem>
		));

	// list of elements
	const NavigationList = ({ listName }) => (
		// <Box
		// 	role="presentation"
		// 	onClick={toggleDrawer(listName, false)}
		// 	onKeyDown={toggleDrawer(listName, false)}
		// >
		<Box role="presentation" onKeyDown={toggleDrawer(listName, false)}>
			<List>
				{listName === "navigation" ? (
					Object.entries(navigationLinks).map(
						([sectionLabel, navigationLinks]) =>
							navigationLinks.length > 1 ? (
								<React.Fragment key={sectionLabel}>
									<ListItemButton
										onClick={toggleNavGroup(sectionLabel)}
										sx={{ padding: "8px" }}
									>
										<ListItemText primary={sectionLabel} />
										{openState[sectionLabel] ? (
											<ExpandLess />
										) : (
											<ExpandMore />
										)}
									</ListItemButton>

									<Collapse
										in={openState[sectionLabel]}
										timeout="auto"
										unmountOnExit
									>
										<List component="div" disablePadding>
											<NavigationElements
												navigationLinks={
													navigationLinks
												}
											/>
										</List>
									</Collapse>
								</React.Fragment>
							) : (
								<NavigationElements
									navigationLinks={navigationLinks}
									key={sectionLabel}
									sx={{ padding: "8px" }}
								/>
							)
					)
				) : listName === "settings" ? (
					<>
						<ListItem>
							<FormControl
								variant="standard"
								fullwidth="true"
								sx={{ minWidth: 120 }}
							>
								<InputLabel id="demo-simple-select-filled-label">
									Version
								</InputLabel>
							</FormControl>
						</ListItem>

						<Divider />
					</>
				) : (
					<></>
				)}
			</List>
		</Box>
	);

	// ////
	// render
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleDrawer("navigation", true)}
					>
						<MenuIcon />
					</IconButton>

					<Drawer
						anchor={"left"}
						open={openState["navigation"]}
						onClose={toggleDrawer("navigation", false)}
					>
						<NavigationList listName={"navigation"} />
					</Drawer>

					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Writing Prompts
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
