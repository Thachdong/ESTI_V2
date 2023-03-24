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
  const pathSlice = pathname.split("/");

  const renderActiveStyle = useCallback(
    (id: string, type: "children" | "parent") => {
      // [0]: domain;
      // [1]: dashboard;
      // [2]: parentUrl;
      // [3]: childrenUrl

      if (type === "children") {
        return `${pathSlice[2]}/${pathSlice[3]}` === id
          ? { background: "#2684C5", color: "#fff" }
          : {};
      } else {
        return pathSlice[2] === id
          ? { background: "#2684C5", color: "#fff" }
          : { color: "#6494BE" };
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
              // styles["menu-items"],
              styles["expand-items"],
              "relative shadow-lg h-[64px]"
            )}
          >
            <ListItemButton
              sx={{ ...renderActiveStyle(item?.id, "parent") }}
              className={clsx(
                styles["menu-items"],
                "h-[48px] w-[64px] px-3 mx-2 rounded "
              )}
            >
              {item.icon}
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
                  <Link href={`/dashboard/${child?.link}`}>
                    <a className="w-full d-block no-underline text-[#000]">
                      <ListItem
                        key={child?.link}
                        disablePadding
                        className={clsx(
                          styles["menu-items"],
                          "text-sm font-semibold"
                        )}
                        sx={{ ...renderActiveStyle(child.link, "children") }}
                      >
                        <ListItemButton>
                          <span className="py-2">{child?.title}</span>
                        </ListItemButton>
                      </ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            }
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};
