import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.getContrastText("#ffffff"),
    backgroundColor: "#A78BE3",
    '&:hover': {
        backgroundColor: "#D59330",
    }
}));

export const OutlinedButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontWeight: 'bold',
    color: '#000000',
    border: `2px solid #A78BE3`,
    '&:hover': {
        border: `2px solid #D59330`,
        color: '#000000',
    },
}));