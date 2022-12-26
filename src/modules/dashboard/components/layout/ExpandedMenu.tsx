import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styles from "~modules-dashboard/styles/layout/sidebar.module.css";

type TProps = {
  menu: any[];
};

export const ExpandedMenu: React.FC<TProps> = ({ menu }) => {
  const { pathname } = useRouter();

  const renderActiveStyle = useCallback(
    (id: string, type: "children" | "parent") => {
      const pathSlice = pathname.split("/");
      // [0]: domain;
      // [1]: dashboard;
      // [2]: parentUrl;
      // [3]: childrenUrl

      if (type === "children") {
        return `${pathSlice[2]}/${pathSlice[3]}` === id
          ? { background: "#5d6c79", color: "#fff" }
          : {};
      } else {
        return pathSlice[2] === id ? { background: "#5d6c79" } : {};
      }
    },
    [pathname]
  );

  return (
    <List component="nav">
      {menu.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            disablePadding
            className={clsx(
              styles["menu-items"],
              styles["expand-items"],
              "relative h-[52px] shadow-lg !border !border-[#8c8888]"
            )}
            sx={{ ...renderActiveStyle(item?.id, "parent") }}
          >
            <ListItemButton>
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
            </ListItemButton>

            {
              <List
                className={clsx(
                  styles["absolute-menu"],
                  "absolute bg-white shadow-lg rounded"
                )}
              >
                <ListItem className="font-bold !text-[#000] border-0 border-b border-solid border-[rgba(72,94,144,.16)]">
                  {item?.title}
                </ListItem>

                {item.childrens.map((child: any) => (
                  <ListItem
                    key={child?.link}
                    disablePadding
                    className={clsx(styles["menu-items"], "text-sm")}
                    sx={{ ...renderActiveStyle(child.link, "children") }}
                  >
                    <ListItemButton>
                      <Link href={`/dashboard/${child?.link}`}>
                        <span className="py-2">{child?.title}</span>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            }
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};
