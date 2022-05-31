import {createEntityAdapter, createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// export const getProjects = createAsyncThunk(
//     'forms/projects/getProjects',
//     async () => {
//         const response = await axios.get('/api/project-dashboard-app/projects');
//         return response.data;
//     }
// );

const formsAdapter = createEntityAdapter({});

export const {
    selectAll: selectForms,
    selectEntities: selectFormsEntities,
    selectById: selectFormsById,
} = formsAdapter.getSelectors((state) => state.forms);

const formsSlice = createSlice({
    name: 'forms',
    initialState: formsAdapter.getInitialState(),
    reducers: {
        updateForm: {
            reducer: (state, {payload}) => {
                payload.id && formsAdapter.upsertOne(state, payload)
            },
            prepare: (form, payload) => ({
                payload: {
                    ...payload,
                    id: form
                }
            })
        }
    },
});

export const {updateForm} = formsSlice.actions

export default formsSlice.reducer;