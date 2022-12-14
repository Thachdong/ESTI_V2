// THIS COMPONENT USE VISIBILITY INSTEAD OF HIDDEN PROPS TO RENDER TAB CHILDREN
// USECASE: MANAGE FORM STATE IN MULTIPLE TAGS
import { useTabContext } from "@mui/lab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export const TabPanelContainForm: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  const context = useTabContext();

  if (context === null) {
    throw new TypeError("No TabContext provided");
  }
  const tabId = context.value;

  return (
    <div
      role="tabpanel"
      style={{
        height: value === tabId ? "auto" : "0" ,
        overflow: "hidden"
      }}
      {...other}
    >
      {value === index && children}
    </div>
  );
};
