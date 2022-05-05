import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'skyline gt-r',
        price: "200000.00",
        description: "Rod's old car",
        mileage: '4k',
        color: 'Blue',
        year: '2022',
        make: 'Nissan',
        model: 'Skyline GT-R',
        cost_of_production: 450.00,
        series: 'DJI FPV Series'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        choosePrice: (state, action) => { state.price = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseMileage: (state, action) => { state.mileage = action.payload},
        chooseColor: (state, action) => { state.color = action.payload},
        chooseYear: (state, action) => { state.year = action.payload},
        chooseMake: (state, action) => { state.make = action.payload},
        chooseModel: (state, action) => { state.model = action.payload},
    }
})

// Export Reducers
export const reducer = rootSlice.reducer;
export const { chooseName, choosePrice, chooseDescription, chooseMileage, chooseColor, chooseYear, chooseMake, chooseModel } = rootSlice.actions