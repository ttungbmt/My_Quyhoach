import { Box } from '@mui/material'

export const components = {};

export function registerLayout(name, Component) {
    components[name] = Component;
}

export default function Layout(props) {
    const C = components[props.name];
    return C ? <C {...props} /> : (<Box p={2}>Not Found</Box>);
}
