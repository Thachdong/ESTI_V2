import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import styles from "~modules-dashboard/styles/layout/sidebar.module.css";
import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { menu } from "~modules-dashboard/layouts/data";
import Image from "next/image";
import clsx from "clsx";

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
        <Image src="/logo-full.png" alt="Esti" width={134} height={59} />
      </Box>

      <List component="nav" className={styles["menu"]}>
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              className={clsx(
                styles["menu-items"],
                styles["parent-menu-items"]
              )}
              disablePadding
            >
              <ListItemButton onClick={() => handleCollapse(item.id)}>
                <ListItemIcon className="text-white min-w-[32px]">
                  {item.icon}
                </ListItemIcon>

                <span className="flex-grow text-sm py-2">{item.title}</span>

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
                    className={clsx(styles["menu-items"], "text-sm")}
                    sx={{
                      pl: "32px",
                      background:
                        pathname === `/dashboard/${child.link}`
                          ? "#e1e1e166 !important"
                          : "",
                    }}
                  >
                    <ListItemButton>
                      <Link href={`/dashboard/${child.link}`}>
                        <span className="py-2">{child.title}</span>
                      </Link>
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
