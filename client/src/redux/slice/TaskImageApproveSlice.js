import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
// import e from "cors";


export const SetTaskImageApprove = createAsyncThunk("comapny/project/tasks/gallery",
    async (allTaskImg, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put("/api/task_approval_for_image", allTaskImg)
            dispatch(setTaskImgApprove(response.data.result))
            return response.data.result;
        } catch (error) {
            rejectWithValue(error.message);
        }
    })


const TaskImageApproveSlice = createSlice({
    name: "taskImgApprove",
    initialState: {
        taskImg: [],
        loading: "Please wait while we are processing the data...",
        error: false
    },

    reducers: {
        setTaskImgApprove: (state, action) => {
            state.taskImg = state.taskImg.concat(action.payload);
        }
    },

    extraReducers: (updation) => {
        updation
            .addCase(SetTaskImageApprove.pending, (state) => {
                state.loading = "please wait while we are processing the data..."
            })
            .addCase(SetTaskImageApprove.fulfilled, (state, action) => {
                state.loading = "success"
                state.taskImg = action.payload
            })
            .addCase(SetTaskImageApprove.rejected, (state, action) => {
                state.loading = "Failed"
                state.taskImg = action.payload
            })
    }
})
export default TaskImageApproveSlice.reducer

export const { setTaskImgApprove } = TaskImageApproveSlice.actions