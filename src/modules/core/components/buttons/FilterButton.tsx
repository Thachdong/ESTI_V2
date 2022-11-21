import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, ButtonProps } from '@mui/material';
import clsx from 'clsx';

export const FilterButton: React.FC<ButtonProps> = (props) => {
    return <Button {...props} className={clsx("bg-main-1", props?.className)}>
        <FilterAltOutlinedIcon />
        {props?.children}
    </Button>
}