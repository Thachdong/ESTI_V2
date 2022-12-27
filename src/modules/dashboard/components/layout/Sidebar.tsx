import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from "~modules-dashboard/styles/layout/sidebar.module.css";
import React, { useCallback, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { menu } from "~modules-dashboard/layouts/data";
import Image from "next/image";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandedMenu } from "./ExpandedMenu";
import { BaseButton } from "~modules-core/components";

type TProps = {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar: React.FC<TProps> = ({ expand, setExpand }) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [collapses, setCollapses] = useState<string[]>([]);

  const { pathname } = useRouter();

  // METHODS
  const handleCollapse = (id: string) => {
    setCollapses((prevCollapse) =>
      prevCollapse.includes(id)
        ? prevCollapse.filter((collapse) => collapse !== id)
        : [...prevCollapse, id]
    );
  };

  const renderActiveStyle = useCallback(
    (id: string, type: "children" | "parent") => {
      const pathSlice = pathname.split("/");
      // [0]: domain;
      // [1]: dashboard;
      // [2]: parentUrl;
      // [3]: childrenUrl

      if (type === "children") {
        return `${pathSlice[2]}/${pathSlice[3]}` === id
          ? { background: "#5d6c79" }
          : {};
      } else {
        return pathSlice[2] === id ? { background: "#5d6c79" } : {};
      }
    },
    [pathname]
  );

  const renderMenu = useCallback(() => {
    if (!expand) {
      return <ExpandedMenu menu={menu} />;
    }

    return (
      <List component="nav" className={styles["menu"]}>
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem
              className={clsx(
                styles["menu-items"],
                styles["parent-menu-items"]
              )}
              disablePadding
              sx={{ ...renderActiveStyle(item.id, "parent") }}
            >
              <ListItemButton onClick={() => handleCollapse(item.id)}>
                <ListItemIcon className="text-white min-w-[32px] w-8">
                  {item.icon}
                </ListItemIcon>

                <span className="flex-grow text-sm py-2">{item.title}</span>

                {collapses.includes(item.id) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={collapses.includes(item.id)}>
              <List className="p-0">
                {item.childrens.map((child) => (
                  <Link href={`/dashboard/${child.link}`} key={child.link}>
                    <ListItem
                      disablePadding
                      className={clsx(styles["menu-items"])}
                      sx={{ ...renderActiveStyle(child.link, "children") }}
                    >
                      <ListItemButton>
                        <span className="text-sm pl-[32px] py-2">
                          {child.title}
                        </span>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    );
  }, [expand, menu, styles, collapses, pathname]);

  // DOM RENDERING
  return (
    <Box
      className={styles["sidebar"]}
      sx={{ width: expand ? "250px" : "60px" }}
    >
      <Box className={styles["logo-box"]}>
        {!expand ? (
          <Image src="/logo-small.png" alt="Esti" width={40} height={40} />
        ) : (
          <Image src="/logo-full.png" alt="Esti" width={134} height={59} />
        )}

        <BaseButton
          variant="text"
          onClick={() => setExpand(!expand)}
          className={clsx(styles["expand-btn"], "min-w-[32px]")}
        >
          <MenuIcon className="w-[30px] h-[40px]" />
        </BaseButton>
      </Box>

      {renderMenu()}
    </Box>
  );
};
