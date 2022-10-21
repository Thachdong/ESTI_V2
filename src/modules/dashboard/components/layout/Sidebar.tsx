import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
      <Box className={styles["logo-box"]}>ESTI</Box>
      <List component="nav" className={styles["menu"]}>
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              key={item.id}
              onClick={() => handleCollapse(item.id)}
            >
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

            <Collapse
              in={
                collapses.includes(item.id) ||
                handleCollapseBaseOnActiveRoute(item.childrens)
              }
            >
              <List>
                {item.childrens.map((child) => (
                  <ListItemButton
                    LinkComponent={Link}
                    href={`/dashboard/${child.link}`}
                    className="pl-[32px]"
                    key={child.link}
                    sx={{
                      background:
                        pathname === `/dashboard/${child.link}`
                          ? "#e1e1e166 !important"
                          : "",
                    }}
                  >
                    <ListItemText primary={child.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
