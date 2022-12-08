import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "~modules-dashboard/styles/layout/sidebar.module.css";

type TProps = {
  menu: any[];
};

export const ExpandedMenu: React.FC<TProps> = ({ menu }) => {
  const { pathname } = useRouter();

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
          >
            <ListItemButton className="">
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
            </ListItemButton>

            {
              <List
                className={clsx(
                  styles["absolute-menu"],
                  "absolute bg-white shadow-lg rounded"
                )}
              >
                <ListItem
                  className="font-bold "
                  sx={{ borderBottom: "1px solid rgba(72,94,144,.16)" }}
                >
                  {item?.title}
                </ListItem>
                {item.childrens.map((child: any) => (
                  <ListItem
                    key={child?.link}
                    disablePadding
                    className={clsx(styles["menu-items"], "text-sm")}
                    sx={{
                      background:
                        pathname === `/dashboard/${child?.link}`
                          ? "#e1e1e166 !important"
                          : "",
                    }}
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
