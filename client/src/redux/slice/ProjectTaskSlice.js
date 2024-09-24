import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProjectTasks = createAsyncThunk("assignSubcontructor/project/tasks",
    async (projectTasks, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/get_all_tasks", projectTasks);
            dispatch(setProjectTasks(response.data.result))
            return response.data.result;
        } catch (error) {
            rejectWithValue(error.message);
        }
    })


const ProjectTasks = createSlice({
    name: "projectTasks",
    initialState: {
        tasks: [],
        loading: "Please wait while we are processing the data...",
        error: false
    },

    reducers: {
        setProjectTasks: (state, action) => {
            state.tasks = state.tasks.concat(action.payload);
        }
    },

    extraReducers: (updation) => {
        updation
            .addCase(getAllProjectTasks.pending, (state) => {
                state.loading = "please wait while loading..."
            })
            .addCase(getAllProjectTasks.fulfilled, (state, action) => {
                state.loading = "success"
                state.projects = action.payload
            })
            .addCase(getAllProjectTasks.rejected, (state, action) => {
                state.loading = "Failed"
                state.error = action.payload
            })
    }
})

export default ProjectTasks.reducer;

export const { setProjectTasks } = ProjectTasks.actions;