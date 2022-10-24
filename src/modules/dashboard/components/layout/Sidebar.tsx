import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import styles from "~modules-dashboard/styles/layout/sidebar.module.css";
import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { menu } from "~modules-dashboard/layouts/data";

export const Sidebar: React.FC = () => {
  const [collapses, setCollapses] = useState<string[]>([]);

  const { pathname } = useRouter();

  const handleCollapse = (id: string) => {
    setCollapses((prevCollapse) =>
      prevCollapse.includes(id)
        ? prevCollapse.filter((collapse) => collapse !== id)
        : [...prevCollapse, id]
    );
  };

  const handleCollapseBaseOnActiveRoute = (childrens: any[]) => {
    let isChildVisited = false;

    childrens.map((child) => {
      if (pathname === `/dashboard/${child.link}`) {
        isChildVisited = true;
      }
    });

    return isChildVisited;
  };

  return (
    <Box className={styles["sidebar"]}>
      <Box className={styles["logo-box"]}>
        <img src="/logo.ico" alt="Esti" width={36} />
        <Typography variant="h4" component="span">
          ESTI
        </Typography>
      </Box>

      <List component="nav" className={styles["menu"]}>
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem className={styles["menu-items"]} disablePadding>
              <ListItemButton onClick={() => handleCollapse(item.id)}>
                <ListItemIcon className="text-white min-w-[32px]">
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.title} />

                {collapses.includes(item.id) ||
                handleCollapseBaseOnActiveRoute(item.childrens) ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse
              in={
                collapses.includes(item.id) ||
                handleCollapseBaseOnActiveRoute(item.childrens)
              }
            >
              <List>
                {item.childrens.map((child) => (
                  <ListItem
                    key={child.link}
                    disablePadding
                    className={styles["menu-items"]}
                    sx={{
                      pl: "32px",
                      background:
                        pathname === `/dashboard/${child.link}`
                          ? "#e1e1e166 !important"
                          : "",
                    }}
                  >
                    <ListItemButton
                      LinkComponent={Link}
                      href={`/dashboard/${child.link}`}
                    >
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
