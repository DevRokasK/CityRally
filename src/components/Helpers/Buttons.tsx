import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.getContrastText("#ffffff"),
    backgroundColor: "#A78BE3",
    '&:hover': {
        backgroundColor: "#D59330",
    },
}));