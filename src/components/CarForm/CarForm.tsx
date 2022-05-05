import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux'
import {useForm} from 'react-hook-form'
import { Button } from '@mui/material'
import { chooseName, choosePrice, chooseMileage, chooseDescription, chooseColor, chooseYear, chooseMake, chooseModel } from '../../redux/slices/rootSlice'
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api'
import { useGetData } from '../../custom-hooks'

interface CarFormProps{
    id?:string;
    data?:{}
}

interface CarState {
    name:string,
    price:string;
    description:string;
    mileage:string;
    make:string;
    model:string;
    year:string;
    color:string;
}

export const CarForm = (props:CarFormProps) => {
    const dispatch = useDispatch();
    let {carData, getData} = useGetData();
    const store = useStore();

    // How to select your State as a variable
    const name = useSelector<CarState>(state => state.name)
    const price = useSelector<CarState>(state => state.price)

    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if(props.id!) {
            await serverCalls.update(props.id!, data)
            console.log(`Updated: ${data.name} \n ID: ${props.id}`)
            window.location.reload();
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(choosePrice(data.price))
            dispatch(chooseMileage(data.mileage))
            dispatch(chooseDescription(data.description))
            dispatch(chooseMake(data.make))
            dispatch(chooseModel(data.model))
            dispatch(chooseYear(data.year))
            dispatch(chooseColor(data.color))

            await serverCalls.create(store.getState())
            window.location.reload();
            event.target.reset();
        }
    }
    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Car Name</label>
                    <Input {...register('name')} name='name' placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name='price' placeholder='25000.00' />
                </div>
                <div>
                    <label htmlFor="mileage">Mileage</label>
                    <Input {...register('mileage')} name='mileage' placeholder='4k' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name='description' placeholder='Rods old car' />
                </div>
                <div>
                    <label htmlFor="make">Make</label>
                    <Input {...register('make')} name='make' placeholder='Honda' />
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name='model' placeholder='Prelude' />
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name='year' placeholder='2022' />
                </div>
                <div>
                    <label htmlFor="color">Color</label>
                    <Input {...register('color')} name='color' placeholder='Silver' />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}