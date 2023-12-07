import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import breedService from './breedService';



const initialState = {
    breed: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message: "",
};

// create Breed
export const createBreed = createAsyncThunk(
    "breed/createBreed",
    async ({ name, imageURL, description },thunkAPI) => {
        try {
                return await breedService.createBreed({ name, imageURL, description })
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// get breeds
export const getBreeds = createAsyncThunk(
    "breed/getBreeds",
    async (_, thunkAPI) => {
        try {
                return await breedService.getBreeds()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete breeds
export const deleteBreed = createAsyncThunk(
    "breed/deleteBreed",
    async (id, thunkAPI) => {
        try {
                return await breedService.deleteBreed(id)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// edit breeds
export const editBreed = createAsyncThunk(
    "breed/editBreed",
    async ({ id ,name, imageURL, description }, thunkAPI) => {
        try {
                return await breedService.editBreed(id,{ name, imageURL, description })
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const breedSlice = createSlice({
  name: "breed",
  initialState,
  reducers: {
    RESET_BREED(state){
       state.isError=false;
       state.isSuccess=false;
       state.isLoading=false;
       state.message= "";
    }
  },
    extraReducers: (builder) => {
        

        builder
        // create breeds
        .addCase(createBreed.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(createBreed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.breed = action.payload;
               
            })
            .addCase(createBreed.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.breed = null;
               
            })
                // get breeds
            .addCase(getBreeds.pending, (state) => {
                state.isLoading = true;
            })
                .addCase(getBreeds.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.breed = action.payload;
                    
                })
                .addCase(getBreeds.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.breed = null;
                    
                })

                   // delete breed
            .addCase(deleteBreed.pending, (state) => {
                state.isLoading = true;
            })
                .addCase(deleteBreed.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.breed = null;
                    
                })
                .addCase(deleteBreed.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.breed = action.payload;
                    
                })

                .addCase(editBreed.pending, (state) => {
                    state.isLoading = true;
                })
                    .addCase(editBreed.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        state.breed = action.payload;
                        
                    })
                    .addCase(editBreed.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.breed = null;
                        
                    })

    }
});

export const {RESET_BREED} = breedSlice.actions

export default breedSlice.reducer