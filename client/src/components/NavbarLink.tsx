import { Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
    to: string,
    label: string;
    size: 'normal' | 'big'

}

const stylesMap = {
    'big': {
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    normal: {
        mr: 2,
        fontFamily: 'monospace',
        color: 'inherit',
        fontWeight: 500,
        letterSpacing: 'inherit',
        textDecoration: 'none',
    }
}

export default function NavbarLink(props: Props) {


    return (
        <Typography
            variant={props.size === 'big' ? 'h5' : 'h6'}
            noWrap
            component={Link}
            to={props.to}
            sx={stylesMap[props.size]}
        >
            {props.label}
        </Typography>
    )
}
