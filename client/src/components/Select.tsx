import { Select as MuiSelect } from '@mui/material'

interface Props {
    value: any,
    placeholder?: string,
    onChange: (val: any) => void,
    options: { value: any, label: string }[]
}

export default function Select(props: Props) {
    return (
        <MuiSelect
            native
            sx={{
                minWidth: '200px'
            }}
            placeholder={props.placeholder}
            onChange={e => {
                props.onChange(e.target.value)
            }}
            value={props.value}
        >
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </MuiSelect>
    )
}
