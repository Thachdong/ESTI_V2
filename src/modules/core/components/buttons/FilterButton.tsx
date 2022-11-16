import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, ButtonProps } from '@mui/material';

export const FilterButton: React.FC<ButtonProps> = (props) => {
    return <Button {...props}>
        <FilterAltOutlinedIcon />
        {props?.children}
    </Button>
}