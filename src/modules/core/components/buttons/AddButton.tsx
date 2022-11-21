import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from '@mui/material';
import clsx from 'clsx';

export const AddButton: React.FC<ButtonProps> = (props) => {
    return <Button {...props} className={clsx("bg-main-2", props?.className)}>
        <AddIcon />
        {props?.children}
    </Button>
}