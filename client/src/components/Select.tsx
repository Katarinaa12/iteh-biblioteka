import { Select as MuiSelect } from '@mui/material'

interface Props {
    value: any,
    placeholder?: string,
    shrink?: boolean,
    fullWidth?: boolean,
    onChange: (val: any) => void,
    options: { value: any, label: string }[]
}

export default function Select(props: Props) {
    return (
        <MuiSelect
            native
            fullWidth={props.fullWidth}
            sx={{
                minWidth: '200px'
            }}
            onChange={e => {
                props.onChange(e.target.value)
            }}
            value={props.value}
        >
            <option value=''>{props.placeholder}</option>
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </MuiSelect>
    )
}
