import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from "~modules-dashboard/styles/layout/sidebar.module.css";
import QuoteIcon from "@mui/icons-material/RequestQuoteOutlined";
import OrderIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ReceiptIcon from "@mui/icons-material/ReceiptLongOutlined";
import WarehouseIcon from "@mui/icons-material/WarehouseOutlined";
import AccountIcon from "@mui/icons-material/SwitchAccountOutlined";
import ProductionIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import SettingsIcon from "@mui/icons-material/SettingsSuggestOutlined";
import React, { useState } from "react";

const menu = [
  {
    id: "menu_parent_1",
    title: "Báo giá",
    icon: <QuoteIcon />,
    childrens: [
      {
        title: "Đơn yêu cầu",
        link: "/quotation/requests",
      },
      {
        title: "Đơn báo giá",
        link: "/quotations",
      },
    ],
  },
  {
    id: "menu_parent_2",
    title: "Đơn hàng",
    icon: <OrderIcon />,
    childrens: [
      {
        title: "Đơn đặt hàng",
        link: "/order/requets",
      },
      {
        title: "hóa đơn",
        link: "/order/invoices",
      },
    ],
  },
  {
    id: "menu_parent_3",
    title: "Đơn mua hàng",
    icon: <ReceiptIcon />,
    childrens: [
      {
        title: "Sản phẩm cần mua",
        link: "/purchase/products",
      },
      {
        title: "Đơn mua hàng",
        link: "/purchase/supplier",
      },
    ],
  },
  {
    id: "menu_parent_4",
    title: "Quản lý kho",
    icon: <WarehouseIcon />,
    childrens: [
      {
        title: "Xuất kho",
        link: "/warehouse/export",
      },
      {
        title: "Nhập kho",
        link: "/warehouse/import",
      },
    ],
  },
  {
    id: "menu_parent_5",
    title: "Quản lý sản phẩm",
    icon: <ProductionIcon />,
    childrens: [
      {
        title: "Tra cứu vị trí",
        link: "/products/tracking",
      },
      {
        title: "Tra cứu sản phẩm",
        link: "/products/info",
      },
      {
        title: "Danh sách sản phẩm",
        link: "/products",
      },
      {
        title: "Nhãn sản phẩm",
        link: "/products/label",
      },
      {
        title: "Tài liệu sản phẩm",
        link: "/products/documentation",
      },
      {
        title: "Danh mục sản phẩm",
        link: "/products/category",
      },
      {
        title: "Loại tài liệu",
        link: "/products/document-type",
      },
      {
        title: "Tài liệu theo ngành",
        link: "/products/documentary-material",
      },
    ],
  },
  {
    id: "menu_parent_5",
    title: "Tài khoản",
    icon: <AccountIcon />,
    childrens: [
      {
        title: "Danh sách nhà cung cấp",
        link: "/account/supplier",
      },
      {
        title: "Danh sách khách hàng",
        link: "/account/customers",
      },
      {
        title: "Thông báo khách hàng",
        link: "/account/customer-notification",
      },
      {
        title: "Danh sách nhân viên",
        link: "/account/staff",
      },
    ],
  },
  {
    id: "menu_parent_6",
    title: "Cấu hình",
    icon: <SettingsIcon />,
    childrens: [
      {
        title: "Cấu hình đơn vị",
        link: "/setting/product-units",
      },
      {
        title: "Cấu hình kho",
        link: "/setting/warehouse",
      },
      {
        title: "Cấu hình chi nhánh",
        link: "/setting/branchs",
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const [collapses, setCollapses] = useState<string[]>([]);

  const handleCollapse = (id: string) => {
    setCollapses((prevCollapse) =>
      prevCollapse.includes(id)
        ? prevCollapse.filter((collapse) => collapse !== id)
        : [...prevCollapse, id]
    );
  };
  return (
    <Box className={styles["sidebar"]}>
      <Box className={styles["logo-box"]}>ESTI</Box>
      <List
        component="nav"
        className="text-white"
        sx={{ overflowY: "scroll", height: "calc(100vh - 60px)" }}
      >
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              key={item.id}
              onClick={() => handleCollapse(item.id)}
            >
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
            <Collapse in={collapses.includes(item.id)}>
              <List>
                {item.childrens.map((child) => (
                  <ListItemButton key={child.link}>
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
