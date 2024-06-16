import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, TextField, Typography } from '@mui/material'
import { SubscriptionType } from '../../types'

interface Props {
    open: boolean,
    subscriptionType?: SubscriptionType,
    onSubmit: (data: any) => Promise<void>
    onClose: () => void,
}
const initialFormState = {
    name: '',
    price: undefined as number | undefined,
    duration: undefined as number | undefined,

}
export default function SubscriptionTypeForm(props: Props) {
    const [formState, setFormState] = useState(initialFormState)
    const onFieldChange = (name: keyof typeof initialFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string | number) => {
        setFormState(prev => {
            return {
                ...prev,
                [name]: (typeof e === 'string' || typeof e === 'number') ? e : e.target.value
            }
        })
    }
    useEffect(() => {
        if (!props.open) {
            return;
        }
        if (!props.subscriptionType) {
            setFormState(initialFormState);
            return;
        }
        setFormState({
            name: props.subscriptionType.name,
            price: props.subscriptionType.price,
            duration: props.subscriptionType.duration,
        })
    }, [props.open, props.subscriptionType])
    return (
        <Dialog open={props.open} onClose={props.onClose} keepMounted>
            <Box sx={{
                width: '500px'
            }}>
                <Typography
                    variant='h5'
                    sx={{
                        padding: 2,
                        borderBottom: 1
                    }}
                >{props.subscriptionType ? 'Update subscription type form' : 'Create subscription type form'}</Typography>
                <Box component='form' sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }} onSubmit={e => {
                    e.preventDefault();
                    props.onSubmit(formState)
                }}>
                    <TextField value={formState.name} onChange={onFieldChange('name')} InputLabelProps={{ shrink: true }} fullWidth label='Name' placeholder='Name' />
                    <TextField value={formState.price} onChange={onFieldChange('price')} InputLabelProps={{ shrink: true }} fullWidth type='number' label='Price' placeholder='Price' />
                    <TextField value={formState.duration} onChange={onFieldChange('duration')} InputLabelProps={{ shrink: true }} fullWidth type='number' label='Duration (days)' placeholder='Duration (days)' />

                    <Button variant='contained' color='primary' fullWidth type='submit'>Save book</Button>
                </Box>
            </Box>
        </Dialog>
    )
}
