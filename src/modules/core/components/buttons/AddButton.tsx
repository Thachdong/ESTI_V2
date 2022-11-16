import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from '@mui/material';

export const AddButton: React.FC<ButtonProps> = (props) => {
    return <Button {...props}>
        <AddIcon />
        {props?.children}
    </Button>
}